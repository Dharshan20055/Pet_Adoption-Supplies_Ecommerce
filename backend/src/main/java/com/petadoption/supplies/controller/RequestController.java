package com.petadoption.supplies.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petadoption.supplies.dto.request.RequestDTO;
import com.petadoption.supplies.entity.Request;
import com.petadoption.supplies.service.RequestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public String createRequest(@RequestBody RequestDTO dto){
        return requestService.createRequest(dto);
    }

    @GetMapping("/{buyerId}")
    public List<Request> getRequests(@PathVariable UUID buyerId){
        return requestService.getRequestsByBuyer(buyerId);
    }
}