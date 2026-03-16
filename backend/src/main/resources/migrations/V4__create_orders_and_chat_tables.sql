
CREATE TABLE IF NOT EXISTS orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id  BIGINT NOT NULL,
    seller_id   BIGINT NOT NULL,
    buyer_id    BIGINT NOT NULL,
    pet_id      BIGINT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',  -- PENDING | COMPLETED | CANCELLED
    total_amount DECIMAL(10, 2),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_request FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_seller  FOREIGN KEY (seller_id)  REFERENCES users(id),
    CONSTRAINT fk_order_buyer   FOREIGN KEY (buyer_id)   REFERENCES users(id),
    CONSTRAINT fk_order_pet     FOREIGN KEY (pet_id)     REFERENCES pets(id)
);

-- -------------------------------------------------------
-- CHAT MESSAGES TABLE
-- Stores all WebSocket chat messages linked to a request
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS chat_messages (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id  BIGINT NOT NULL,
    sender_id   BIGINT NOT NULL,
    sender_role VARCHAR(10) NOT NULL,   -- BUYER or SELLER
    message     TEXT NOT NULL,
    sent_at     DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chat_request FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
    CONSTRAINT fk_chat_sender  FOREIGN KEY (sender_id)  REFERENCES users(id)
);