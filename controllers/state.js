const db = require('../utils/connection');
const errorResponse = require('../utils/error');
const { successResponse, getSuccessResponse } = require('../utils/success');

exports.registrationData = (req, res, next) => {
  const stateName = req.params.stateName;
  const sql =  `SELECT
	user.id as userId,
    user.name as userName, 
    vehicles.id as vehicleId, 
    vehicles.name as vehicleName, 
    vehicle_registration.registrationDate,
    vehicle_registration.expiryDate
  FROM user 
  JOIN vehicle_registration
    ON vehicle_registration.userId = user.id
  JOIN vehicles
    ON vehicle_registration.vehicleId = vehicles.id
  JOIN states
    ON states.id = user.stateId
  WHERE states.stateName = '${stateName}'`;
  
  db.query(sql, (err, rows, fields) => {
    if(err) {
      console.log(err.message);
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    if(rows.length < 1) {
      return res.status(404).json(errorResponse(404, 0, `No data found for stateName = '${stateName}'`));
    }
    return res.status(200).json(getSuccessResponse(200, 1, `State vehicle registration data for '${stateName}'`, rows));
  });
};