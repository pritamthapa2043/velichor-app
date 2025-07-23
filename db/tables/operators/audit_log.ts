export const createAuditLogsTable = `
CREATE TABLE if not exists operators.audit_logs (
    id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL REFERENCES operators.admins(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    target_id INT,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_by varchar(100),
    updated_at timestamp,
    deleted_by varchar(100),
    deleted_at timestamp
);

`;
