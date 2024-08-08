// const fs = require("fs");
// const airports = fs.readFileSync("A2_Airports.json", "utf8");
// const flights = fs.readFileSync("A2_Flights.json", "utf8");

// const airportResponse = fetch("A2_Airports.json");
// const airportData = airportResponse.json();
// const flightResponse = fetch("A2_Flights.json");
// const flightData = flightResponse.json();
// console.log(airportData[0]);

// const combinedData = [];

// const newData = flightData.map((flight) => {
//   const origin = airportData.find(
//     (airport) => airport.id === flight.source_airport_id
//   );
//   const destination = airportData.find(
//     (airport) => airport.id === flight.destination_airport_id
//   );
//   const date = new Date().toLocaleString("en-AU", {
//     timeZone: "Australia/Brisbane",
//   });
//   combinedData.push({
//     source_airport: origin,
//     destination_airport: destination,
//     codeshare: flight.codeshare,
//     aircraft: flight.aircraft,
//     airline: {
//       code: flight.airline,
//       name: flight.airline_name,
//       country: flight.airline_country,
//     },
//     timeStamp: date,
//   });
// });

// console.log(combinedData[0]);
const newSetData = [];
let combinedUniqueRoute = [];
let originCity = [];
let destinationCity = [];
let airlines = [];
let aircrafts = [];

