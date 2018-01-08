const express = require('express');
const Order = require('../model/Order.js');
const pizzaInfo = require('../pizzaInfo.json');

const AsyncSchema = require('async-validator');
const asyncValDescriptor = {
    name: {
        type: 'string',
        required: true,
        min: 1,
        max: 100
      },
      phone: {
          type: 'string',
          pattern: /(^([0-9][0-9][0-9]( |-)?)?[0-9]{3}( |-)?[0-9]{4}$)|(^(\([0-9][0-9][0-9]\) ?)?[0-9]{3}( |-)?[0-9]{4}$)/,
          message: 'phone number is invalid. valid number example: 604-123-1234, (604) 123-1234.',
          required: true
      },
      address: {
          type: 'string',
          required: true,
          min: 1,
          max: 200
      },
      size: {
          type: 'string',
          required: true
      },
      crust: {
          type: 'string',
          required: true
      },
      toppings: {
          type: 'array',
          required: false
      },
      quantity: {
          type: 'number',
          required: true,
          min: 1
      }
  };


const validator = new AsyncSchema(asyncValDescriptor);


const PriceCalculator = require('../PriceCalculator.js');
const calculator = new PriceCalculator();

const router = express.Router();


router.get('/', function(req, res) {
    pizzaInfo.title = "Pizza Place";
    res.render('order', pizzaInfo);
});

router.get('/orderlist', function(req, res) {
    pizzaInfo.title = "Pizza Place";
    res.render('orderlist', pizzaInfo);
});


//REST end points:
router.get('/api/orders', function(req, res) {
    Order
    .find({}, function(err, orders) {
        res.json(orders);
    })
    .limit(100);
});


router.get('/api/orders/search', function (req, res) {

    console.log("req.query: ", req.query);
   

    if (req.query.phone != '' && req.query.address != '') {
        Order.find({ phone: req.query.phone, address: req.query.address }, function (err, orders) {

            console.log(orders);

            res.json(orders);
        });
    }
    else if (req.query.phone != '') {
        Order.find({ phone: req.query.phone }, function (err, orders) {

            console.log(orders);

            res.json(orders);
        });
    }
    else if (req.query.address != '') {
        Order.find({ address: req.query.address }, function (err, orders) {

            console.log(orders);

            res.json(orders);
        });
    }
    else {
        console.log("Order with that phone number or address does not exist.");
    }

});


router.post('/api/orders', function (req, res) {

    let postData = JSON.parse(JSON.stringify(req.body));
    postData.quantity = parseInt(postData.quantity);

    validator.validate(postData, (errors) => {
        if (errors) {
            console.log("Error:", errors);
            res.status(400).json({ status: "Missing required information for the order" });
        }
        else {
            let order = new Order(postData);

            order.subtotal = calculator.calculateSubtotal(postData, pizzaInfo);
            order.tax = calculator.calculateTax(order.subtotal);
            order.total = calculator.calculateTotal(order.subtotal);

            console.log("Adding a new order", order);

            
            //create new order in the system:
            order.save(function (err) {
                if (err) {
                    console.log("Error: ", err);
                    res.status(500).json({ status: "Failed to save the order" });
                    return;
                }
                res.json({ status: "Successfully added the order" });
            }); 
        }
    });

   
});



module.exports = router;
