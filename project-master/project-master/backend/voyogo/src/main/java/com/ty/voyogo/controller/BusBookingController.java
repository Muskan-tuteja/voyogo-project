package com.ty.voyogo.controller;

import com.ty.voyogo.dto.request.BookingRequestDTO;
import com.ty.voyogo.dto.response.BookingResponseDTO;
import com.ty.voyogo.dto.response.SeatResponseDTO;
import com.ty.voyogo.dto.response.TripResponseDTO;
import com.ty.voyogo.entity.Payment;
import com.ty.voyogo.entity.util.PaymentStatus;
import com.ty.voyogo.exception.ResourceNotFoundException;
import com.ty.voyogo.exception.UnauthorizedActionException;
import com.ty.voyogo.repository.BookingRepository;
import com.ty.voyogo.repository.PaymentRepository;
import com.ty.voyogo.service.BookingService;
import com.ty.voyogo.service.RouteService;
import com.ty.voyogo.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/voyago/buses")
@RequiredArgsConstructor
@CrossOrigin
public class BusBookingController {

    private final TripService tripService;
    private final BookingService bookingService;
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    @GetMapping("/search")
    public ResponseEntity<List<TripResponseDTO>> search(@RequestParam String from , @RequestParam String to,
                                                        @RequestParam LocalDate date){

        return ResponseEntity.ok(tripService.search(from,to,date));
    }

    private final RouteService routeService;

    @GetMapping("/suggestions/source")
    public List<String> getSourceSuggestions(
            @RequestParam String keyword
    ) {
        return routeService.getSourceSuggestions(keyword);
    }
    @GetMapping("/suggestions/destination")
    public List<String> destinationSuggestions(@RequestParam String keyword) {
        return routeService.getDestinationSuggestions(keyword);
    }
   @GetMapping("/seats/trip/{tripId}")
   public ResponseEntity<List<SeatResponseDTO>> seats(@PathVariable long tripId) {
       return ResponseEntity.ok(routeService.getSeats(tripId));
   }


    @PostMapping("/booking/create")
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody @Valid BookingRequestDTO bookingRequest, Authentication authentication) {
        return ResponseEntity.ok(bookingService. createBooking(bookingRequest,authentication.getName()));
    }

    @GetMapping("/bookings/my")
    public ResponseEntity<List<BookingResponseDTO>> myBooking( Authentication authentication) {
        return ResponseEntity.ok(bookingService. myBooking(authentication.getName()));
    }

    @PutMapping("/booking/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable long bookingId,Authentication authentication ) {
          bookingService.cancelBooking(bookingId,authentication.getName());
        return ResponseEntity.ok("booking is cancelled refund will be done in 3-4 days");
    }

    @GetMapping("/refund-status/{bookingId}")
    public PaymentStatus getRefundStatus(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {
        var booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        if (!isAdmin && !booking.getUser().getEmail().equals(authentication.getName())) {
            throw new UnauthorizedActionException("Unauthorized refund status access");
        }


        Payment payment =
                paymentRepository
                        .findByBookingBookingId(bookingId)
                        .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        return payment.getStatus();

    }

}
