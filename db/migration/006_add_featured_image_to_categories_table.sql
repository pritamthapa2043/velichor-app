ALTER TABLE core.categories
ADD COLUMN IF NOT EXISTS image TEXT;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'core'
          AND table_name = 'products'
          AND column_name = 'image_url'
    ) THEN
        ALTER TABLE core.products RENAME COLUMN image_url TO images;
    END IF;
END
$$;
    