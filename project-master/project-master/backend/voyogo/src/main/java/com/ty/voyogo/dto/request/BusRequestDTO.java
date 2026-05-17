package com.ty.voyogo.dto.request;

import com.ty.voyogo.entity.Bus;
import com.ty.voyogo.entity.util.BusType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusRequestDTO {

    @NotBlank(message = "Bus number is required")
    private String busNo;

    @NotBlank(message = "Bus name is required")
    private String busName;

    @NotNull(message = "Bus type is required")
    private BusType busType;

    @Min(value = 2, message = "Capacity must be at least 2")
    private int capacity;

    public BusRequestDTO(Bus bus){
        this.busNo=bus.getBusNo();
        this.busName=bus.getBusName();
        this.busType=bus.getBusType();
        this.capacity=bus.getCapacity();
    }

}
