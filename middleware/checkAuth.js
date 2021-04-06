const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkAuth = (req, res, next) => {
  try{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch(error) {
    res.redirect('/user/login');
  }
};