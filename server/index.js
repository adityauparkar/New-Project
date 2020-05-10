const express = require('express');
// import path from 'path'
const path = require('path')
var bodyParser = require('body-parser')


const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

app.use(bodyParser.json())

// app.use(express.static('../public'));
app.use(express.static('../dist'));

const HTML_FILE = path.join(__dirname, '../dist/index.html')

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
// app.set('view engine', 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./apis'));
// // Routes
// app.use('/', require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
