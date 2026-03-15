package com.petadoption.supplies.serviceImpl;
import com.petadoption.supplies.dto.request.ChatMessageDTO;
import com.petadoption.supplies.entity.ChatMessage; 
import com.petadoption.supplies.service.ChatService;
import com.petadoption.supplies.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage saveMessage(ChatMessageDTO dto) {
        ChatMessage msg = new ChatMessage();
        msg.setRequestId(dto.getRequestId());
        msg.setSenderId(dto.getSenderId());
        msg.setSenderRole(dto.getSenderRole());
        msg.setMessage(dto.getMessage());
        return chatMessageRepository.save(msg);
    }

    public List<ChatMessage> getChatHistory(Long requestId) {
        return chatMessageRepository.findByRequestIdOrderBySentAtAsc(requestId);
    }
}
