INSERT INTO core.products 
(name, description, price, stock_level, category_id, image_url, is_deleted, updated_by)
VALUES
(
  'Classic Leather Jacket',
  'A timeless black leather jacket that pairs well with any outfit.',
  89.99,
  15,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1727524366429-27de8607d5f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073',
    'https://images.unsplash.com/photo-1593032465171-8c2fefb5d2a8?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Denim Blue Jeans',
  'Slim-fit stretch denim jeans for a comfortable all-day wear.',
  49.99,
  30,
  2,
  ARRAY[
    'https://plus.unsplash.com/premium_photo-1664542157778-4dcccb04169e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    'https://images.unsplash.com/photo-1596755389378-0d7b8b83b930?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'White Cotton T-Shirt',
  'Soft cotton tee that serves as a wardrobe essential for daily use.',
  19.99,
  50,
  3,
  ARRAY[
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600185365528-53426e1c6d1f?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Chunky Sneakers',
  'Stylish and comfortable sneakers with thick soles and breathable mesh.',
  69.99,
  20,
  4,
  ARRAY[
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Minimalist Wristwatch',
  'Modern wristwatch with a clean dial design and leather strap.',
  129.00,
  10,
  5,
  ARRAY[
    'https://images.unsplash.com/photo-1690729125175-fcda275386e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=669',
    'https://images.unsplash.com/photo-1600180758890-6ffec4c46a9c?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Woolen Scarf',
  'Soft wool scarf perfect for cold weather and cozy layering.',
  24.99,
  40,
  6,
  ARRAY[
    'https://images.unsplash.com/photo-1738774106981-cc24d010cdb7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    'https://images.unsplash.com/photo-1606813907283-74b60e1efb54?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Canvas Backpack',
  'Durable canvas backpack with multiple compartments and laptop sleeve.',
  59.99,
  25,
  7,
  ARRAY[
    'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    'https://images.unsplash.com/photo-1593032457861-89dba51c8bfa?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Running Shorts',
  'Lightweight running shorts designed for maximum movement and comfort.',
  29.99,
  35,
  8,
  ARRAY[
    'https://images.unsplash.com/photo-1729719762110-6ad6e60f4dbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    'https://images.unsplash.com/photo-1600185365528-53426e1c6d1f?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Aviator Sunglasses',
  'Classic aviator sunglasses with UV protection and metal frame.',
  39.99,
  18,
  9,
  ARRAY[
    'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880',
    'https://images.unsplash.com/photo-1534531688091-a458257992b8?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
),
(
  'Leather Wallet',
  'Premium hand-stitched leather wallet with multiple card slots and coin pocket.',
  34.99,
  22,
  10,
  ARRAY[
    'https://images.unsplash.com/photo-1629958513881-a086d21383cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80'
  ],
  false,
  'system'
);
