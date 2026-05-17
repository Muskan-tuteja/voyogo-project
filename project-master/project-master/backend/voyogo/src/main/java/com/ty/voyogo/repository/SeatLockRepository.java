package com.ty.voyogo.repository;

import com.ty.voyogo.entity.SeatLock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatLockRepository extends JpaRepository<SeatLock,Long> {

    boolean existsByTripIdAndSeatId(long tripId,long seatId);
    @Modifying
    @Transactional
    void deleteByTripIdAndSeatId(long tripId,long seatId);

    @Modifying
    @Transactional
    void deleteByExpiryTimeBefore(LocalDateTime now);

    @Query("""
        SELECT ls.seatId
        FROM SeatLock ls
        WHERE ls.tripId = :tripId
    """)
    List<Long> findByTripId(long tripId);

    Optional<SeatLock> findByTripIdAndSeatId(Long tripId, Long seatId);
    List<SeatLock> findByTripIdAndSeatIdIn(Long tripId, List<Long> seatIds);
    @Modifying
    void deleteByTripIdAndSeatIdIn(Long tripId, List<Long> seatIds);
}
