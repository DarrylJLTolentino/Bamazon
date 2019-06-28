var inquirer = require("inquirer");
var mysql = require("mysql");
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
    showAll();
});

function showAll() {
    console.log("\nShowing all products in Bamazon...\n");
    // console.log("item_id  product_name                          department_name  price  stock_quantity");
    // console.log("-------  ------------------------------------  ---------------  -----  --------------");
    var table = new Table({
        head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
        colWidths: [15, 25, 25, 10, 20]
    });
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString(), "\n");
        ChooseProduct();
    });
}

function ChooseProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the id of the product you would like to purchase?"
        },
        {
            type: "input",
            name: "amount",
            message: "How much of the product would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false && value !== "") {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (response) {
        CheckProduct(response.id, response.amount);
    })
}

function CheckProduct(id, amount) {
    connection.query(
        "SELECT * from products WHERE item_id = ?", [id], function (err, res) {
            if (err) throw err;
            // console.log(res);
            // console.log(parseInt(amount));
            // console.log(parseInt(res[0].stock_quantity));
            if (parseInt(amount) > parseInt(res[0].stock_quantity)) {
                console.log("Insufficient quantity!");
                ChooseProduct();
            }
            else {
                var newQuantity = parseInt(res[0].stock_quantity) - parseInt(amount);
                UpdateProduct(newQuantity, id, amount, res[0].price);
            }
        }
    )
}

function UpdateProduct(newQuantity, id, amount, price) {
    connection.query(
        "UPDATE products SET ?, ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                product_sales: amount * price
            },
            {
                item_id: id
            }
        ], function (err, res) {
            if (err) throw err;
            // console.log(res);
            RereadProduct(id, amount);
        }
    )
}

function RereadProduct(id, amount) {
    connection.query(
        "SELECT * from products WHERE item_id = ?", [id], function (err, res) {
            if (err) throw err;
            // console.log(res);
            else {
                if (res[0].product_name[res[0].product_name.length - 1] === "s") {
                    console.log(amount, res[0].product_name + " sold!");
                }
                else {
                    console.log(amount, res[0].product_name + "(s) sold!");
                }
                var cost = amount * res[0].price;
                console.log("Total cost: $" + cost, "!");
                ChooseToExit();
            }
        }
    )
}

function ChooseToExit() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to buy anything else?"
        }
    ]).then(function (res) {
        switch (res.confirm) {
            case true:
                showAll();
                break;
            case false:
                connection.end();
                break;
        }
    })
}