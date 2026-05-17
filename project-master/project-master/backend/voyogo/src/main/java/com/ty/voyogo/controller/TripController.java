package com.ty.voyogo.controller;

import com.ty.voyogo.dto.request.TripRequestDTO;
import com.ty.voyogo.dto.response.TripResponseDTO;
import com.ty.voyogo.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voyago/admin/trips")
@CrossOrigin
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping
    public ResponseEntity<TripResponseDTO> createTrip(@RequestBody @Valid TripRequestDTO tripRequestDto ){
        return ResponseEntity.ok(tripService.createTrip(tripRequestDto));
    }
    @GetMapping
    public ResponseEntity<List<TripResponseDTO>> trips(){
        return ResponseEntity.ok(tripService.trips());

    }
}
