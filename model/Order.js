var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderNumber: Number,
    name : String,
    phone : String,
    address : String,
    size : String,
    crust : String,
    toppings : Array,
    quantity : Number,
    subtotal : Number,
    tax : Number,
    total : Number,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);