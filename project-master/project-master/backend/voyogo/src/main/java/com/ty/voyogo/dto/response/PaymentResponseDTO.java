package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.util.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {

    private String transactionId;

    private String paymentMethod;

    private Status status;

    private LocalDateTime paymentTime;



}
