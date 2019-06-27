var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    AskManager();
});

function AskManager() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do, Manager?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function (response) {
        switch (response.choice) {
            case "View Products for Sale":
                ViewProductsOnSale();
                break;
            case "View Low Inventory":
                ViewLowInventory();
                break;
            case "Add to Inventory":
                AddInventory();
                break;
            case "Add New Product":
                AddNewProduct();
                break;
            case "Exit":
                console.log("Terminating link...");
                connection.end();
                break;
        }
    })
}

function ViewProductsOnSale() {
    console.log("Showing all products...\n");
    // console.log("item_id  product_name                          department_name  price  stock_quantity");
    // console.log("-------  ------------------------------------  ---------------  -----  --------------");
    var table = new Table({
        head: ["item_id", "product_name", "product_sales", "department_name", "price", "stock_quantity"],
        colWidths: [15, 25, 20, 25, 10, 20]
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].product_sales, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString(), "\n");
        AskManager();
    });
}

function ViewLowInventory() {
    console.log("Showing all products that are low in inventory...\n");
    var table = new Table({
        head: ["item_id", "product_name", "product_sales", "department_name", "price", "stock_quantity"],
        colWidths: [15, 25, 20, 25, 10, 20]
    });
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].product_sales, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        if (table.length < 1) {
            console.log("All products are ok with inventory!");
        }
        else {
            console.log(table.toString(), "\n");
        }
        AskManager();
    });
}

function AddInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please give id of product you want to restock:"
        },
        {
            type: "number",
            name: "restock",
            message: "How much of the product do you want to restock?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (response) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?",
            [
                response.restock,
                {
                    item_id: response.id
                }
            ], function (err, res) {
                if (err) throw err;
                console.log("\n", response.restock, "more inventory added to item_id", response.id, ".\n");
                AskManager();
            });
    });
}

function AddNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of your new product?"
        },
        {
            type: "list",
            name: "department_name",
            message: "What department should this product be part of?",
            choices: ["bedroom", "school", "food", "makeup", "accessories", "clothing", "toiletries", "sports", "new department"]
        },
        {
            type: "number",
            name: "price",
            message: "How much does this product cost?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        },
        {
            type: "number",
            name: "stock_quantity",
            message: "How many of the product will be in stock?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (res) {
        connection.query("INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity) VALUE (?, ?, ?, ?, ?)",
            [res.product_name, 0, res.department_name, res.price, res.stock_quantity], function (err, response) {
                if (err) throw err;
                console.log(res.product_name, "got added to products table!");
                AskManager();
            });
    });
}