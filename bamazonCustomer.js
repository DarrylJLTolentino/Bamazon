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
    // menu();
});

function showAll() {
    console.log("Showing all products in Bamazon...\n");
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
        console.log(table.toString());
    });
}

// function menu() {
//     inquirer.prompt([
//         {
//             type: 
//         }
//     ])
// }