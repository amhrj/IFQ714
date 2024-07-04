function getDiscount(membershipLevel) {
    let discount;

    if (membershipLevel === 'Gold') {
        discount = 20; // 20% discount
    } else if (membershipLevel === 'Silver') {
        discount = 10; // 10% discount
    } else if (membershipLevel === 'Bronze') {
        discount = 5; // 5% discount
    } else {
        discount = 0; // no discount
    }

    return discount;
}

function processOrderStatus(status) {
    switch (status) {
        case 'Pending':
            console.log("Order is pending. Please wait for confirmation.");
            break;
        case 'Confirmed':
            console.log("Order confirmed. Preparing for shipment.");
            break;
        case 'Shipped':
            console.log("Order shipped. In transit to your address.");
            break;
        case 'Delivered':
            console.log("Order delivered. Thank you for shopping with us!");
            break;
        case 'Cancelled':
            console.log("Order cancelled. Please contact support for further assistance.");
            break;
        default:
            console.log("Unknown order status.");
    }
}

// Example usage:
let customerMembership = 'Gold';
let orderStatus = 'Confirmed';

console.log(`Discount for ${customerMembership} member: ${getDiscount(customerMembership)}%`);
processOrderStatus(orderStatus);
