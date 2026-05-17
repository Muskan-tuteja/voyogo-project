package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.response.*;
import com.ty.voyogo.entity.util.Status;
import com.ty.voyogo.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final BookingRepository bookingRepository;

    private final BookingSeatRepository bookingSeatRepository;

    private final SeatRepository seatRepository;


    public AnalyticsResponseDTO getAnalytics() {

        double totalRevenue =
                bookingRepository.getTotalRevenue(Status.CONFIRMED);

        long totalSeats =
                seatRepository.count();

        long bookedSeats =
                bookingSeatRepository.getBookedSeatsCount(Status.CONFIRMED);

        long totalBookings =
                bookingRepository.count();

        long cancelledBookings =
                bookingRepository.countByStatus(Status.CANCELLED);


        double occupancyRate =
                calculatePercentage(bookedSeats, totalSeats);

        double seatUtilization =
                calculatePercentage(bookedSeats, totalSeats);

        double cancellationRate =
                calculatePercentage(cancelledBookings, totalBookings);


        SummaryDTO summary =
                SummaryDTO.builder()
                        .totalRevenue(totalRevenue)
                        .occupancyRate(occupancyRate)
                        .seatUtilization(seatUtilization)
                        .cancellationRate(cancellationRate)
                        .build();


        List<RevenueByTripDTO> revenueByTrip =
                bookingRepository.getRevenueByTrip(Status.CONFIRMED)
                        .stream()
                        .map(obj -> new RevenueByTripDTO(
                                (Long) obj[0],
                                (Double) obj[1]
                        ))
                        .toList();


        List<RevenueByDateDTO> revenueByDate =
                bookingRepository.getRevenueByDate(Status.CONFIRMED)
                        .stream()
                        .map(obj -> new RevenueByDateDTO(
                                (LocalDate) obj[0],
                                (Double) obj[1]
                        ))
                        .toList();


        return AnalyticsResponseDTO.builder()
                .summary(summary)
                .revenueByTrip(revenueByTrip)
                .revenueByDate(revenueByDate)
                .build();

    }


    private double calculatePercentage(long part, long total) {

        if (total == 0) return 0;

        return Math.round(
                ((double) part / total) * 100
        );

    }

}
