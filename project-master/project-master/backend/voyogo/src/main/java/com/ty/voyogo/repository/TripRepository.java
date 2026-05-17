package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip,Long> {
    List<Trip> findByRouteSourceIgnoreCaseAndRouteDestinationIgnoreCaseAndTravelDate(String from, String to, LocalDate travelDate);

    @Query("""
            select t from Trip t
            where t.active=true
            """)
    List<Trip> findByActive();
}
