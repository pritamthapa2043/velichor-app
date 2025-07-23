export const createDeliveryTable = `
CREATE TABLE if not exists delivery.deliveries (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES "order".orders(id) ON DELETE CASCADE,
    delivery_person_id INT NOT NULL REFERENCES delivery.delivery_persons(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending'
     CHECK (status IN ('pending', 'assigned', 'picked_up', 'out_for_delivery', 'delivered', 'failed', 'returned', 'canceled')),
    estimated_time TIMESTAMP,
    actual_time TIMESTAMP,
    proof_of_delivery TEXT,
    note text,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);
`;
