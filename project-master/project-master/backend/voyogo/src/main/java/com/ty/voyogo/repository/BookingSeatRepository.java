package com.ty.voyogo.repository;

import com.ty.voyogo.entity.BookingSeat;
import com.ty.voyogo.entity.util.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat,Long> {

    @Query("""
SELECT bs.seat.seatId
FROM BookingSeat bs
WHERE bs.booking.trip.tripId = :tripId
AND bs.booking.status = :status
""")
    List<Long> findBookedSeats(Long tripId,Status status);

    @Query("""
        SELECT COUNT(bs)
        FROM BookingSeat bs
        WHERE bs.booking.status = :status
    """)
    long getBookedSeatsCount(@RequestParam("status")Status status);
}
