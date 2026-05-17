package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.Trip;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripResponseDTO {

    private Long tripId;

    private String busNo;

    private String busName;

    private String source;

    private String destination;

    private LocalDate travelDate;

    private LocalTime departureTime;

    private LocalTime arrivalTime;

    private double fare;

    private LocalDate arrivalDate;
    private LocalTime time;
    public TripResponseDTO(Trip trip){
        this.tripId=trip.getTripId();
        this.busNo=trip.getBus().getBusNo();
        this.busName=trip.getBus().getBusName();
        this.source=trip.getRoute().getSource();
        this.destination=trip.getRoute().getDestination();
        this.arrivalTime=trip.getArrivalTime();
        this.departureTime=trip.getDepartureTime();
        this.travelDate=trip.getTravelDate();
        this.fare=trip.getFare();
        this.arrivalDate=trip.getArrivalDate();

    }


}
