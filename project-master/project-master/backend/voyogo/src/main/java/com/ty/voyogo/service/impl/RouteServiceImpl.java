package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.request.RouteRequest;
import com.ty.voyogo.dto.response.RouteResponse;
import com.ty.voyogo.dto.response.SeatResponseDTO;
import com.ty.voyogo.entity.Route;
import com.ty.voyogo.entity.Seat;
import com.ty.voyogo.entity.Trip;
import com.ty.voyogo.entity.util.Status;
import com.ty.voyogo.exception.ResourceNotFoundException;
import com.ty.voyogo.repository.*;
import com.ty.voyogo.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {


    private final RouteRepository routeRepository;
    private final TripRepository tripRepository;
    private final SeatRepository seatRepository;
    private final BookingRepository bookingRepository;
    private final SeatLockRepository seatLockRepository;
    @Override
    public RouteResponse createRoute(RouteRequest routeRequest) {

        String source=routeRequest.getSource().toUpperCase();
        String destination=routeRequest.getDestination().toUpperCase();
        Optional<Route> routeOpt= routeRepository.findBySourceAndDestination(source,destination);


        if(routeOpt.isPresent()){
         Route route=  routeOpt.get();

         if(route.isActive()){
             throw new IllegalStateException("Route already exist");

         }
         route.setActive(true);
         route.setDistance(routeRequest.getDistance());

            Route savedRoute=routeRepository.save(route);

            return new RouteResponse(savedRoute);

        }
        Route route=Route.builder()
                .destination(routeRequest.getDestination().toUpperCase())
                .source(routeRequest.getSource().toUpperCase())
                .distance(routeRequest.getDistance())
                .active(true)
                .build();
         Route savedRoute=routeRepository.save(route);

        return new RouteResponse(savedRoute);
    }

    @Override
    public List<RouteResponse> getAllRoutes() {
        return routeRepository.findAll()
                .stream().map(RouteResponse::new)
                .toList();
    }

    @Override
    public Page<RouteResponse> getAllRoutes(int page, int size) {
        Pageable pageable= PageRequest.of(page, size
        , Sort.by("routeId").descending());

        Page<Route> routePage=routeRepository.findAllActive(pageable);

        return routePage.
                map(RouteResponse::new);
    }

    @Override
    public List<String> getSourceSuggestions(String keyword) {
        return routeRepository.findSourceSuggestions(keyword);
    }

    @Override
    public List<String> getDestinationSuggestions(String keyword) {
        return routeRepository.getDestinationSuggestions(keyword);
    }

    @Override
    public List<SeatResponseDTO> getSeats(long tripId) {
        Trip trip=tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        String busNo=trip.getBus().getBusNo();

        List<Seat> seats=
                seatRepository.findByBusBusNo(busNo);

        List<Long> bookedSeatIds =
                bookingRepository.findBookedSeatIds(tripId, Status.CONFIRMED);
        List<Long> lockedSeatIds=
                seatLockRepository.findByTripId(tripId);




        return seats.stream()
                .map(seat->new SeatResponseDTO(seat,bookedSeatIds.contains(seat.getSeatId()),lockedSeatIds.contains(seat.getSeatId()))).toList();
    }

    @Transactional
    @Override
    public void deleteRoute(long id) {
       Route route= routeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("route not found"));
       route.setActive(false);
       routeRepository.save(route);

    }
}
