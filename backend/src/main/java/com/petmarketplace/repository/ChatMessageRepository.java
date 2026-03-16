package com.petmarketplace.repository;

import com.petmarketplace.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRequest_RequestIdOrderByTimestampAsc(Long requestId);
}
