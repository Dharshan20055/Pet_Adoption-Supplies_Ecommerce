package com.petadoption.supplies.service;

import java.util.List;
import java.util.UUID;

import com.petadoption.supplies.dto.request.RequestDTO;
import com.petadoption.supplies.entity.Request;

public interface RequestService {

    String createRequest(RequestDTO dto);

    List<Request> getRequestsByBuyer(UUID buyerId);

}