const db = require('../utils/connection');

const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

const json2csvParser = new Json2csvParser({ header: true});

const sql = `SELECT 
  user.name,
  user.email,
  vehicles.id as vehicleId,
  vehicles.name as vehicleName,
  vehicle_registration.registrationDate,
  vehicle_registration.expiryDate
FROM user
JOIN vehicle_registration
  ON vehicle_registration.userId = user.id
JOIN vehicles
  ON vehicle_registration.vehicleId = vehicles.id`;

db.query(sql, (err, rows, fields) => {
  if(err) {
    console.log(err.message);
  }
  else {
    const data = JSON.parse(JSON.stringify(rows));
    const csv = json2csvParser.parse(data);

    fs.writeFile("CSV/registration_info.csv", csv, (error) => {
      if (error) {
        console.log(error.message);
      }
      else {
        console.log("CSV Generation successful!");
      }
    });
  }
});

db.end();