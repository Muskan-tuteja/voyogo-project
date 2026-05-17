package com.ty.voyogo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RevenueByTripDTO {

    private Long tripId;

    private double revenue;

}
