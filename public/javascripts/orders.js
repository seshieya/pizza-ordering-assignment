//Add the following to Courses.js in public/javascripts folder

$(function ready() {

    $.getJSON("/api/orders", function (data) {
        data.forEach(function (item) {

            let htmlmarkup = '<tr>\
                <td>\
                    <ul>\
                        <li><strong>Order Number:</strong> ' + item.orderNumber + '</li>\
                        <li><strong>Name:</strong> ' + item.name + '</li>\
                        <li><strong>Phone:</strong> ' + item.phone + '</li>\
                        <li><strong>Address:</strong> ' + item.address + '</li>\
                        <li><strong>Size:</strong> ' + item.size + '</li>\
                        <li><strong>Crust:</strong> ' + item.crust + '</li>\
                        <li><strong>Toppings:</strong> ' + item.toppings + '</li>\
                        <li><strong>Quantity:</strong> ' + item.quantity + '</li>\
                    </ul>\
                </td>\
                <td>\
                    <ul>\
                        <li><strong>Subtotal:</strong> ' + item.subtotal + '</li>\
                        <li><strong>Tax:</strong> ' + item.tax + '</li>\
                        <li><strong>Total:</strong> ' + item.total + '</li>\
                    </ul>\
                </td>\
            </tr>';

            $('#order-list').append(htmlmarkup);
        });
    });

});