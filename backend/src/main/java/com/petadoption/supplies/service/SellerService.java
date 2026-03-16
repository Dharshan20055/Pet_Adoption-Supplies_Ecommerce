package com.petadoption.supplies.service;
import com.petadoption.supplies.entity.Order;
import java.util.List;

public interface SellerService {
    Order approveRequest(Long requestId);
    void rejectRequest(Long requestId);
    List<Order> getOrdersBySeller(Long sellerId);
    Order updateOrderStatus(Long orderId, String status);
}