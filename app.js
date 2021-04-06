const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const stateRouter = require('./routes/stateRoutes');
const vehicleRegistrationRouter = require('./routes/vehicleRegistrationRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.send('Home');
})

app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/state', stateRouter);
app.use('/vehicleRegistration', vehicleRegistrationRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});