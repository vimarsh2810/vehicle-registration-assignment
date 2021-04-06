const db = require('../utils/connection');
const errorResponse = require('../utils/error');
const successResponse = require('../utils/success');

exports.createVehicle = (req, res, next) => {
  const vehicle = req.body;
  const sql = `INSERT INTO vehicles (name, type) VALUES ('${vehicle.name}','${vehicle.type}')`;

  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `InsertId: ${result.insertId}`));
    }
  });
};

exports.updateVehicle = (req, res, next) => {
  const id = parseInt(req.params.id);
  const vehicle = req.body;
  const sql = `UPDATE vehicles SET name = '${vehicle.name}', type = '${vehicle.type}' WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `UpdatedId: ${id}`));
    }
  });
};

exports.deleteVehicle = (req, res, next) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM vehicles WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if(err) {
      return res.status(200).json(errorResponse(500, 0, err.message));
    }
    else {
      return res.status(200).json(successResponse(200, 1, `Deleted data for id = ${id}`));
    }
  });
};