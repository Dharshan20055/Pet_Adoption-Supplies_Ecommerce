package com.petadoption.supplies.serviceImpl;

import com.petadoption.supplies.entity.Order;
import com.petadoption.supplies.repository.OrderRepository;
import com.petadoption.supplies.service.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private com.petadoption.supplies.repository.RequestRepository requestRepository;

    public Order approveRequest(Long requestId) {
        var request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        request.setStatus("ACCEPTED");
        requestRepository.save(request);

        Order order = new Order();
        order.setRequestId(requestId);
        order.setSellerId(request.getSellerId());
        order.setBuyerId(request.getBuyerId());
        order.setPetId(request.getPetId());
        order.setStatus("PENDING");
        order.setTotalAmount(request.getOfferedPrice()); // assumes Request has offeredPrice field

        return orderRepository.save(order);
    }

 
    public void rejectRequest(Long requestId) {
        var request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        request.setStatus("REJECTED");
        requestRepository.save(request);
    }

   
    public List<Order> getOrdersBySeller(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}

