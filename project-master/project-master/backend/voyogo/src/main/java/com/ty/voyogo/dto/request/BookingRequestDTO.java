package com.ty.voyogo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class BookingRequestDTO {

    @NotNull(message = "Trip id is required")
    @Positive(message = "Trip id must be greater than zero")
    private Long tripId;


    @NotEmpty(message = "At least one passenger is required")
    @Valid
    private List<PassengerRequestDTO> passengers;

    @Positive(message = "Amount must be greater than zero")
    private double amount;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

}
