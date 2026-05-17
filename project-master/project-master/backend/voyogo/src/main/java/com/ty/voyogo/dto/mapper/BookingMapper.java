package com.ty.voyogo.dto.mapper;

import com.ty.voyogo.dto.response.BookingResponseDTO;
import com.ty.voyogo.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingResponseDTO toDTO(Booking booking) {

        return BookingResponseDTO.builder()
                .bookingId(booking.getBookingId())
                .totalAmount(booking.getTotalAmount())
                .bookingDate(booking.getBookingTime().toLocalDate())
                .status(booking.getStatus())
                .build();
    }

}
