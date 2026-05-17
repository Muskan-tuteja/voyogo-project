package com.ty.voyogo.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SummaryDTO {

    private double totalRevenue;

    private double occupancyRate;

    private double seatUtilization;

    private double cancellationRate;

}
