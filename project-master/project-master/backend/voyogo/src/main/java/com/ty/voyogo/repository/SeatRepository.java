package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat,Long> {
    List<Seat> findByBusBusNo(String busNo);

    long count();
}
