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
    ]).then(function(response) {
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
                console.log("Terminating link...\n");
                connection.end();
                break;
        }
    })
}

function ViewProductsOnSale() {
    console.log("Showing all products in Bamazon...\n");
    // console.log("item_id  product_name                          department_name  price  stock_quantity");
    // console.log("-------  ------------------------------------  ---------------  -----  --------------");
    var table = new Table({
        head: ["item_id", "product_name", "product_sales", "department_name", "price", "stock_quantity"],
        colWidths: [15, 25, 20, 25, 10, 20]
    });
    connection.query("SELECT * FROM productsManager", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].product_sales, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString(), "\n");
        AskManager();
    });
}