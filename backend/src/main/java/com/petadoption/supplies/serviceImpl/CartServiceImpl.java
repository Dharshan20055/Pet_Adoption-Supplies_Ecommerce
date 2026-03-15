package com.petadoption.supplies.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.petadoption.supplies.dto.request.CartRequestDTO;
import com.petadoption.supplies.entity.Cart;
import com.petadoption.supplies.entity.Request;
import com.petadoption.supplies.repository.CartRepository;
import com.petadoption.supplies.repository.RequestRepository;
import com.petadoption.supplies.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final RequestRepository requestRepository;

    @Override
    public String addToCart(CartRequestDTO dto) {

        Cart cart = new Cart();

        cart.setCartId(UUID.randomUUID());
        cart.setBuyerId(dto.getBuyerId());
        cart.setPetId(dto.getPetId());
        cart.setSupplyId(dto.getSupplyId());
        cart.setAddedDate(LocalDateTime.now());

        cartRepository.save(cart);

        return "Item added to cart";
    }

    @Override
    public List<Cart> getCartByBuyer(UUID buyerId) {
        return cartRepository.findByBuyerId(buyerId);
    }

    @Override
    public String removeCart(UUID cartId) {

        cartRepository.deleteById(cartId);

        return "Item removed";
    }
    @Override
public String checkout(UUID buyerId) {

    List<Cart> cartItems = cartRepository.findByBuyerId(buyerId);

    if(cartItems.isEmpty()){
        return "Cart is empty";
    }

    for(Cart cart : cartItems){

        Request request = new Request();

        request.setRequestId(UUID.randomUUID().toString());
        request.setBuyerId(cart.getBuyerId().toString());
        request.setPetId(cart.getPetId().toString());
        request.setStatus("PENDING");
        request.setType("PURCHASE");

        requestRepository.save(request);
    }

    cartRepository.deleteAll(cartItems);

    return "Checkout successful. Requests created.";
}
}