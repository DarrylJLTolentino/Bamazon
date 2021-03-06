# Bamazon

[Link to the Github Repository](https://github.com/DarrylJLTolentino/Bamazon)

This is my node application that is able to show and manipulate information that is within a MySQL server. The application is themed to be a rudimentary Amazon. There are three JavaScript files that are based off of a customer, manager, and supervisor view. At the beginning of each JavaScript files, there are the calls to the inquirer, mysql, and cli-table npm packages followed by a variable called connection, which is the pointer to MySQL's function call to create a connection between the user and the server via a port number, a username, password, and database.

![](media/bam-customer.gif "gif of bamazonCustomer.js")
In bamazonCustomer.js, a table of all products within Bamazon are shown to the customer. After, the customer is prompted to provide an id of a product they would like to purchase followed by how much of the product that they would like to purchase. Then, the js file will send a request to the MySQL server for information on whether or not the product has enough inventory. If it does, then the sale will go through and a request to update the server's data is made to the server. Then there is one more request to show the customer how much of the product they bought and the total cost. If the customer provided an amount more than the current stock, they will be notified that Bamazon has insufficient stock and will return to the prompt where they choose another product ID. The customer will then be prompted whether or not they want to continue shopping. They will return to the choose product id prompt if they choose Y and the connection will end to the server if N is chosen.

![](media/bam-manager.gif "gif of bamazonManager.js")
In bamazonManager.js, the manager is prompted with a choice. If View Products for Sale is chosen, the js file will request all products from the server, which will then be displayed in a table for the manager. If View Low Inventory is chosen, the js file will request all products with stock less than 5 to be displayed within a table to the manager. If Add to Inventory is chosen, the js file will prompt the manager to give the id of product and how much of the product to restock. Then the request to update the data within the server will happen. If Add New Product is chosen, the manager is prompted to provide the product's name, which department the product is going to be part of, the price, and stock. This information will then be inserted into the products table within the database for future reference. Choosing Exit will end the connection.

![](media/bam-supervisor.gif "gif of bamazonSupervisor.js")
In bamazonSupervisor.js, the supervisor is shown a table with all products within the database and is prompted to either view product sales by department or create a new department. If view product sales by department is chosen, then the manager will see a table of the department id, department name, over head costs, the product sales, and the total profit. If create a new department is chosen, the supervisor will be prompted to provide a name for the new department and the over head costs. Then the information will be inserted into the departments table within the database. Choosing exit will end the connection to the server. In the gif, we reopen bamazonManager to show that the departments list updated when choosing to add a new product.

######

| Technology Used | Reference |
| --------------- | --------- |
| JavaScript | https://www.javascript.com/ |
| NodeJs | https://nodejs.org/en/ |
| MySQL | https://www.mysql.com/ |
| inquirer | https://www.npmjs.com/package/inquirer |
| cli-table | https://www.npmjs.com/package/cli-table |

######

| Versioning | Reference |
| --------------- | --------- |
| Github | https://github.com/ |

######

## Author
- Darryl Tolentino

## Acknowledgements
Jake Dudum - For helping me fix syntax