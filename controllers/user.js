const db = require('../utils/connection');
const errorResponse = require('../utils/error');
const { successResponse, getSuccessResponse } = require('../utils/success');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.getLogin = (req, res, next) => {
  res.render('login');
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM user WHERE email = '${email}'`;

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    if(rows.length < 1) {
      return res.status(401).json(errorResponse(401, 0, `Auth failed`));
    }
    bcrypt.compare(password, rows[0].password)
      .then(doMatch => {
        const token = jwt.sign(
          {
            email: rows[0].email,
            userId: rows[0].id
          }, 
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          }
        );
        res.cookie('jwt', token, {maxAge: 1*60*60*1000, httpOnly: true});
        return res.redirect('/user/dashboard');
      })
      .catch(err => {
        return res.status(401).json(errorResponse(401, 0, `Auth failed`));
      });
  });
};

exports.dashboard = (req, res, next) => {
  const userData = req.userData;
  const sql = `SELECT 
  vehicles.id as vehicleId, 
  vehicles.name as vehicleName, 
  vehicles.type 
  FROM vehicles 
  JOIN vehicle_registration 
    ON vehicle_registration.vehicleId = vehicles.id 
  WHERE vehicle_registration.userId = ${userData.userId}`;

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    else {
      res.render('dashboard', {
        user: req.userData,
        vehicles: rows
      });
    }
  })
  
};

exports.logout = (req, res, next) => {
  // reseting value of 'jwt' cookie with null string and setting 1ms expiry time
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/user/login');
};

exports.createUser = (req, res, next) => {
  const user = req.body;
  bcrypt.hash(user.password, 12)
    .then(hashedPassword => {
      const sql = `INSERT INTO user (name, email, password, stateId, status) 
      VALUES ('${user.name}','${user.email}','${hashedPassword}', '${user.stateId}', 1)`;

      db.query(sql, (err, result) => {
        if(err) {
          return res.status(500).json(errorResponse(500, 0, err.message));
        }
        return res.status(200).json(successResponse(200, 1, `InsertId: ${result.insertId}`));
      });
    })
    .catch(err => {
      return res.status(500).json(errorResponse(500, 0, err.message));
    });
};

exports.updateUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = req.body;

  bcrypt.hash(user.password, 12)
    .then(hashedPassword => {
      const sql = `UPDATE user 
      SET name = '${user.name}', 
      email = '${user.email}', 
      password = '${hashedPassword}', 
      stateId = '${user.stateId}', 
      status = ${user.status} 
      WHERE id = ${id}`;
      
      db.query(sql, (err, result) => {
        if(err) {
          return res.status(500).json(errorResponse(500, 0, err.message));
        }
        return res.status(200).json(successResponse(200, 1, `UpdatedId: ${id}`));
      });
    })
    .catch(err => {
      return res.status(500).json(errorResponse(500, 0, err.message));
    });
  
};

exports.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM user WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if(err) {
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    return res.status(200).json(successResponse(200, 1, `Deleted data for id = ${id}`));
  });
};

exports.registrationData = (req, res, next) => {
  const id = req.params.id;
  const sql =  `SELECT 
  vehicles.id as vehicleId, 
  vehicles.name as vehicleName, 
  vehicle_registration.registrationDate, 
  vehicle_registration.expiryDate 
  FROM vehicle_registration 
  JOIN vehicles 
    ON vehicle_registration.vehicleId = vehicles.id 
  WHERE vehicle_registration.userId = ${id}`;

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    if(rows.length < 1) {
      return res.status(404).json(errorResponse(404, 0, `No data found for userId = ${id}`));
    }
    return res.status(200).json(getSuccessResponse(200, 1, `User vehicle registration data for UserId = ${id}`, rows));
  });
};

exports.userData = (req, res, next) => {
  const sql = `SELECT
	user.id as userId,
  user.name as userName,
  states.id as stateId,
  states.stateName, 
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
    ON user.stateId = states.id`;
  
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, 0, err.message));
    }
    if(rows.length < 1) {
      return res.status(404).json(errorResponse(404, 0, `No data found`));
    }
    return res.status(200).json(getSuccessResponse(200, 1, `List of user-data with registered vehicles and state`, rows));
  });
};