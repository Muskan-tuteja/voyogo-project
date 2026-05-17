package com.ty.voyogo.dto.common;





import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponseDTO<T> {

    private boolean success;

    private String message;

    private T data;

}

