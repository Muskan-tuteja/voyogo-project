package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.Seat;
import com.ty.voyogo.entity.util.SeatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatResponseDTO {

    private Long seatId;

    private String seatNumber;

    private SeatType seatType;

    private boolean isBooked;
    private boolean locked;

    public SeatResponseDTO(Seat seat,boolean isBooked, boolean isLocked){
        this.seatId=seat.getSeatId();
        this.seatNumber=seat.getSeatNumber();
        this.seatType=seat.getSeatType();
        this.isBooked=isBooked;
        this.locked = isLocked;
    }

}
