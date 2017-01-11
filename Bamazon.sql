CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT,
	product_name VARCHAR(250) NOT NULL, 
	department_name VARCHAR(250) NOT NULL,
	price DECIMAL(6,2) NOT NULL,
	stock_quantity INT(6) NOT NULL, 
	PRIMARY KEY(item_id)
)

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Water Bottles', 'Grocery', 4.00, 1000),
('Notebook', 'Office', 1.00, 500),
('Alarm Clock', 'Electronics', 10.00, 200),
('Contact Solution', 'Health', 12.00, 300),
('Backpack', 'Luggage', 50.00, 100),
('Computer Mouse', 'Technology', 9.00, 400),
('Towel', 'Home', 15.00, 250),
('Yoga Mat', 'Health', 20.00, 50),
('Bird Food', 'Pets', 10.00, 30),
('Pillow', 'Home', 25.00, 170),
('Pencil Set', 'Office', 1.00, 1500) 