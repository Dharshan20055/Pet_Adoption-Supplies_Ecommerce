-- ============================================================
-- Pet Marketplace - V1 Initial Schema
-- Flyway Migration for Railway MySQL
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- 1. USERS  (Ashwin)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT          NOT NULL AUTO_INCREMENT,
    username   VARCHAR(50)     NOT NULL,
    password   VARCHAR(255)    NOT NULL,
    email      VARCHAR(100)    NOT NULL,
    contact    VARCHAR(20)     NULL,
    location   VARCHAR(100)    NULL,
    created_at DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    UNIQUE KEY uq_users_username (username),
    UNIQUE KEY uq_users_email    (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. LICENSES  (SriVarshini)
-- ============================================================
CREATE TABLE IF NOT EXISTS licenses (
    license_id     BIGINT       NOT NULL AUTO_INCREMENT,
    license_number VARCHAR(100) NOT NULL,
    issued_date    DATE         NULL,
    expiry_date    DATE         NULL,
    seller_id      BIGINT       NOT NULL,
    PRIMARY KEY (license_id),
    UNIQUE KEY uq_licenses_number (license_number),
    CONSTRAINT fk_licenses_seller
        FOREIGN KEY (seller_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. PETS  (SriVarshini)
-- ============================================================
CREATE TABLE IF NOT EXISTS pets (
    pet_id       BIGINT          NOT NULL AUTO_INCREMENT,
    seller_id    BIGINT          NOT NULL,
    breed        VARCHAR(100)    NOT NULL,
    age          INT             NULL,
    description  TEXT            NULL,
    category     VARCHAR(50)     NULL,
    type         ENUM('ADOPTION','SALE') NOT NULL DEFAULT 'ADOPTION',
    price        DECIMAL(10, 2)  NULL,
    license_id   BIGINT          NULL,
    availability TINYINT(1)      NOT NULL DEFAULT 1,
    location     VARCHAR(100)    NULL,
    image_url    VARCHAR(500)    NULL,
    created_at   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (pet_id),
    CONSTRAINT fk_pets_seller
        FOREIGN KEY (seller_id)  REFERENCES users    (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_pets_license
        FOREIGN KEY (license_id) REFERENCES licenses (license_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_pets_seller     (seller_id),
    INDEX idx_pets_type       (type),
    INDEX idx_pets_category   (category),
    INDEX idx_pets_availability (availability),
    INDEX idx_pets_location   (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. CART  (ThanushKumar)
-- ============================================================
CREATE TABLE IF NOT EXISTS cart (
    cart_id    BIGINT   NOT NULL AUTO_INCREMENT,
    buyer_id   BIGINT   NOT NULL,
    pet_id     BIGINT   NOT NULL,
    added_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id),
    CONSTRAINT fk_cart_buyer
        FOREIGN KEY (buyer_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cart_pet
        FOREIGN KEY (pet_id)   REFERENCES pets  (pet_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_cart_buyer (buyer_id),
    INDEX idx_cart_pet   (pet_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. REQUESTS  (ThanushKumar)
-- ============================================================
CREATE TABLE IF NOT EXISTS requests (
    request_id  BIGINT      NOT NULL AUTO_INCREMENT,
    buyer_id    BIGINT      NOT NULL,
    pet_id      BIGINT      NOT NULL,
    description TEXT        NULL,
    status      ENUM('PENDING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
    created_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (request_id),
    CONSTRAINT fk_requests_buyer
        FOREIGN KEY (buyer_id) REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_requests_pet
        FOREIGN KEY (pet_id)   REFERENCES pets  (pet_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_requests_buyer  (buyer_id),
    INDEX idx_requests_pet    (pet_id),
    INDEX idx_requests_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. ORDERS  (Maheshwari)
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    order_id                 BIGINT       NOT NULL AUTO_INCREMENT,
    request_id               BIGINT       NOT NULL,
    seller_id                BIGINT       NOT NULL,
    status                   ENUM('PROCESSING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PROCESSING',
    stripe_payment_intent_id VARCHAR(255) NULL,
    stripe_session_id        VARCHAR(255) NULL,
    payment_status           ENUM('PENDING','PAID','FAILED','REFUNDED')  NOT NULL DEFAULT 'PENDING',
    created_at               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id),
    UNIQUE KEY uq_orders_request (request_id),
    CONSTRAINT fk_orders_request
        FOREIGN KEY (request_id) REFERENCES requests (request_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_orders_seller
        FOREIGN KEY (seller_id)  REFERENCES users    (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_orders_seller         (seller_id),
    INDEX idx_orders_status         (status),
    INDEX idx_orders_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. CHAT MESSAGES  (Maheshwari)
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
    chat_id     BIGINT   NOT NULL AUTO_INCREMENT,
    request_id  BIGINT   NOT NULL,
    sender_id   BIGINT   NOT NULL,
    receiver_id BIGINT   NOT NULL,
    message     TEXT     NOT NULL,
    timestamp   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_id),
    CONSTRAINT fk_chat_request
        FOREIGN KEY (request_id)  REFERENCES requests (request_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_chat_sender
        FOREIGN KEY (sender_id)   REFERENCES users    (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_chat_receiver
        FOREIGN KEY (receiver_id) REFERENCES users    (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_chat_request   (request_id),
    INDEX idx_chat_sender    (sender_id),
    INDEX idx_chat_receiver  (receiver_id),
    INDEX idx_chat_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
