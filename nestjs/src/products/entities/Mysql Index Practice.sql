-- Tạo bảng Products
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    not_index_category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    not_index_price DECIMAL(10, 2),
    stock_quantity INT NOT NULL,
    not_index_stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_category (category), -- Index cho cột category
    KEY idx_price_stock (price, stock_quantity) -- Composite Index cho price và stock_quantity
);

-- Tạo bảng Customers
CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    not_index_name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    not_index_phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_name (name), -- Index cho cột name
    KEY idx_phone_number (phone_number) -- Index cho cột phone_number
);

-- Tạo bảng Orders
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    not_index_customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    not_index_order_date TIMESTAMP,
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_order_date (customer_id, order_date), -- Composite Index cho customer_id và order_date
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES Customers (id) ON DELETE CASCADE
);

-- Tạo bảng OrderDetails
CREATE TABLE OrderDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    not_index_order_id INT,
    product_id INT NOT NULL,
    not_index_product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_product (order_id, product_id), -- Composite Index cho order_id và product_id
    INDEX idx_product (product_id), -- Index cho cột product_id
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES Orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE
);
