-- ============================================================
-- Pet Marketplace - Database Migration V1
-- Run on Railway MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS petmarketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petmarketplace;

-- Users
CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50)  NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    contact    VARCHAR(20),
    location   VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Licenses
CREATE TABLE IF NOT EXISTS licenses (
    license_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    license_number VARCHAR(100) NOT NULL UNIQUE,
    issued_date    DATE,
    expiry_date    DATE,
    seller_id      BIGINT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Pets
CREATE TABLE IF NOT EXISTS pets (
    pet_id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    seller_id    BIGINT NOT NULL,
    breed        VARCHAR(100) NOT NULL,
    age          INT,
    description  TEXT,
    category     VARCHAR(50),
    type         ENUM('ADOPTION','SALE') NOT NULL,
    price        DECIMAL(10,2),
    license_id   BIGINT,
    availability TINYINT(1) DEFAULT 1,
    location     VARCHAR(100),
    image_url    VARCHAR(500),
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id)  REFERENCES users(user_id)    ON DELETE CASCADE,
    FOREIGN KEY (license_id) REFERENCES licenses(license_id) ON DELETE SET NULL
);

-- Cart
CREATE TABLE IF NOT EXISTS cart (
    cart_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    buyer_id   BIGINT NOT NULL,
    pet_id     BIGINT NOT NULL,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id)   REFERENCES pets(pet_id)   ON DELETE CASCADE
);

-- Requests
CREATE TABLE IF NOT EXISTS requests (
    request_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    buyer_id    BIGINT NOT NULL,
    pet_id      BIGINT NOT NULL,
    description TEXT,
    status      ENUM('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id)   REFERENCES pets(pet_id)   ON DELETE CASCADE
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    order_id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id                BIGINT NOT NULL UNIQUE,
    seller_id                 BIGINT NOT NULL,
    status                    ENUM('PROCESSING','COMPLETED','CANCELLED') DEFAULT 'PROCESSING',
    stripe_payment_intent_id  VARCHAR(255),
    stripe_session_id         VARCHAR(255),
    payment_status            ENUM('PENDING','PAID','FAILED','REFUNDED') DEFAULT 'PENDING',
    created_at                DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id)  REFERENCES users(user_id)       ON DELETE CASCADE
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
    chat_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id  BIGINT NOT NULL,
    sender_id   BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    message     TEXT NOT NULL,
    timestamp   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id)  REFERENCES requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id)   REFERENCES users(user_id)       ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)       ON DELETE CASCADE
);
