package com.ty.voyogo.service;

import com.ty.voyogo.dto.request.TripRequestDTO;
import com.ty.voyogo.dto.response.TripResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface TripService {
     TripResponseDTO createTrip(TripRequestDTO tripRequestDto);

    List<TripResponseDTO> trips();

     List<TripResponseDTO> search(String from, String to, LocalDate date);
}
