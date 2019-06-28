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
    AskSuperVisor();
});

function AskSuperVisor() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do, Supervisor?",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(function(response) {
        switch (response.choice) {
            case "View Product Sales by Department":
                ViewProductSales();
                break;
            case "Create New Department":
                CreateNewDepartment();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
}

//ViewProductSales()
//Going to be a Join of all columns from department table
//and product_sales from products table.
//total_profit is difference between over_head_costs and product_sales.
//total_profit is a custom alias (AS total_profit)

function ViewProductSales() {
    var table = new Table({
        head: ["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"],
        colWidths: [20, 25, 25, 15, 15]
    });
    connection.query("SELECT departments.*, products.product_sales, products.product_sales - departments.over_head_costs AS total_profit FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_name", function(err, res) {
        if (err) throw err;
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
        }
        // console.log(table);
        console.log(table.toString(), "\n");
        AskSuperVisor();
    });
}