package com.ty.voyogo.service.impl;

import com.ty.voyogo.entity.SeatLock;
import com.ty.voyogo.exception.ConflictException;
import com.ty.voyogo.exception.ResourceNotFoundException;
import com.ty.voyogo.exception.UnauthorizedActionException;
import com.ty.voyogo.repository.SeatLockRepository;
import com.ty.voyogo.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatLockRepository repository;

    @Override
    @Transactional
    public void lockSeat(Long tripId, Long seatId, String username) {
        LocalDateTime now = LocalDateTime.now();
        SeatLock existing = repository.findByTripIdAndSeatId(tripId, seatId).orElse(null);
        if (existing != null) {
            if (existing.getExpiryTime().isAfter(now)) {
                throw new ConflictException("Seat already locked");
            }
            repository.delete(existing);
        }

        SeatLock lock = new SeatLock();

        lock.setTripId(tripId);
        lock.setSeatId(seatId);
        lock.setUserSessionId(username);

        lock.setLockTime(now);

        lock.setExpiryTime(
                now.plusMinutes(10)
        );

        repository.save(lock);
    }

    @Override
    @Transactional
    public void unlockSeat(Long tripId, Long seatId, String username) {
        SeatLock lock = repository.findByTripIdAndSeatId(tripId, seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat is not locked"));
        if (!username.equals(lock.getUserSessionId())) {
            throw new UnauthorizedActionException("Unauthorized unlock attempt");
        }
        repository.delete(lock);
    }

    @Scheduled(fixedRate = 600000)
    public void cleanupExpiredLocks() {

        repository.deleteByExpiryTimeBefore(
                LocalDateTime.now()
        );

    }
}
