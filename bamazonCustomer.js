var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});
//Displays all the products in the table using console.table
function displayProducts() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        buy();
    });
}

function buy() {
    //an array of the two questions
    var questions = [{
        name: 'id',
        message: 'What is the item_id of the product you would like to buy?',
        type: 'input',
        //validates that the item_id is one of the available item_ids from the table
        validate: function(value) {
            return new Promise(function(resolve, reject) {
                var validIdQuery = 'SELECT COUNT(item_id) AS count FROM products WHERE item_id = ?';
                connection.query(validIdQuery, [value], function(err, res) {
                    if (err) throw err;
                    if (res[0].count === 1) {
                        resolve(true);
                    } else {
                        resolve('Please enter the item_id as a number within the range.');
                    }
                });
            }).then(function(value) {
                return value;
            });
        }
    }, {
        name: 'quantity',
        message: 'How many would you like to purchase?',
        type: 'input',
        //validates that the input is a number
        validate: function(value) {
            if (!isNaN(value) && value !== '' && value !== 0) {
                return true;
            }
            return 'Please enter a valid quantity as a number.';
        }
    }];
    inquirer.prompt(questions).then(function(ans) {
        var itemQuery = 'SELECT * FROM products WHERE item_id = ?';
        connection.query(itemQuery, [parseInt(ans.id)], function(err, res) {
            if (err) throw err;
            //if the quantity that was entered is less than or equal to the stock_quantity
            if (parseInt(ans.quantity) <= res[0].stock_quantity) {
                var newQuantity = res[0].stock_quantity - parseInt(ans.quantity);
                //updates the item's stock_quantity to be the difference of the purchased quantity
                var orderQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';
                connection.query(orderQuery, [newQuantity, ans.id], function() {
                    if (err) throw err;
                    var totalCost = res[0].price * parseInt(ans.quantity);
                    console.log('You have chosen to buy ' + ans.quantity + ' of ' + res[0].product_name);
                    console.log('Your total for this order is: $' + totalCost);
                    nextOrder();
                });
            } else {
                console.log('Insufficient quantity! Your order could not be processed.');
                nextOrder();
            }
        });
    });
    //function to prompt a new order
    function nextOrder() {
        inquirer.prompt({
                name: 'choice',
                message: 'Would you like to place another order?',
                type: 'list',
                choices: ['Yes', 'No']
            })
            .then(function(answers) {
                if (answers.choice === 'Yes') {
                    displayProducts();
                } else {
                    connection.end();
                }
            });
    }
}
