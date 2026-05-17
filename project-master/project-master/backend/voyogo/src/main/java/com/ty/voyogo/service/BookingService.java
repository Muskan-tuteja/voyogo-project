package com.ty.voyogo.service;

import com.ty.voyogo.dto.request.BookingRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    BookingResponseDTO createBooking(BookingRequestDTO bookingRequest,String name);

     List<BookingResponseDTO> myBooking(String name);

    void cancelBooking(long bookingId,String username);

     List<BookingResponseDTO> findAllBookings();

    List<BookingResponseDTO> findBookingsDate(LocalDate date);
}
