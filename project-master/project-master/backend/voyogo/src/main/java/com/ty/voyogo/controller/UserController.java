package com.ty.voyogo.controller;

import com.ty.voyogo.dto.response.UserProfileResponse;
import com.ty.voyogo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/voyago/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public  UserProfileResponse profile(
            Authentication auth) {

        return userService
                .getProfile(auth.getName());

    }


}
