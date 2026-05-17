package com.ty.voyogo.dto.response;

import com.ty.voyogo.entity.util.Role;
import com.ty.voyogo.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class UserProfileResponse {
    private String username;
    private long userId;
    private String email;
    private Timestamp createdAt;
    private Role role;
    private String phone;



    public UserProfileResponse(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.userId = user.getUserId();
        this.createdAt = user.getCreatedAt();
        this.role=user.getRole();
    }
}
