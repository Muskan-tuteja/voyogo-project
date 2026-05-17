package com.ty.voyogo.service;

import com.ty.voyogo.dto.auth.AuthRequest;
import com.ty.voyogo.dto.auth.AuthResponse;
import com.ty.voyogo.dto.auth.LoginRequest;
import com.ty.voyogo.dto.auth.LoginResponse;

public interface AuthService {

    AuthResponse register(AuthRequest authRequest);
    LoginResponse login(LoginRequest loginRequest);


}
