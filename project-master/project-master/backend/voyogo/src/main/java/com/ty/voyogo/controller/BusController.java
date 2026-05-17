package com.ty.voyogo.controller;

import com.ty.voyogo.dto.request.BusRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;
import com.ty.voyogo.entity.util.BusType;
import com.ty.voyogo.service.BookingService;
import com.ty.voyogo.service.BusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/voyago/admin")
@RequiredArgsConstructor
@CrossOrigin
public class BusController {

    private final BusService busService;
    private final BookingService bookingService;

    @GetMapping("/bus-types")
    public ResponseEntity<BusType[]> bustypes(){
        return ResponseEntity.ok(BusType.values());
    }

    @PostMapping("/buses")
    public ResponseEntity<BusRequestDTO> createBus(@RequestBody @Valid BusRequestDTO bus, Authentication authentication){

        return ResponseEntity.ok(  busService.addBus(bus,authentication.getName()));
    }

    @GetMapping("/buses")
    public ResponseEntity<List<BusRequestDTO>> getAllBuses(){

        return ResponseEntity.ok(busService.getAllBuses());
    }

    @DeleteMapping("/buses/{busNo}")
    public ResponseEntity<String> deleteBus(@PathVariable String busNo){

        busService.deleteBus(busNo);
        return ResponseEntity.ok("Bus deleted ");
    }


    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponseDTO>> myBooking() {
        return ResponseEntity.ok(bookingService.findAllBookings());
    }

    @GetMapping("/bookings/date")
    public ResponseEntity<List<BookingResponseDTO>> getBookingByDate(@RequestParam LocalDate date){

        return ResponseEntity.ok(bookingService.findBookingsDate(date));
    }
}
