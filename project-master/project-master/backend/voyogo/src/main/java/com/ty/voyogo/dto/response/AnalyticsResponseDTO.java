package com.ty.voyogo.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsResponseDTO {

    private SummaryDTO summary;

    private List<RevenueByTripDTO> revenueByTrip;

    private List<RevenueByDateDTO> revenueByDate;

}
