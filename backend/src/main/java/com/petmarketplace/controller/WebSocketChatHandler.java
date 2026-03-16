package com.petmarketplace.controller;

import com.petmarketplace.entity.*;
import com.petmarketplace.exception.ResourceNotFoundException;
import com.petmarketplace.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

/**
 * Handles STOMP WebSocket messages sent to /app/chat/{requestId}
 * Broadcasts to /topic/chat/{requestId}
 */
@Controller
public class WebSocketChatHandler {

    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private RequestRepository requestRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{requestId}")
    public void handleChatMessage(
            @DestinationVariable Long requestId,
            @Payload Map<String, Object> payload) {

        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getStatus() != Request.RequestStatus.ACCEPTED) return;

        Long senderId   = Long.valueOf(payload.get("senderId").toString());
        Long receiverId = Long.valueOf(payload.get("receiverId").toString());
        String message  = payload.get("message").toString();

        User sender   = userRepository.findById(senderId).orElseThrow();
        User receiver = userRepository.findById(receiverId).orElseThrow();

        ChatMessage msg = ChatMessage.builder()
                .request(request)
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .build();

        chatMessageRepository.save(msg);
        messagingTemplate.convertAndSend("/topic/chat/" + requestId, msg);
    }
}
