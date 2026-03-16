package com.petmarketplace.controller;

import com.petmarketplace.entity.*;
import com.petmarketplace.exception.ResourceNotFoundException;
import com.petmarketplace.repository.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@Tag(name = "Chat", description = "Live chat between buyers and sellers (REST history + WebSocket)")
@SecurityRequirement(name = "bearerAuth")
public class ChatController {

    @Autowired private ChatMessageRepository chatMessageRepository;
    @Autowired private RequestRepository requestRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{requestId}/history")
    @Operation(summary = "Get chat history for a request")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long requestId) {
        return ResponseEntity.ok(
                chatMessageRepository.findByRequest_RequestIdOrderByTimestampAsc(requestId));
    }

    @PostMapping("/{requestId}/send")
    @Operation(summary = "Send a chat message via REST (fallback)")
    public ResponseEntity<?> sendMessage(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long requestId,
            @RequestBody Map<String, Object> body) {

        User sender = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found: " + requestId));

        if (request.getStatus() != Request.RequestStatus.ACCEPTED)
            return ResponseEntity.badRequest().body(Map.of("message", "Chat is only available for accepted requests"));

        Long receiverId = Long.valueOf(body.get("receiverId").toString());
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("Receiver not found: " + receiverId));

        ChatMessage msg = ChatMessage.builder()
                .request(request)
                .sender(sender)
                .receiver(receiver)
                .message(body.get("message").toString())
                .build();

        chatMessageRepository.save(msg);

        // Push via WebSocket
        messagingTemplate.convertAndSend("/topic/chat/" + requestId, msg);

        return ResponseEntity.ok(msg);
    }
}
