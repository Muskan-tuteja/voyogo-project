package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Booking;
import com.ty.voyogo.entity.util.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    @Query("""
        SELECT bs.seat.seatId
        FROM BookingSeat bs
        WHERE bs.booking.trip.tripId = :tripId
        AND bs.booking.status = :status
    """)
    List<Long> findBookedSeatIds(long tripId, Status status);

    List<Booking> findByTrip_TravelDate(LocalDate date);

    // Total revenue
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Booking b
        WHERE b.status = :status
    """)
    double getTotalRevenue(@RequestParam("status") Status status);


    // Revenue per trip
    @Query("""
        SELECT b.trip.tripId, SUM(b.totalAmount)
        FROM Booking b
        WHERE b.status = :status
        GROUP BY b.trip.tripId
    """)
    List<Object[]> getRevenueByTrip(@RequestParam("status") Status status);


    // Revenue per date
    @Query("""
        SELECT b.trip.travelDate, SUM(b.totalAmount)
        FROM Booking b
        WHERE b.status = :status
        GROUP BY b.trip.travelDate
        ORDER BY b.trip.travelDate
    """)
    List<Object[]> getRevenueByDate(@RequestParam("status") Status status);


    // Total bookings count
    long countByStatus(Status status);


    // Cancelled bookings count
    long countByStatusEquals(Status status);
}
