export const createWishlistTable = `
CREATE TABLE IF NOT EXISTS core.wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES core.users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES core.products(id) ON DELETE CASCADE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(200),
  UNIQUE (user_id, product_id)
);

`;
