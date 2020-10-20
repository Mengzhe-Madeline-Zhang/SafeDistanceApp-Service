  
import express from 'express';
import * as reportsController from '../controllers/reports-controller';

// import locationRouter from "./location-router";

const router = express.Router();

// define routes in /appSessions
// /reports?requery
router.route('/reports')
    .get(reportsController.list)
    .post(reportsController.save);

    // define routes in /appSessions 
router.route('/appSessions/:id/reports')
    .get(reportsController.get)
    .put(reportsController.update)

export default router;