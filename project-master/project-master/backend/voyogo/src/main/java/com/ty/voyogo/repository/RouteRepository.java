package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Route;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route,Long> {

    @Query("SELECT DISTINCT r.source FROM Route r WHERE LOWER(r.source) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<String> findSourceSuggestions(String keyword);

    @Query("SELECT DISTINCT r.destination FROM Route r WHERE LOWER(r.destination) LIKE LOWER(CONCAT(:keyword, '%'))")
    List<String> getDestinationSuggestions(String keyword);


    Optional<Route> findBySourceAndDestination(String source, String destination);

    @Query("SELECT  r FROM Route r where active=true")
    Page<Route> findAllActive(Pageable pageable);
}
