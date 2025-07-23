export const createOrderTable = `
CREATE TABLE if not exists "order".orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES core.users(id) ON DELETE CASCADE,
    store_id INT NOT NULL REFERENCES core.stores(id) ON DELETE SET NULL,
    delivery_address_id INT NOT NULL REFERENCES core.addresses(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'canceled', 'returned', 'failed', 'refunded')),
    total_amount DECIMAL(10,2) NOT NULL,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);
`;
