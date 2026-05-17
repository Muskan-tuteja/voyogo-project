package com.ty.voyogo.entity;

import com.ty.voyogo.entity.util.BusType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bus {

    @Id
    private String busNo;

    private String busName;


    private BusType busType;

    private int capacity;

    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
    private List<Seat> seats;

    @OneToMany(mappedBy = "bus")
    private List<Trip> trips;


}
