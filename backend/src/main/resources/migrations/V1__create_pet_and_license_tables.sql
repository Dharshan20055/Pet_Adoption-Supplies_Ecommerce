
CREATE TABLE IF NOT EXISTS licenses (
    license_id BINARY(16) PRIMARY KEY, 
    license_number VARCHAR(255) NOT NULL,
    issued_date DATE,
    expiry_date DATE,
    seller_id BIGINT
);

CREATE TABLE IF NOT EXISTS pets (
    pet_id BINARY(16) PRIMARY KEY, 
    seller_id BIGINT,
    breed VARCHAR(255),
    age INT,
    description TEXT,
    type VARCHAR(50), 
    price DECIMAL(10, 2),
    license_id BINARY(16),
    availability BOOLEAN DEFAULT TRUE,
    location VARCHAR(255),
    image_url VARCHAR(500),
    FOREIGN KEY (license_id) REFERENCES licenses(license_id)
);