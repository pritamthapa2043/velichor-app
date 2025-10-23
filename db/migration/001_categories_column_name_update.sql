DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'core'
          AND table_name = 'categories'
          AND column_name = 'desription'
    ) THEN
        ALTER TABLE core.categories RENAME COLUMN desription TO description;
    END IF;
END
$$;
