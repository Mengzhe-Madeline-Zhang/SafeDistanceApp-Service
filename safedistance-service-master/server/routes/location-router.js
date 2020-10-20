import express from 'express';
import * as locationsController from '../controllers/locations-controller';
// import locationRouter from "./location-router";

const router = express.Router();

// conditional list
// define routes in /appSessions
router.route('/locations')
    .get(locationsController.list)

// define routes in /appSessions 
router.route('/appSessions/:id/locations')
    .post(locationsController.save)
    .get(locationsController.get)

//routes to get locations in specific time interval 
router.route('/locations/:lastModified')
    .get(locationsController.getWithParams);

export default router;