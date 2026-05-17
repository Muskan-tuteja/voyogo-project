package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.Passenger;
import com.ty.voyogo.entity.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PassengerResponseDTO {

    private long passengerId;
    private String name;

    private int age;

    private Gender gender;

    public PassengerResponseDTO(Passenger passenger){
        this.passengerId=passenger.getPassengerId();
        this.name= passenger.getName();
        this.age= passenger.getAge();
        this.gender=passenger.getGender();
    }

}
