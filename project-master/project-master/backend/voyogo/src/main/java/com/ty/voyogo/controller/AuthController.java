package com.ty.voyogo.controller;

import com.ty.voyogo.dto.auth.AuthRequest;
import com.ty.voyogo.dto.auth.AuthResponse;
import com.ty.voyogo.dto.auth.LoginRequest;
import com.ty.voyogo.dto.auth.LoginResponse;
import com.ty.voyogo.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voyago/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid AuthRequest authRequest) {
        return ResponseEntity.ok(authService.register(authRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }




}
