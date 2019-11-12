require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// TODO
// app.use(cors({
//   origin: 'https://www.time4time.org',
//   credentials: true
// }))
if(process.env.ENV == "development") {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
}


mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true }, function(err) {
   if(err) console.log("ERROR")
   else console.log("connected")
})
 

app.use(session({
    secret:             'njwkifenicmoswiid',
    resave:             true,
    saveUninitialized:  false,
    cookie:             {
            maxAge: 1000 * 60 *60 *24 *7
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    })
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// TODO
app.use(express.static(path.join(__dirname)));


// TODO
// app.use(express.static(path.join(__dirname, 'public/build')));;


//Public routes
app.use('/api', require('./routes/main/displayOffers'));
app.use('/api', require('./routes/main/search'));
app.use('/api', require('./routes/authentication/signup'));
app.use('/api', require('./routes/authentication/login'));
app.use('/api', require('./routes/authentication/logout'));

//Protected/private routes
// TODO
app.use((req, res, next) => {
  if(!req.session.user) res.status(403).json({message: "Unauthorized"})
  else next()
})

app.use('/api', require('./routes/author-profile/authorProfile'));
app.use('/api', require('./routes/main/applyOffer'))
app.use('/api', require('./routes/main/sendNotification'))
app.use('/api', require('./routes/dashboard/myProfile'));
app.use('/api', require('./routes/dashboard/myOffers'));
app.use('/api', require('./routes/dashboard/directMessages'));
app.use('/api', require('./routes/dashboard/myPetitions'));
app.use('/api', require('./routes/dashboard/userSettings'));
app.use('/api', require('./routes/publish-offer/publishOffer'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // TODO
  // proper error handling - res.json?
  // res.render('error');
});


module.exports = app;
