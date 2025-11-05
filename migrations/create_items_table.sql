CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT now()
);