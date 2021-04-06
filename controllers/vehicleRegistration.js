const db = require('../utils/connection');
const errorResponse = require('../utils/error');
const {successResponse} = require('../utils/success');

exports.registerVehicle = (req, res, next) => {
  const registrationInfo = req.body;
  const sql = `INSERT INTO vehicle_registration (userId, vehicleId, registrationDate, expiryDate) VALUES ('${registrationInfo.userId}','${registrationInfo.vehicleId}', '${registrationInfo.registrationDate}', '${registrationInfo.expiryDate}')`;
  
  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `InsertId: ${result.insertId}`));
    }
  });
};

exports.updateVehicleRegistration = (req, res, next) => {
  const id = parseInt(req.params.id);
  const registrationInfo = req.body;
  const sql = `UPDATE vehicle_registration SET userId = '${registrationInfo.userId}', vehicleId = '${registrationInfo.vehicleId}', registrationDate = '${registrationInfo.registrationDate}', expiryDate = '${registrationInfo.expiryDate}' WHERE id = ${id}`;
  
  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `UpdatedId: ${id}`));
    }
  });
};

exports.deleteVehicleRegistration = (req, res, next) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM vehicle_registration WHERE id = ${id}`;
  
  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `Deleted data for id = ${id}`));
    }
  });
};