package com.ty.voyogo.dto.request;

import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatLockRequest {

    @Positive(message = "Trip id must be greater than zero")
    private long tripId;
    @Positive(message = "Seat id must be greater than zero")
    private long seatId;

}
