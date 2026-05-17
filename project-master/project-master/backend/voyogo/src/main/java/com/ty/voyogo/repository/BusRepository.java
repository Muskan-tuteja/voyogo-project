package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus,String> {

    @Query("""
            select b from Bus b
            where b.active=true
            """)
    List<Bus> findByActive();
}
