package com.petadoption.supplies.controller;
import com.petadoption.supplies.dto.request.ChatMessageDTO;
import com.petadoption.supplies.entity.ChatMessage;
import com.petadoption.supplies.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

   
    @MessageMapping("/chat/{requestId}")
    public void handleChatMessage(ChatMessageDTO dto) {
        
        ChatMessage saved = chatService.saveMessage(dto);

        messagingTemplate.convertAndSend(
            "/topic/chat/" + dto.getRequestId(),
            saved
        );
    }

   
    @GetMapping("/api/chat/{requestId}/history")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long requestId) {
        return ResponseEntity.ok(chatService.getChatHistory(requestId));
    }
}
