package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.Route;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteResponse {
    private Long routeId;

    private String source;

    private String destination;

    private double distance;


    public RouteResponse(Route route){
        this.routeId=route.getRouteId();
        this.destination= route.getDestination();
        this.source= route.getSource();

        this.distance=route.getDistance();
    }
}
