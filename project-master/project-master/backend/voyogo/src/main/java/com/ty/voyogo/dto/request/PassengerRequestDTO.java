package com.ty.voyogo.dto.request;

import com.ty.voyogo.entity.util.Gender;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PassengerRequestDTO {

    @NotNull(message = "Seat id is required")
    @Positive(message = "Seat id must be greater than zero")
    private Long seatId;

    @NotBlank(message = "Passenger name is required")
    private String name;

    @Min(value = 1, message = "Age must be at least 1")
    @Max(value = 120, message = "Age must be <= 120")
    private int age;

    @NotNull(message = "Gender is required")
    private Gender gender;


}
