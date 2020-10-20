import * as adminsService from '../services/admins-service';
import { response } from 'express';

const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = 'secret'

var crypto = require('crypto');
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}


// define render error function
const renderErrorResponse = (response) => {
    const callback = (error) => {
        if(error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    };
    return callback;
}

// define listData controllers
export const list = (request, response) => {
    const promise = adminsService.search({});
    promise.then((admins) => {
        response.status(200);
        response.json(admins);
    })
    .catch(renderErrorResponse(request));
}

// define save item controller
export const save = (req, res) => {
    {
        const today = new Date()
        const adminData = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          salt:"",
          created: today
        }
        const promise = adminsService.findOne(adminData);
        promise.then(admin => {
            if (!admin) {
                adminData.salt = genRandomString(16); /** Gives us salt of length 16 */
                var passwordData = sha512(adminData.password, adminData.salt);
                adminData.password = passwordData.passwordHash;
                adminsService.save(adminData)
                .then(admin => {
                    res.json({ message: admin.email + ' Registered!' })
                    res.status(201);
                  })
                  .catch(err => {
                    res.send('error: ' + err)
                  })
            } else {
              res.status(400);
              res.json({
                  message: 'Admin already exists'
              });
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      }
};


// define get item controller
export const get = (request, response) => {
    const newAdminsID = request.params.id;
    const resolve = (newAdminsID) => {
        response.status(200);
        response.json(newAdminsID);
    };
    adminsService.find(newAdminsID)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define update items controller
export const update = (request, response) => {
    const adminsID = request.params.id;
    const updatePart = Object.assign({}, request.body);

    const resolve = (adminsID) => {
        response.status(200);
        response.json(adminsID);
    }

    adminsService.update(adminsID,updatePart)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define login controller
export const login = (req, res) => {
    const adminData = {
        email: req.body.email,
        password: req.body.password,
      }
      const promise = adminsService.findOne(adminData);
      promise.then(admin => {
          if (admin) {
            var passwordData = sha512(req.body.password, admin.salt);
            if (passwordData.passwordHash===admin.password) {
              // Passwords match
              if(admin.activateStatus){
                const payload = {
                  _id: admin._id,
                  first_name: admin.first_name,
                  last_name: admin.last_name,
                  email: admin.email
                }

                let token = jwt.sign(payload, process.env.SECRET_KEY, {

                  expiresIn: 1440
                })
                res.send(token)
                res.status(200);
                res.json({message: 'login successfully!!'})
              }
              else{
                res.status(401);
                res.json({ error: 'email is not activated' })
              }
            } else {
              // Passwords don't match
              res.status(401);
              res.json({ error: '1email or password do not match' })
            }
          } else {
              //if admin dose not exist
            res.status(401);
              res.json({ error: '2email or password do not match' })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
};
