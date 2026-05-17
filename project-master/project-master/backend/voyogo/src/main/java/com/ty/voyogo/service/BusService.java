package com.ty.voyogo.service;

import com.ty.voyogo.dto.request.BusRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;

import java.util.List;

public interface BusService {
     BusRequestDTO addBus(BusRequestDTO bus,String username);

     List<BusRequestDTO> getAllBuses();

     void deleteBus(String busNo);

    List<BookingResponseDTO> findAllBookings();
}
