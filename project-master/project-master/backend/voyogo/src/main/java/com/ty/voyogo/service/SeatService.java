package com.ty.voyogo.service;

import org.springframework.stereotype.Service;

@Service

public interface SeatService {

    void lockSeat(Long tripId, Long seatId, String username);
    void unlockSeat(Long tripId, Long seatId, String username);
}
