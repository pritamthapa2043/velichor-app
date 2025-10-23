DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'core'
          AND table_name = 'stores'
          AND column_name = 'adress'
    ) THEN
        ALTER TABLE core.stores RENAME COLUMN adress TO address;
    END IF;
END
$$;
    