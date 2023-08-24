-- CREATE DATABASE resturant;
-- \c resturant

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  UNIQUE (Email),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE restaurants (
  restaurant_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users (user_id),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reservations (
  reservation_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  restaurant_id uuid NOT NULL,
  reservation_date TIMESTAMPTZ NOT NULL,
  num_guests INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);


-- restaurant mock data

INSERT INTO restaurants (owner_id, name, city, address, phone_number)
VALUES ('0861faae-7f30-4707-a0b6-93e26439943b', 'Restaurant 1', 'Cluj', 'Address 1', '1234567890'),
       ('0861faae-7f30-4707-a0b6-93e26439943b', 'Restaurant 2', 'Cluj', 'Address 2', '2345678901'),
       ('0861faae-7f30-4707-a0b6-93e26439943b', 'Restaurant 3', 'Cluj', 'Address 3', '3456789012'),
       ('0861faae-7f30-4707-a0b6-93e26439943b', 'Restaurant 4', 'Cluj', 'Address 4', '4567890123'),
       ('0861faae-7f30-4707-a0b6-93e26439943b', 'Restaurant 5', 'Cluj', 'Address 5', '5678901234');

-- Inserting 5 restaurants for User 2 in Bucharest
INSERT INTO restaurants (owner_id, name, city, address, phone_number)
VALUES ('de4a9533-d431-4850-96a4-e07b449293ef', 'Restaurant 6', 'Bucharest', 'Address 6', '6789012345'),
       ('de4a9533-d431-4850-96a4-e07b449293ef', 'Restaurant 7', 'Bucharest', 'Address 7', '7890123456'),
       ('de4a9533-d431-4850-96a4-e07b449293ef', 'Restaurant 8', 'Bucharest', 'Address 8', '8901234567'),
       ('de4a9533-d431-4850-96a4-e07b449293ef', 'Restaurant 9', 'Bucharest', 'Address 9', '9012345678'),
       ('de4a9533-d431-4850-96a4-e07b449293ef', 'Restaurant 10', 'Bucharest', 'Address 10', '0123456789');
