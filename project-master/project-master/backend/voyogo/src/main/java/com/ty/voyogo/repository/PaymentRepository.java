package com.ty.voyogo.repository;

import com.ty.voyogo.entity.Payment;
import com.ty.voyogo.entity.util.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {


    Optional<Payment> findByBookingBookingId(long bookingId);

    @Query("""
        SELECT p FROM Payment p
        WHERE p.status = :status
        AND p.refundTime <= :time
    """)
    List<Payment> findRefundablePayments(
            PaymentStatus status,
            LocalDateTime time

    );
}
