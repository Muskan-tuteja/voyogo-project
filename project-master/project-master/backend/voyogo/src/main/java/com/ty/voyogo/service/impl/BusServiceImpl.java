package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.request.BusRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;
import com.ty.voyogo.entity.Bus;
import com.ty.voyogo.entity.Seat;
import com.ty.voyogo.entity.Trip;
import com.ty.voyogo.entity.User;
import com.ty.voyogo.entity.util.SeatType;
import com.ty.voyogo.exception.BusModelException;
import com.ty.voyogo.repository.BusRepository;
import com.ty.voyogo.repository.SeatRepository;
import com.ty.voyogo.security.AppUserDetailsService;
import com.ty.voyogo.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {

    private final BusRepository busRepository;
    private final AppUserDetailsService appUserDetailsService;
    private final SeatRepository seatRepository;
    @Override
    @Transactional
    public BusRequestDTO addBus(BusRequestDTO busdto, String username) {
        if (busRepository.existsById(busdto.getBusNo()))
            throw new BusModelException(busdto.getBusNo() + " already present");

        User user = (User) appUserDetailsService.loadUserByUsername(username);
        Bus bus = Bus.builder()
                .busNo(busdto.getBusNo())
                .busName(busdto.getBusName())
                .busType(busdto.getBusType())
                .capacity(busdto.getCapacity())
                .active(true)
                .admin(user)
                .build();

        Bus savedBus = busRepository.save(bus);
        generateSleeperSeats(savedBus);
        return busdto;
    }

    @Override
    public List<BusRequestDTO> getAllBuses() {
        return busRepository.findByActive().stream()
                .map(BusRequestDTO::new).toList();
    }

    @Transactional
    @Override
    public void deleteBus(String busNo) {
        Bus bus=busRepository.findById(busNo).orElseThrow(()->new BusModelException("Bus not found"));
         bus.setActive(false);

         List<Trip> trips=bus.getTrips();
         trips.forEach(trip -> trip.setActive(false));
    }

    @Override
    public List<BookingResponseDTO> findAllBookings() {
        return List.of();
    }


    @Transactional
    public void generateSleeperSeats(Bus bus) {

        int totalSeats = bus.getCapacity();

        int pairs = totalSeats / 2;

        List<Seat> seats = new ArrayList<>();

        for (int i = 1; i <= pairs; i++) {

            Seat lower = Seat.builder()
                    .seatNumber("L" + i)
                    .seatType(SeatType.LOWER)
                    .bus(bus)
                    .build();

            Seat upper = Seat.builder()
                    .seatNumber("U" + i)
                    .seatType(SeatType.UPPER)
                    .bus(bus)
                    .build();

            seats.add(lower);
            seats.add(upper);
        }

        seatRepository.saveAll(seats);

    }
}