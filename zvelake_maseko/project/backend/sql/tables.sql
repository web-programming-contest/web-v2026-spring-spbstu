CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL UNIQUE,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    paid_at DATE,
    cancelled_at DATE,
    amount INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    
    delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('delivery', 'pickup')) DEFAULT 'delivery',
    
    city VARCHAR(100),
    street VARCHAR(150),
    house VARCHAR(20),
    apartment VARCHAR(20),
    postal_code VARCHAR(20),
    
    phone_number VARCHAR(20) NOT NULL,
    payment_method VARCHAR(20) NOT NULL DEFAULT 'card',
    
    FOREIGN KEY (customer_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE products(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	description TEXT,
	category_id INT,
	image_url VARCHAR(255),
	price INT,
	specs TEXT[],
	in_stock BOOL DEFAULT true,
	rating INT,
	FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE product_reviews(
	id SERIAL PRIMARY KEY,
	user_id INT,
	product_id INT
	review TEXT,
	created_at DATE NOT NULL DEFAULT CURRENT_DATE(),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	full_name VARCHAR(100),
	email VARCHAR(50),
	avatar_url VARCHAR(255),
	password_hash TEXT,
	created_at DATE NOT NULL DEFAULT CURRENT_DATE()
);
CREATE TABLE api_keys(
	id SERIAL PRIMARY KEY,
	owner_id INTEGER NOT NULL,
	name VARCHAR(50) NOT NULL,
	key_hash VARCHAR(255) NOT NULL,
	FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE
);