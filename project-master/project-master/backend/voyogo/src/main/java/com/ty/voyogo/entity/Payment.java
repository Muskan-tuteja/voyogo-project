package com.ty.voyogo.entity;

import com.ty.voyogo.entity.util.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String transactionId;

    private String paymentMethod;

    private PaymentStatus status;

    private LocalDateTime paymentTime;

    @Column(nullable = true)
    public LocalDateTime refundTime;



    private LocalDateTime refundCompletedTime;
    private double amount;
    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
