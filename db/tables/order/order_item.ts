export const createOrderItemsTable = `
CREATE TABLE if not exists "order".order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES "order".orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES core.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);
`;
