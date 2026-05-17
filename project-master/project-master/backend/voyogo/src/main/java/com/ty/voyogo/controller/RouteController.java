package com.ty.voyogo.controller;


import com.ty.voyogo.dto.request.RouteRequest;
import com.ty.voyogo.dto.response.RouteResponse;
import com.ty.voyogo.service.RouteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voyago/admin/routes")
@CrossOrigin
@RequiredArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @PostMapping
    public ResponseEntity<RouteResponse> createRoute(@RequestBody @Valid RouteRequest routeRequest){

        return ResponseEntity.status(HttpStatus.CREATED).body(routeService.createRoute(routeRequest));
    }

    @GetMapping("/search")
    public ResponseEntity<List<RouteResponse>> getAllRoutes(){

        return ResponseEntity.status(HttpStatus.CREATED).body(routeService.getAllRoutes());
    }
    @GetMapping()
    public ResponseEntity<Page<RouteResponse>> getAllRoutes(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size){

        return ResponseEntity.status(HttpStatus.CREATED).body(routeService.getAllRoutes(page,size));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteroute(@PathVariable long id){
        routeService.deleteRoute(id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Route deleted");
    }
}
