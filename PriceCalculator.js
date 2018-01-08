class PriceCalculator {
    constructor() {
        this.tax = 0.05;
    }

    getSizePrice(reqSize, pizzaSize) {
        let priceSize = 0;
        if (reqSize === pizzaSize.large.description) {
            priceSize = pizzaSize.large.price;
            //console.log(priceSize);
        }
        else if (reqSize === pizzaSize.medium.description) {
            priceSize = pizzaSize.medium.price;
            //console.log(priceSize);
        }
        else if (reqSize === pizzaSize.small.description) {
            priceSize = pizzaSize.small.price;
            //console.log(priceSize);
        }
        else {
            console.log("An error for pizza size occurred");
        }

        return priceSize;
    }

    getCrustPrice(reqCrust, pizzaCrust) {
        let priceCrust = 0;

        if (reqCrust === pizzaCrust.stuffed.description) {
            priceCrust = pizzaCrust.stuffed.price;
            //console.log(priceCrust);
        }
        else if (reqCrust === pizzaCrust.thin.description) {
            priceCrust = pizzaCrust.thin.price;
            //console.log(priceCrust);
        }
        else if (reqCrust === pizzaCrust.homestyle.description) {
            priceCrust = pizzaCrust.homestyle.price;
            //console.log(priceCrust);
        }
        else {
            console.log("An error for pizza crust occurred");
        }

        return priceCrust;
        
    }

    getToppingsPrice(reqToppings, pizzaToppings) {
        let numOfToppings = 0;
        // console.log("numOfToppings: s" + numOfToppings);
        // console.log("reqbody toppings: " + reqToppings);
        if(reqToppings != undefined) {
            numOfToppings = reqToppings.length;
        }
        let priceToppings = numOfToppings * pizzaToppings.price;
        
        return priceToppings;   
    }

    roundToDecimals(amount) {
        return Math.round(amount * 100) / 100;
    }

    calculateSubtotal(reqBody, pizzaObject) {
        let size = this.getSizePrice(reqBody.size, pizzaObject.size);
        let crust = this.getCrustPrice(reqBody.crust, pizzaObject.crust);
        let toppings = this.getToppingsPrice(reqBody.toppings, pizzaObject.toppings);
        let quantity = reqBody.quantity;
        let priceTotal = (size + crust + toppings) * quantity;
    
        // console.log("size: " + size);
        // console.log("crust: " + crust);
        // console.log("toppings: " + toppings);  
        // console.log("quantity: " + quantity); 
        // console.log("total:" + priceTotal);

        return this.roundToDecimals(priceTotal);
    }

    calculateTax(price) {
        return this.roundToDecimals(price * this.tax);
    }

    calculateTotal(price) {
        return this.roundToDecimals((price * this.tax) + price);
    }

}

module.exports = PriceCalculator;
