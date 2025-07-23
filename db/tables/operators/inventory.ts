export const createInventoryTable = `
CREATE TABLE if not exists operators.inventory (
    id SERIAL PRIMARY KEY,
    store_id INT NOT NULL REFERENCES core.stores(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES core.products(id) ON DELETE CASCADE,
    stock_level INT NOT NULL DEFAULT 0,
    reserved_stock INT NOT NULL DEFAULT 0,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);
`;
