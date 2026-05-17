package com.ty.voyogo.dto.auth;

import com.ty.voyogo.entity.User;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
public class AuthResponse {
    private String username;
    private long userId;
    private String email;
    private Timestamp createdAt;

    private String phone;
    private String password;
    private LocalDate dateOfBirth;

    public AuthResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.userId = user.getUserId();
        this.createdAt = user.getCreatedAt();
    }

}
