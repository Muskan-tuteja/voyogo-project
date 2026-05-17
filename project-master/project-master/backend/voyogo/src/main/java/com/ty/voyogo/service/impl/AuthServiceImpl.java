package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.auth.AuthRequest;
import com.ty.voyogo.dto.auth.AuthResponse;
import com.ty.voyogo.dto.auth.LoginRequest;
import com.ty.voyogo.dto.auth.LoginResponse;
import com.ty.voyogo.entity.util.Role;
import com.ty.voyogo.entity.User;
import com.ty.voyogo.exception.ConflictException;
import com.ty.voyogo.repository.UserRepository;
import com.ty.voyogo.security.JwtService;
import com.ty.voyogo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Override
    public AuthResponse register(AuthRequest authRequest) {
        if(userRepository.existsByEmail(authRequest.getEmail())){
            throw new ConflictException(authRequest.getEmail()+" already user please login");
        }
       User user=User.builder()
               .email(authRequest.getEmail())
               .phone(authRequest.getPhone())
               .role(Role.USER)
               .userName(authRequest.getUsername())
               .password(passwordEncoder.encode(authRequest.getPassword()))
               .build();

        User savedUser= userRepository.save(user);

        return new AuthResponse(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user =
                (User) authentication.getPrincipal();

        String token=jwtService.generateToken(user);
        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .build();
    }


}
