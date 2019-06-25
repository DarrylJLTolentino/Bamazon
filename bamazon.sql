DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INT,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("blanket", "bedroom", 30, 300),
("pen", "school", 1, 500),
("cereal", "food", 5, 1000),
("makeup wipes", "makeup", 4, 100),
("purse", "accessories", 250, 10),
("pants", "clothing", 20, 250),
("socks", "clothing", 3, 750),
("shoes", "clothing", 50, 150),
("tissue", "toiletries", 2, 1000),
("ping pong ball", "sports", 0.5, 2500);