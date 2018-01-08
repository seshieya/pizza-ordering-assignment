var orderNum = Date.now();

$(function ready() {
    $("#submit-form").submit(function (event) {
        event.preventDefault();

        var checkedToppings = $('input[id^="toppings"]:checked').map(function() {
            return this.value;
        }).get();


        var orderInfo = JSON.stringify({
            orderNumber: orderNum,
            name: $('#name').val(),
            phone: $('#phone').val(),
            address: $('#address').val(),
            size: $('input[id^="size"]:checked').val(),
            crust: $('input[id^="crust"]:checked').val(),
            toppings: checkedToppings,
            quantity: $('#quantity').val(), 
        });

        console.log("JQUERY", orderInfo);

        $.ajax({
            url: '/api/orders',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: orderInfo,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the order');
                console.log('Request success: ', status);
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order');
                console.log('Request failed : ', status);
            }
        });
    });


    $("#search-form").submit(function (event) {
        event.preventDefault();

        let searchInfo = {
            phone: $('#searchphone').val(),
            address: $('#searchaddress').val()
        };

        console.log(searchInfo);

        $.ajax({
            url: '/api/orders/search',
            type: 'GET',
            dataType: 'json',            
            data: searchInfo, 
            success: function (json, request, status) {
                console.log('Request success : ', status);
                console.log('Request data :', request);
                console.log('Json data: ', json);

                $('#order-list').html('<th>Details</th><th>Total</th>');
                
                if(!json[0]) {
                    $('#searchMsg').html('<p>No matches found</p>');
                }

                json.forEach(function (item) {


                    //console.log("items : ", item);

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
                    $('#searchMsg').html('');                 
                });
              


            },
            error: function (request, status) {
                console.log('Request failed : ', status);
            }
        });
    });



    /*JQUERY VALIDATE */
    $("#submit-form").validate({
        rules: {
            "name": "required",
            "phone": {
                required: true,
                regex: /(^([0-9][0-9][0-9]( |-)?)?[0-9]{3}( |-)?[0-9]{4}$)|(^(\([0-9][0-9][0-9]\) ?)?[0-9]{3}( |-)?[0-9]{4}$)/
            },
            "address": "required",
            "size": "required",
            "crust": "required",
            "quantity": {
                required: true,
                digits: true,
                min: 1,
            }
        }, 
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        }
    });


    $.validator.addMethod("regex", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "Phone is invalid. Valid number example: 604-123-1234, (604) 123-1234.");

});

