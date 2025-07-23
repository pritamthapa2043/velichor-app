export const createProductTable = `
create table if not exists core.products (
id serial primary key,
name varchar(255) not null,
description text,
price decimal(10,2) not null,
stock_level integer default 0,
category_id int not null REFERENCES core.categories(id) on delete set null,
image_url text,
is_deleted boolean default false,
created_at timestamp default current_timestamp,
updated_by varchar(100),
updated_at timestamp,
deleted_by varchar(100),
deleted_at timestamp
);
`;
