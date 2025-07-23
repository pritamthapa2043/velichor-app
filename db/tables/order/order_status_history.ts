export const createOrderstatusHistoryTable = `
CREATE TABLE if not exists "order".order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES "order".orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL 
        CHECK (status IN ('confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'canceled', 'returned', 'failed', 'refunded')),
    note TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100) check (changed_by in ('admin','customer','delivery_person', 'system'))
);
`;
