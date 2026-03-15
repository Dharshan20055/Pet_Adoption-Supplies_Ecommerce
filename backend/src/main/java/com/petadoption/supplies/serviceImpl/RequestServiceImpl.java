package com.petadoption.supplies.serviceImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.petadoption.supplies.dto.request.RequestDTO;
import com.petadoption.supplies.entity.Request;
import com.petadoption.supplies.repository.RequestRepository;
import com.petadoption.supplies.service.RequestService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;

    @Override
    public String createRequest(RequestDTO dto) {

        Request request = new Request();

        request.setRequestId(UUID.randomUUID().toString());
        request.setBuyerId(dto.getBuyerId().toString());
        request.setPetId(dto.getPetId().toString());
        request.setDescription(dto.getDescription());
        request.setStatus("PENDING");
        request.setType(dto.getType());

        requestRepository.save(request);

        return "Request submitted successfully";
    }

    @Override
    public List<Request> getRequestsByBuyer(UUID buyerId) {

        return requestRepository.findByBuyerId(buyerId);

    }
}