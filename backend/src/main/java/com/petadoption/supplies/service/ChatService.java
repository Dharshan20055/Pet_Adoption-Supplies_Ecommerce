package com.petadoption.supplies.service;
import com.petadoption.supplies.dto.request.ChatMessageDTO;
import com.petadoption.supplies.entity.ChatMessage;
import java.util.List;

public interface ChatService {
    ChatMessage saveMessage(ChatMessageDTO dto);
    List<ChatMessage> getChatHistory(Long requestId);
}