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

function displayProducts() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        buy();
    });
}

function buy() {
    var questions = [{
        name: 'id',
        message: 'What is the item_id of the product you would like to buy?',
        type: 'input',
        validate: function(value) {
            return new Promise(function(resolve, reject) {
                var validIdQuery = 'SELECT COUNT(item_id) AS count FROM products WHERE item_id = ?';
                connection.query(validIdQuery, [value], function(err, res) {
                    if (err) throw err;
                    if (res[0].count === 1) {
                        resolve(true);
                    } else {
                        resolve('Please enter valid input');
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
        validate: function(value) {
            if (!isNaN(value)) {
                return true;
            }
            return 'Please enter a valid input';
        }
    }];
    inquirer.prompt(questions).then(function(ans) {
        var itemQuery = 'SELECT * FROM products WHERE item_id = ?';
        connection.query(itemQuery, [parseInt(ans.id)], function(err, res) {
            if (err) throw err;
            if (parseInt(ans.quantity) <= res[0].stock_quantity) {
                var newQuantity = res[0].stock_quantity - parseInt(ans.quantity);
                var orderQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?';
                connection.query(orderQuery, [newQuantity, ans.id], function() {
                    if (err) throw err;
                    var totalCost = res[0].price * parseInt(ans.quantity);
                    console.log('Your total for this order is: $' + totalCost);
                });
            } else {
                console.log('Insufficient quantity! Your order could not be processed.');
            }
        });
    });
}
