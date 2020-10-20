import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import https from 'https';
import fs from 'fs';
import { log } from 'console';
var app = express();


/** for run Https on localhost */ 
// const port = 443; 
// const httpsOptions = {
//     key: fs.readFileSync('./cert.key'),
//     cert: fs.readFileSync('./cert.pem')
// }
// const server = https.createServer(httpsOptions, app).listen(port, () => {
// console.log('server running at ' + port)
// })

// // connect to Mongo Atlas, username:admin, password:admin 
// // database name:safedistance-app
// // network access: Allow access from anywhere
//Using connect-mongo to store session
const MongoStore = connectStore(session);
const SESS_NAME = "safedistance";
const SESS_SECRET = "session-secret";

//Storing session data in appSession
var store = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'requestSession',
    ttl: 365*24*60*60 // session expires in 365 days
},
function(error){
    console.log(error);
});
store.on("error", function(error){
    console.log("error");
})

// connect to Mongo Atlas, username:admin, password:admin 
// database name:safedistance-app
// network access: Allow access from anywhere
const MONGODB_URI = 'mongodb+srv://admin:admin@safedistance-app.tla1n.mongodb.net/safedistance-app?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useFindAndModify: false 
});

//if mongoose connect to mongoDB Atlas successfully, it will console "Mongoose is connected!!!!"
mongoose.connection.on('connected',()=>{
  console.log('Mongoose is connected!!!!');
});


// set up cross origin resource sharing
// const whitelist = ['https://localhost:3001',"*"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    // if(whitelist.includes(origin))
      return callback(null, true)
      // callback(new Error('Not allowed by CORS'));
  }
}

// the cross origin sharing setting
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Mongo db connection settings
app.use(session({
    store: store,
    name: SESS_NAME,
    secret: SESS_SECRET
}));

// send cookie to the frontend
app.use(function(req, res, next){
  var cookieName = "SessionID";
  res.cookie(cookieName,req.sessionID, {secure: false, maxAge: 900000, httpOnly: false});
  next();
});

app.use(express.static(path .join(__dirname, '../public')));

routes(app);

export default app;