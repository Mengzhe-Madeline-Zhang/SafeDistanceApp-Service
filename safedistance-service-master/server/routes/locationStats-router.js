import express from 'express';
import * as locationStatsController from '../controllers/locationStats-controller';

const router = express.Router();

// define routes in /locationStats
router.route('/locationStats/:interval')
    .get(locationStatsController.list)


export default router;