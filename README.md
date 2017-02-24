# Bamazon
This app is an online retailer-like storefront with Node and MySQL.

## Technologies used
- node.js
- mysql

## Getting Started
In order to use the CLI app, type in the following

```
node bamazonCustomer.js
```
This displays the table called products and prompts the user to purchase one of the items

* **Bamazon YouTube Demo** - [Bamazon](https://www.youtube.com/watch?v=QBHKB5iazgQ)

![Bamazon gif](img/bamazon.gif)

## Understand
The sql schema for the database and table is:
```
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
```
Mock data has been populated in the table with the following:
```
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
```
The app prompt users with two messages:
1) the ID of the product they would like to buy.
2) the quantity of the product
Once the customer has placed the order, the app checks if there is enough stock quantity of the item. If there is enough product, the customer's order is processed and the total is returned. If not, the app logs the error message of "Insufficient quantity!" and offers the customer to place another order. The SQL table products is updated to reflect the remaining quantity.

### Prerequisites

What to install and how for local development and testing purposes

```
- node.js: visit node.js and download...
- inquirer npm: npm install inquirer (included in package.json file)
- mysql npm: npm install inquirer (included in package.json file)
- console.table npm: npm install console.table (included in package.json file)
```

## Default test (included in package.json file)

The default test is
```
node bamazonCustomer.js
```

## Built With

* SublimeText

## Author

* **Aisha Ahmad** - [Aisha Ahmad](https://github.com/aishaprograms)
