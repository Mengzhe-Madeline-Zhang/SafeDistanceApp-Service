import express from 'express';
import * as adminsController from '../controllers/admins-controller';

const router = express.Router();

// define routes in /admins
router.route('/admins')
    .get(adminsController.list)
    .post(adminsController.save);

// define routes in /admins 
router.route('/admins/:id')
    .get(adminsController.get)
    .put(adminsController.update)

//routes to login
router.route('/login')
    .post(adminsController.login);

export default router;