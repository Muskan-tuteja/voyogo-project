package com.ty.voyogo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TripRequestDTO {

    @NotBlank(message = "Bus number is required")
    private String busNo;

    @NotNull(message = "Route id is required")
    @Positive(message = "Route id must be greater than zero")
    private Long routeId;

    @NotNull(message = "Travel date is required")
    private LocalDate travelDate;

    @NotNull(message = "Departure time is required")
    private LocalTime departureTime;

    @NotNull(message = "Arrival time is required")
    private LocalTime arrivalTime;

    @Positive(message = "Fare must be greater than zero")
    private double fare;

    @NotNull(message = "Arrival date is required")
    private LocalDate arrivalDate;

}

