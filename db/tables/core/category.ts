export const createTableCategory = `
create table if not exists core.categories (
id SERIAL primary key,
name varchar(255) not null,
desription text,
is_deleted boolean default false,
created_at timestamp default current_timestamp,
updated_by varchar(100),
updated_at timestamp,
deleted_by varchar(100),
deleted_at timestamp
);
`;
