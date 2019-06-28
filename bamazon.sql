DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    product_sales INT,
    department_name VARCHAR(50),
    price FLOAT,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUE ("blanket", 0, "bedroom", 30, 300),
("pen", 0, "school", 1, 500),
("cereal", 0, "food", 5, 1000),
("pack of makeup wipes", 0, "makeup", 4, 100),
("purse", 0, "accessories", 250, 10),
("pair of pants", 0, "clothing", 20, 250),
("pair of socks", 0, "clothing", 3, 750),
("pair of shoes", 0, "clothing", 50, 150),
("tissue", 0, "toiletries", 2, 1000),
("ping pong ball", 0, "sports", 0.5, 2500);

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    over_head_costs INT,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUE (1, "bedroom", 300),
(2, "school", 250),
(3, "food", 2500),
(4, "makeup", 40),
(5, "accessories", 1250),
(6, "clothing", 2000),
(7, "toiletries", 350),
(8, "sports", 500);