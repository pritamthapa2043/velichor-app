export const createPaymentTable = `
CREATE TABLE if not exists "order".payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES "order".orders(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('card', 'upi', 'cod', 'wallet', 'netbanking', 'giftcard')),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'refunded', 'canceled', 'authorized')) DEFAULT 'pending',
    transaction_id VARCHAR(100),
    paid_at TIMESTAMP,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);

`;
