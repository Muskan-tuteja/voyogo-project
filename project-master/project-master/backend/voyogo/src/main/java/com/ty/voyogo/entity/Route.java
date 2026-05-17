package com.ty.voyogo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    private String source;

    private String destination;

    private double distance;

    private boolean active;

    @OneToMany(mappedBy = "route")
    private List<Trip> trips;

}
