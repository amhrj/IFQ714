const employees = JSON.parse(
  `[{
    "id":1,
    "firstName":"John",
    "lastName":"Smith",
    "gender":"Male",
    "age":23,
    "position":"Manager"
},
{
    "id":2,
    "firstName":"Mary",
    "lastName":"Sue",
    "gender":"Female",
    "age":32,
    "position":"Salesperson"
},
{
    "id":3,
    "firstName":"Fred",
    "lastName":"Jones",
    "gender":"Non-Binary",
    "age":54,
    "position":"Salesperson"
},
{
    "id":4,
    "firstName":"Jane",
    "lastName":"Doe",
    "gender":"Female",
    "age":41,
    "position":"Accountant"
},
{
    "id":5,
    "firstName":"Joe",
    "lastName":"Bloggs",
    "gender":"Male",
    "age":65,
    "position":"IT Administrator"
}]`
);

const sales = JSON.parse(
  `[{
    "staffId":1,
    "item":"Wi-Fi Adapter",
    "price":40.00,
    "date":"01-09-2022"
},
{
    "staffId":1,
    "item":"Wi-Fi Adapter",
    "price":40.00,
    "date":"03-09-2022"
},
{
    "staffId":1,
    "item":"USB Cable",
    "price":5.00,
    "date":"03-09-2022"
},
{
    "staffId":1,
    "item":"Thermal Paste",
    "price":7.50,
    "date":"05-09-2022"
},
{
    "staffId":1,
    "item":"Wi-Fi Adapater",
    "price":40.00,
    "date":"07-09-2022"
},
{
    "staffId":2,
    "item":"USB Stick",
    "price":10.99,
    "date":"06-09-2022"
},
{
    "staffId":3,
    "item":"Pre-built PC",
    "price":1999.95,
    "date":"02-09-2022"
},
{
    "staffId":3,
    "item":"USB Cable",
    "price":5.00,
    "date":"02-09-2022"
},
{
    "staffId":3,
    "item":"HDMI Cable",
    "price":15.45,
    "date":"02-09-2022"
}]`
);

function calculateTotalSales() {
  let totalSales = 0;

  for (let i = 0; i < sales.length; i++) {
    totalSales += sales[i].price;
  }

  return totalSales;
}

const total = calculateTotalSales();
console.log(total);

//Find Employee by ID

function findEmployeeById(employees, ID) {
  for (i = 0; i < employees.length; i++) {
    const test = employees[i].id;
    console.log(test);
    if (employees[i].id === ID) {
      return `${employees[i].firstName} ${employees[i].lastName}`;
    }
  }
  return "No employee found";
}

console.log(findEmployeeById(employees, 5));

function determineBonuses(employees, sales) {
  // Create an object to store total sales for each employee
  const totalSales = {};

  // Iterate through the sales array to accumulate total sales for each employee
  for (let i = 0; i < sales.length; i++) {
    const sale = sales[i]; // Get the current sale object
    const staffId = sale.staffId; // Extract the staff ID from the sale object

    // If the staffId already exists in the totalSales object, add the sale price to the existing total
    if (totalSales[staffId]) {
      totalSales[staffId] += sale.price;
    } else {
      // If the staffId does not exist in the totalSales object, create a new entry with the sale price
      totalSales[staffId] = sale.price;
    }
  }

  // Create an array to store IDs of employees eligible for bonuses
  const eligibleEmployees = [];

  // Iterate through the employees array to check their total sales
  for (let i = 0; i < employees.length; i++) {
    const employeeId = employees[i].id; // Extract the employee ID

    // Check if the employee has made sales and if the total sales exceed $500
    if (totalSales[employeeId] && totalSales[employeeId] > 500) {
      // If both conditions are met, add the employee ID to the eligibleEmployees array
      // This method of adding to the array works by using the length property
      eligibleEmployees[eligibleEmployees.length] = employeeId;
    }
  }
  
  // Return the array of IDs of employees eligible for bonuses
  return eligibleEmployees;
}

// Example usage of the determineBonuses function
const eligibleEmployees = determineBonuses(employees, sales);
console.log(eligibleEmployees); // Log the array of eligible employee IDs to the console

