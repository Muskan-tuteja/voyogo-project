package com.ty.voyogo.service.impl;

import com.ty.voyogo.dto.response.UserProfileResponse;
import com.ty.voyogo.entity.User;
import com.ty.voyogo.exception.UserNotFoundException;
import com.ty.voyogo.repository.UserRepository;
import com.ty.voyogo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public UserProfileResponse getProfile(String name) {
        User user=userRepository.findByEmail(name).orElseThrow(()->new
                UserNotFoundException("user not found"));
        return new UserProfileResponse(user);
    }
}
