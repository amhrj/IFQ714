const fs = require("fs");
const employee = fs.readFileSync("Workshop_JSON_Employees.txt", "utf8");
const sales = fs.readFileSync("Workshop_JSON_Sales.txt", "utf8");

const employeeData = JSON.parse(employee);
const salesData = JSON.parse(sales);

console.log(employeeData[1]);

const fullName = employeeData.forEach((employee) => {
    console.log(employee.firstName + " " + employee.lastName);
});

console.log(fullName); // outputs undefined
// The undefined output is due to the console.log(fullName); statement. 
// The forEach method does not return any value; 
// it returns undefined. Therefore, when you assign the result of 
// forEach to fullName and then log it, you get undefined.

const itemSold = salesData.forEach((sale) => {
    console.log(sale.item);
});

const newEmployeeRecords = employeeData.map((employee) => {
    return {
        id: employee.id,
        fullName: employee.firstName + " " + employee.lastName,
        gender: employee.gender,
        position: employee.position,
        location: "Australia"
    };

});

console.log(newEmployeeRecords);

function calculateTotalSales(salesData) {
    let totalSales = 0;
    try {
        salesData.forEach((sale) => {
            if (sale.price === null) {
                throw new Error(`Missing price property in sales data for ${sale.item}`);  
            }

            totalSales += sale.price;
        });
        return totalSales;
    } catch (error) {
        console.error(error.message);
        return 0;
    }
}

const totalSalesAmount = calculateTotalSales(salesData);
console.log(`Total Sales Amount: $${totalSalesAmount}`);

function rocketCountdown(n){
    for(let i = n; i >= 0; i--){
        setTimeout(() => {
        if(i === 0){
            console.log("Blast Off!");
        } else {
            console.log(i);
        }
    }, (n - i) * 1000);
    }
    return;
}

rocketCountdown(5);