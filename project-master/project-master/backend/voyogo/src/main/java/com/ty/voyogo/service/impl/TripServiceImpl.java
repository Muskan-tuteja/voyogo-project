package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.request.TripRequestDTO;
import com.ty.voyogo.dto.response.TripResponseDTO;
import com.ty.voyogo.entity.Bus;
import com.ty.voyogo.entity.Route;
import com.ty.voyogo.entity.Trip;
import com.ty.voyogo.exception.ResourceNotFoundException;
import com.ty.voyogo.exception.TripException;
import com.ty.voyogo.repository.BusRepository;
import com.ty.voyogo.repository.RouteRepository;
import com.ty.voyogo.repository.TripRepository;
import com.ty.voyogo.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    @Override
    public TripResponseDTO createTrip(TripRequestDTO tripRequestDto) {

        Bus bus=busRepository.findById(tripRequestDto.getBusNo())
                .orElseThrow(() -> new ResourceNotFoundException("Bus number not found"));
        Route route=routeRepository.findById(tripRequestDto.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route id mismatch"));
        LocalDateTime departureDateTime = LocalDateTime.of(
                tripRequestDto.getTravelDate(),
                tripRequestDto.getDepartureTime()
        );

        LocalDateTime arrivalDateTime = LocalDateTime.of(
                tripRequestDto.getArrivalDate(),
                tripRequestDto.getArrivalTime()
        );
        if (!arrivalDateTime.isAfter(departureDateTime)) {
            throw new TripException("Arrival must be after departure");
        }
        Trip trip=Trip.builder()
                .fare(tripRequestDto.getFare())
                .arrivalTime(tripRequestDto.getArrivalTime())
                .departureTime(tripRequestDto.getDepartureTime())
                .travelDate(tripRequestDto.getTravelDate())
                .arrivalDate(tripRequestDto.getArrivalDate())
                .active(true)
                .bus(bus)
                .route(route)
                .build();

       Trip savedTrip= tripRepository.save(trip);

        return new TripResponseDTO(savedTrip);
    }

    @Override
    public List<TripResponseDTO> trips() {
        return tripRepository.findByActive().stream()
                .map(TripResponseDTO::new).toList();
    }

    @Override
    public List<TripResponseDTO> search(String from, String to, LocalDate travelDate) {
        return tripRepository.findByRouteSourceIgnoreCaseAndRouteDestinationIgnoreCaseAndTravelDate(from,to,travelDate).stream()
                .map(TripResponseDTO::new).toList();
    }
}
