export const createTableAddress = `
create table if not exists core.addresses (
id SERIAL primary key,
user_id int not null REFERENCES core.users(id) on delete cascade,
line1 varchar(255) not null,
line2 varchar(255),
city varchar(50) not null,
state varchar(50) not null,
pincode varchar(6) not null,
is_deleted boolean default false,
created_by varchar(100),
created_at timestamp default current_timestamp,
updated_by varchar(100),
updated_at timestamp,
deleted_by varchar(100),
deleted_at timestamp 
);
`;
