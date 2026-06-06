-- Create database
CREATE DATABASE dsk_interiors;

-- Connect to database and create tables
\c dsk_interiors;

-- Gallery table
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending'
);

-- Insert sample services
INSERT INTO services (title, description) VALUES
('Modular Kitchen', 'Stylish and space-saving kitchen designs.'),
('Wardrobes', 'Custom wardrobes for modern homes.'),
('Living Room', 'Elegant and comfortable living spaces.'),
('Office Interiors', 'Professional and productive office setups.');

-- Insert sample gallery
INSERT INTO gallery (title, image_url, description) VALUES
('Modern Kitchen Design', 'heroimage.jpg', 'Beautiful modern kitchen'),
('Living Room Makeover', 'IMG-20250609-WA0153.jpg', 'Elegant living room'),
('Bedroom Interior', 'IMG-20250609-WA0090.jpg', 'Cozy bedroom design');
