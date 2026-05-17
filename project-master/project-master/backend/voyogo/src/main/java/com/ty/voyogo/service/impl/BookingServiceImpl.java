package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.request.BookingRequestDTO;
import com.ty.voyogo.dto.request.PassengerRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;
import com.ty.voyogo.entity.*;
import com.ty.voyogo.entity.util.PaymentStatus;
import com.ty.voyogo.entity.util.Status;
import com.ty.voyogo.exception.ConflictException;
import com.ty.voyogo.exception.ResourceNotFoundException;
import com.ty.voyogo.exception.UnauthorizedActionException;
import com.ty.voyogo.repository.*;
import com.ty.voyogo.security.AppUserDetailsService;
import com.ty.voyogo.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final PassengerRepository passengerRepository;
    private final AppUserDetailsService appUserDetailsService;
    private final SeatRepository seatRepository;
    private final TripRepository tripRepository;
    private final SeatLockRepository seatLockRepository;
    private final BookingSeatRepository bookingSeatRepository;
    @Override
    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequest, String name) {

        User user=(User) appUserDetailsService.loadUserByUsername(name);

        Trip trip=tripRepository.findById(bookingRequest.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
        if (bookingRequest.getPassengers() == null || bookingRequest.getPassengers().isEmpty()) {
            throw new IllegalArgumentException("Passengers are required");
        }

        List<Long> seatIds=
                bookingRequest.getPassengers()
                        .stream()
                        .map(PassengerRequestDTO::getSeatId)
                        .toList();
        if (new HashSet<>(seatIds).size() != seatIds.size()) {
            throw new ConflictException("Duplicate seat selection is not allowed");
        }

        List<SeatLock> locks =
                seatLockRepository
                        .findByTripIdAndSeatIdIn(
                                trip.getTripId(),
                                seatIds
                        );
        Map<Long, SeatLock> lockBySeat =
                locks.stream()
                        .collect(Collectors.toMap(SeatLock::getSeatId, Function.identity(), (a, b) -> a));
        LocalDateTime now = LocalDateTime.now();

        if (locks.size() != seatIds.size())
            throw new ConflictException(
                    "Seats not locked"
            );
        for (Long seatId : seatIds) {
            SeatLock seatLock = lockBySeat.get(seatId);
            if (seatLock == null
                    || seatLock.getExpiryTime().isBefore(now)
                    || !name.equals(seatLock.getUserSessionId())) {
                throw new UnauthorizedActionException("Seat lock invalid or not owned by user");
            }
        }
        List<Long> alreadyBookedSeatIds = bookingRepository.findBookedSeatIds(trip.getTripId(), Status.CONFIRMED);
        for (Long seatId : seatIds) {
            if (alreadyBookedSeatIds.contains(seatId)) {
                throw new ConflictException("One or more seats are already booked");
            }
        }
        double totalAmount = trip.getFare() * bookingRequest.getPassengers().size();

        Booking booking =
                Booking.builder()
                        .bookingTime(
                                now
                        )
                        .status(Status.CONFIRMED)
                        .trip(trip)
                        .user(user)
                        .totalAmount(
                                totalAmount
                        )
                        .build();
        booking = bookingRepository.save(booking);

        List<Passenger> passengers =
                new ArrayList<>();

        List<BookingSeat> bookingSeats =
                new ArrayList<>();


        for (PassengerRequestDTO p :
                bookingRequest.getPassengers()) {

            Seat seat =
                    seatRepository.findById(
                            p.getSeatId()
                    ).orElseThrow(() -> new ResourceNotFoundException("Seat not found"));
            if (!seat.getBus().getBusNo().equals(trip.getBus().getBusNo())) {
                throw new IllegalArgumentException("Seat does not belong to selected trip");
            }


            Passenger passenger =
                    Passenger.builder()
                            .name(p.getName())
                            .age(p.getAge())
                            .gender(p.getGender())
                            .seatNumber(
                                    seat.getSeatNumber()
                            )
                            .booking(booking)
                            .build();

            passenger =
                    passengerRepository.save(passenger);

            passengers.add(passenger);


            BookingSeat bookingSeat =
                    BookingSeat.builder()
                            .booking(booking)
                            .seat(seat)
                            .passenger(passenger)
                            .tripId(trip.getTripId())
                            .build();

            bookingSeats.add(bookingSeat);

        }
        bookingSeatRepository
                .saveAll(bookingSeats);

        Payment payment =
                Payment.builder()
                        .amount(totalAmount)
                        .status(
                                PaymentStatus.SUCCESS
                        ).paymentMethod(bookingRequest.getPaymentMethod() == null ? "upi" : bookingRequest.getPaymentMethod())
                        .paymentTime(
                                now
                        )
                        .booking(booking)
                        .build();

        paymentRepository.save(payment);

        seatLockRepository
                .deleteByTripIdAndSeatIdIn(
                        trip.getTripId(),
                        seatIds
                );


        booking.setPassengers(passengers);
        booking.setBookingSeats(bookingSeats);
        booking.setPayment(payment);
        booking.setUser(user);



        return new BookingResponseDTO( booking);
    }

    @Override
    public List<BookingResponseDTO> myBooking(String name) {
        User user=(User) appUserDetailsService.loadUserByUsername(name);

        return user.getBookings().stream()
                .map(BookingResponseDTO::new).toList();
    }

    @Override
    public void cancelBooking(long bookingId,String username) {
        User user=(User) appUserDetailsService.loadUserByUsername(username);

        Booking booking =
                bookingRepository
                        .findById(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Booking not found")
                        );

        if ((booking.getUser().getUserId()!=user.getUserId())) {

            throw new UnauthorizedActionException(
                    "Unauthorized cancel attempt"
            );

        }
            // 3. Check already cancelled
            if (booking.getStatus() == Status.CANCELLED) {

                throw new ConflictException(
                        "Booking already cancelled"
                );

            }

        if (booking.getTrip().getTravelDate()
                .isBefore(LocalDate.now())) {

            throw new ConflictException(
                    "Trip already started"
            );

        }
        booking.setStatus(Status.CANCELLED);

        Payment payment =
                paymentRepository
                        .findByBookingBookingId(bookingId)
                        .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        payment.setStatus(
                PaymentStatus.REFUND_PENDING
        );

        payment.setRefundTime(
                LocalDateTime.now()
        );

        // 6. Save changes
        bookingRepository.save(booking);
        paymentRepository.save(payment);
    }

    @Override
    public List<BookingResponseDTO> findAllBookings() {
        return bookingRepository.findAll().stream()
                .map(BookingResponseDTO::new)
                .toList();
    }

    @Override
    public List<BookingResponseDTO> findBookingsDate(LocalDate date) {
        return bookingRepository.findByTrip_TravelDate(date)
                .stream()
                .map(BookingResponseDTO::new).toList();
    }
}
