package com.ty.voyogo.service;

import com.ty.voyogo.dto.response.UserProfileResponse;

public interface UserService {

    UserProfileResponse getProfile(String name);
}
