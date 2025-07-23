export const createDeliveryPersonTable = `
CREATE TABLE if not exists delivery.delivery_persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role varchar(100) default 'delivery_person',
    is_active boolean default true,
    vehicle_type VARCHAR(50) check (vehicle_type in ('two-wheller', 'four-wheller')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);
`;
