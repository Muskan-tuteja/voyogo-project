package com.ty.voyogo.controller;

import com.ty.voyogo.dto.request.SeatLockRequest;
import com.ty.voyogo.service.SeatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voyago/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService service;

    @PostMapping("/lock")
    public void lock(@RequestBody @Valid SeatLockRequest req, Authentication authentication) {

        service.lockSeat(
                req.getTripId(),
                req.getSeatId(),
                authentication.getName()
        );

    }

    @DeleteMapping("/unlock")
    public void unlock(@RequestBody @Valid SeatLockRequest req, Authentication authentication) {

        service.unlockSeat(
                req.getTripId(),
                req.getSeatId(),
                authentication.getName()
        );

    }


}
