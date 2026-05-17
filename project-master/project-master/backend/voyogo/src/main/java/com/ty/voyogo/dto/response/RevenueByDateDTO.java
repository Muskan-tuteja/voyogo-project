package com.ty.voyogo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RevenueByDateDTO {

    private LocalDate date;

    private double revenue;

}
