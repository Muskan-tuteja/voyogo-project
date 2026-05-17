package com.ty.voyogo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ty.voyogo.entity.util.Gender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long passengerId;

    private String name;

    private int age;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String seatNumber;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
