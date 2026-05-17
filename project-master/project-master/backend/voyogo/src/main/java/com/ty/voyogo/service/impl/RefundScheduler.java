package com.ty.voyogo.service.impl;

import com.ty.voyogo.entity.Payment;
import com.ty.voyogo.entity.util.PaymentStatus;
import com.ty.voyogo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RefundScheduler {

    private final PaymentRepository paymentRepository;


    @Scheduled(fixedRate = 600000) // every 10 minute
    @Transactional
    public void processRefunds() {

        LocalDateTime refundThreshold =
                LocalDateTime.now()
                        .minusMinutes(5);

        List<Payment> payments =
                paymentRepository
                        .findRefundablePayments(
                                PaymentStatus.REFUND_PENDING,
                                refundThreshold
                        );

        for (Payment payment : payments) {

            payment.setStatus(
                    PaymentStatus.REFUNDED
            );

            payment.setRefundCompletedTime(
                    LocalDateTime.now()
            );

            System.out.println(
                    "Refund completed for booking: "
                            + payment.getBooking()
                            .getBookingId()
            );

        }

    }

}

