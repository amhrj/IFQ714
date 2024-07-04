
function Employee(id, firstName, lastName, gender, age, position) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.position = position;

    this.logFullName = function (){
        let fullName = this.firstName + " " + this.lastName;
        console.log("Full Name: " + fullName);
    }
} 

function Sales(staffId, item, price, date){
    this.staffId = staffId;
    this.item = item;
    this.price = price;
    this.data = date;
}

const joannaBates = new Employee(30 , "Joanna", "Bates", "Female", 42, "Salesperson");
const gamingPCSale = new Sales(30, "Gaming PC", 1700, "01-11-2023");

joannaBates.logFullName();

console.log("Age: ", joannaBates.age);
console.log("Position: ", joannaBates.position);
console.log("Name: ", joannaBates.firstName + " " + joannaBates.lastName);


console.log("Item Sold: ", gamingPCSale.item);
console.log("Price: ", gamingPCSale.price);

const monitorSale = new Sales(30, "4K Monitor", 1100, "10-11-2023");

const sales = [gamingPCSale, monitorSale];

console.log(sales[1].price);

// function InventoryItem(id, name, quantity, price) {
//     this.id = id;
//     this.name = name;
//     this.quantity = quantity;
//     this.price = price;
// }

// const items = [
//     new InventoryItem(1, "Gaming PC", 10, 1700),
//     new InventoryItem(2, "Laptop", 15, 1200),
//     new InventoryItem(3, "Mouse", 50, 20)
// ];

// function recordSale(staffId, itemId, quantitySold, date) {
//     const item = items.find(i => i.id === itemId);
//     if (item && item.quantity >= quantitySold) {
//         item.quantity -= quantitySold;
//         const sale = new Sales(staffId, item.name, item.price * quantitySold, date);
//         console.log(`Sale recorded: ${quantitySold} ${item.name}(s) sold by staff ID ${staffId} on ${date}`);
//         console.log(`Remaining stock for ${item.name}: ${item.quantity}`);
//     } else {
//         console.log("Sale not possible: Insufficient stock or invalid item ID.");
//     }
// }

// recordSale(30, 1, 1, "01-11-2023");  // Recording a sale for the Gaming PC by Joanna Bates
