export const createStoreTable = `
create table if not exists core.stores (
id serial primary key,
adress text not null,
city varchar(255) not null,
state VARCHAR(100) NOT NULL,
zipcode VARCHAR(15) NOT NULL,
manager_name VARCHAR(255),
is_deleted boolean default false,
created_at timestamp default current_timestamp,
updated_by varchar(100),
updated_at timestamp,
deleted_by varchar(100),
deleted_at timestamp
);
`;
