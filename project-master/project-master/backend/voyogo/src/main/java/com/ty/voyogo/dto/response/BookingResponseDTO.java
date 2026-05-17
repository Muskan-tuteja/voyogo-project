package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.Booking;

import com.ty.voyogo.entity.util.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDTO {

    private Long bookingId;

    private String busNo;

    private String source;

    private String destination;

    private LocalDate bookingDate;

    private double totalAmount;

    private Status status;

    private List<PassengerResponseDTO> passenger;

    private List<String> seatNumbers;

    private LocalDateTime departureTime;



    public BookingResponseDTO(Booking booking){
        this.bookingId=booking.getBookingId();
        this.busNo=booking.getTrip().getBus().getBusNo();
        this.source=booking.getTrip().getRoute().getSource();
        this.destination=booking.getTrip().getRoute().getDestination();
        this.bookingDate=booking.getBookingTime().toLocalDate();
        this.totalAmount=booking.getTotalAmount();
        this.status=booking.getStatus();
        this.passenger=booking.getPassengers().stream().map(PassengerResponseDTO::new).toList();
        this.seatNumbers=booking.getBookingSeats().stream().map(bookingSeat -> bookingSeat.getSeat().getSeatNumber()).toList();

        this.departureTime=LocalDateTime.of(booking.getTrip().getTravelDate(),booking.getTrip().getDepartureTime());

    }
}
