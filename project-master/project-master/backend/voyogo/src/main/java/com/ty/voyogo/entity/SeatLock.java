package com.ty.voyogo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_seat_lock_trip_seat", columnNames = {"tripId", "seatId"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatLock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lockId;

    private LocalDateTime lockTime;

    private LocalDateTime expiryTime;


    private long seatId;


    private long tripId;

    private String userSessionId;
}
