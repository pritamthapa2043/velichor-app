export const createTableCartItems = `
CREATE TABLE IF NOT EXISTS core.cart_items (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES core.users(id) ON DELETE CASCADE,
product_id INT NOT NULL REFERENCES core.products(id) ON DELETE CASCADE,
quantity INT,
size VARCHAR(20),
color VARCHAR(50)
is_deleted BOOLEAN DEFAULT FALSE,
created_by VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_by VARCHAR(100),
updated_at TIMESTAMP,
deleted_by VARCHAR(100),
deleted_at TIMESTAMP
);
`;
