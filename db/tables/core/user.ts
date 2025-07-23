export const createUserTable = `
CREATE TABLE IF NOT EXISTS core.users (
id SERIAL PRIMARY KEY,
name varchar(100) not null,
role varchar(100) default 'customer',
email varchar(255) unique,
phone varchar(15) not null,
password_hash varchar(255),
is_active boolean default true,
is_deleted boolean default false,
created_at timestamp default current_timestamp,
updated_by varchar(100),
updated_at timestamp,
deleted_by varchar(100),
deleted_at timestamp
);
`;
