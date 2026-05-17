package com.ty.voyogo.controller;

import com.ty.voyogo.dto.response.AnalyticsResponseDTO;
import com.ty.voyogo.service.impl.AnalyticsService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("voyago/admin/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public AnalyticsResponseDTO getAnalytics() {

        return analyticsService.getAnalytics();

    }

}
