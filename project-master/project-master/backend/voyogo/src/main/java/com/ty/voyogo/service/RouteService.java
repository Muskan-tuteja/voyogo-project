package com.ty.voyogo.service;

import com.ty.voyogo.dto.request.RouteRequest;
import com.ty.voyogo.dto.response.RouteResponse;
import com.ty.voyogo.dto.response.SeatResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RouteService {

    RouteResponse createRoute(RouteRequest routeRequest);

     List<RouteResponse> getAllRoutes();
    Page<RouteResponse> getAllRoutes(int page, int size);

    List<String> getSourceSuggestions(String keyword);
  List<String> getDestinationSuggestions(String keyword);

    List<SeatResponseDTO> getSeats(long tripId);

     void deleteRoute(long id);
}