async function fetchData() {
  function getUniqueRoutes(routes) {
    const uniqueRoutes = [];
    const seenRoutes = new Set();

    for (const route of routes) {
      const routeKey1 = `${route.source_airport.name}-${route.destination_airport.name}`;
      const routeKey2 = `${route.destination_airport.name}-${route.source_airport.name}`;

      if (!seenRoutes.has(routeKey1) && !seenRoutes.has(routeKey2)) {
        uniqueRoutes.push(route);
        combinedUniqueRoute.push(route);
        seenRoutes.add(routeKey1);
        seenRoutes.add(routeKey2);
      }
    }

    return uniqueRoutes;
  }

  try {
    const airportResponse = await fetch("A2_Airports.json");
    const airportData = await airportResponse.json();

    const flightResponse = await fetch("A2_Flights.json");
    const flightData = await flightResponse.json();

    newSetData.push(
      ...flightData.map((flight) => {
        const origin = airportData.find(
          (airport) => airport.id === flight.source_airport_id
        );
        const destination = airportData.find(
          (airport) => airport.id === flight.destination_airport_id
        );
        const date = new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Brisbane",
        });

        return {
          source_airport: origin,
          destination_airport: destination,
          codeshare: flight.codeshare,
          aircraft: flight.aircraft,
          airline: {
            code: flight.airline,
            name: flight.airline_name,
            country: flight.airline_country,
          },
          timeStamp: date,
        };
      })
    );

    console.log(newSetData);

    combinedUniqueRoute = getUniqueRoutes(newSetData);

    console.log("This is combinedUniqueRoute:" + combinedUniqueRoute);
    console.log("This is combinedUniqueRoute:" + combinedUniqueRoute.length);

    // Populate the select element with source airports
    const sourceAirports = [
      ...new Set(combinedUniqueRoute.map((flight) => flight.source_airport.city)),
    ];
    const selectElement = document.getElementById("filterSourceAirportSelect");
    console.log(sourceAirports);

    sourceAirports.forEach((city) => {
      const newOption = document.createElement("option");
      newOption.value = city;
      newOption.text = city;
      selectElement.appendChild(newOption);
      
    });

    const airportDataSourceAirport = [...new Set(combinedUniqueRoute.map((flight) => flight.source_airport.city))];
    const selectElementCity = document.getElementById("filterCitySelect");

    airportDataSourceAirport.forEach((city) => {
      const newOption = document.createElement("option");
      newOption.value = city;
      newOption.text = city;
      selectElementCity.appendChild(newOption);
    }
    );

    const destinationAirports = [
      ...new Set(combinedUniqueRoute.map((flight) => flight.destination_airport.city)),
    ];
    const selectElement2 = document.getElementById(
      "filterDestinationAirportSelect"
    );
    console.log(destinationAirports);

    destinationAirports.forEach((city) => {
      const newOption = document.createElement("option");
      newOption.value = city;
      newOption.text = city;
      selectElement2.appendChild(newOption);
    });

    const airlines = [
      ...new Set(combinedUniqueRoute.map((flight) => flight.airline.name)),
    ];
    const selectElement3 = document.getElementById("filterAirlineSelect");

    airlines.forEach((airline) => {
      const newOption = document.createElement("option");
      newOption.value = airline;
      newOption.text = airline;
      selectElement3.appendChild(newOption);
    });

    const aircraft = [
      ...new Set(combinedUniqueRoute.map((flight) => flight.aircraft[0])),
    ];
    const selectElement4 = document.getElementById("filterAircraftSelect");

    aircraft.forEach((aircraft) => {
      const newOption = document.createElement("option");
      newOption.value = aircraft;
      newOption.text = aircraft;
      selectElement4.appendChild(newOption);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function flightDetail(city) {
  originCity = []; // Clear previous results
  const filteredFlights = combinedUniqueRoute.filter(
    (flight) => flight.source_airport.city === city
  );
  originCity.push(...filteredFlights);
  return originCity;
}

function flightDetailAirportData(city) {
  return combinedUniqueRoute.filter(flight => 
    flight.source_airport.city.toLowerCase().startsWith(city.substring(0, 3))
  );
}

function flightDetailDestination(city) {
  destinationCity = []; // Clear previous results
  const filteredFlights = combinedUniqueRoute.filter(
    (flight) => flight.destination_airport.city === city
  );
  destinationCity.push(...filteredFlights);
  return destinationCity;
}

function flightDetailAirline(airline) {
  airlines = []; // Clear previous results
  const filteredFlights = combinedUniqueRoute.filter(
    (flight) => flight.airline.name === airline
  );
  airlines.push(...filteredFlights);
  return airlines;
}

function flightDetailAircraft(aircraft) {
  aircrafts = []; // Clear previous results
  const filteredFlights = combinedUniqueRoute.filter(
    (flight) => flight.aircraft[0] === aircraft
  );
  aircrafts.push(...filteredFlights);
  return aircrafts;
}

function checkMatchedFlights() {
  const sourceAirport = document.getElementById("filterSourceAirportSelect").value;
  const destinationAirport = document.getElementById("filterDestinationAirportSelect").value;
  const airline = document.getElementById("filterAirlineSelect").value;
  const aircraft = document.getElementById("filterAircraftSelect").value;

  let matchedFlights = combinedUniqueRoute;

  if (sourceAirport !== "any") {
    matchedFlights = matchedFlights.filter(
      (flight) => flight.source_airport.city === sourceAirport
    );
  }

  if (destinationAirport !== "any") {
    matchedFlights = matchedFlights.filter(
      (flight) => flight.destination_airport.city === destinationAirport
    );
  }

  if (airline !== "any") {
    matchedFlights = matchedFlights.filter(
      (flight) => flight.airline.name === airline
    );
  }

  if (aircraft !== "any") {
    matchedFlights = matchedFlights.filter(
      (flight) => flight.aircraft[0] === aircraft
    );
  }

  displayFilteredFlights(matchedFlights);
}

function checkMatchedAirPortData() {
  const city = document.getElementById("filterCitySelect").value;
  const airportdata = flightDetail(city);
  displayFilteredAirportData(airportdata);
  
}

function searchAirportName() {
  const city = document.getElementById("filterSearchTermInput").value;
  const airportdata = flightDetailAirportData(city);
  displayFilteredAirportData(airportdata);
}

function reset() {
  const flightFilterDisplayDiv = document.getElementById("flightFilterDisplayDiv");
  document.getElementById("filterSourceAirportSelect").value = 'any';
  document.getElementById("filterDestinationAirportSelect").value = 'any';
  document.getElementById("filterAirlineSelect").value = 'any';
  document.getElementById("filterAircraftSelect").value = 'any';
  flightFilterDisplayDiv.innerHTML = '';
}

function isAnyFilterSetToAny(elementIds) {
  return elementIds.some(id => document.getElementById(id).value === 'any');
};

const filterElementIds = [
  "filterSourceAirportSelect",
  "filterDestinationAirportSelect",
  "filterAirlineSelect",
  "filterAircraftSelect"
];

function displayFilteredFlights(flights) {
  const flightFilterDisplayDiv = document.getElementById("flightFilterDisplayDiv");
  flightFilterDisplayDiv.innerHTML = ''; // Clear previous results
  if (flights.length === 0) { // || isAnyFilterSetToAny(filterElementIds)
    flightFilterDisplayDiv.innerHTML = "<p>No flights available for the selected options.</p>";
    return;
  }

  const tableHeaders = `
    <tr>
      <th>Source</th>
      <th>Destination</th>
      <th>Airline</th>
      <th>Airlines Name</th>
      <th>AirCraft</th>
    </tr>
  `;

  const tableRows = flights.map(flight => `
    <tr>
      <td>${flight.source_airport.city}</td>
      <td>${flight.destination_airport.city}</td>
      <td>${flight.airline.name}</td>
      <td>${flight.airline.name}</td>
      <td>${flight.aircraft}</td>
    </tr>
  `).join('');

  flightFilterDisplayDiv.innerHTML = `
    <table>
      <thead>${tableHeaders}</thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;
}

function displayFilteredAirportData(flights) {
  const filterCitySelectDiv = document.getElementById("airportFilterDisplayDiv");
  filterCitySelectDiv.innerHTML = ''; // Clear previous results

  const tableHeaders = `
    <tr>
      <th>City</th>
      <th>Name</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>iata</th>
    </tr>
  `;
  const tableRows = flights.map(flight => `
    <tr>
      <td>${flight.source_airport.city}</td>
      <td>${flight.source_airport.name}</td>
      <td>${flight.source_airport.latitude}</td>
      <td>${flight.source_airport.longitude}</td>
      <td>${flight.source_airport.iata}</td>
    </tr>
  `).join('');

  filterCitySelectDiv.innerHTML = `
    <table>
      <thead>${tableHeaders}</thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;
}

  
window.onload = function () {
  fetchData();

  document.getElementById("filterSourceAirportSelect").addEventListener("change", checkMatchedFlights);
  document.getElementById("filterDestinationAirportSelect").addEventListener("change", checkMatchedFlights);
  document.getElementById("filterAirlineSelect").addEventListener("change", checkMatchedFlights);
  document.getElementById("filterAircraftSelect").addEventListener("change", checkMatchedFlights);
  document.getElementById("filterCitySelect").addEventListener("change", checkMatchedAirPortData);
  document.getElementById("filterSearchTermInput").addEventListener("input", searchAirportName);
};