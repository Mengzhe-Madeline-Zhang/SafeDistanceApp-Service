import express from 'express';
import * as appSettingsController from '../controllers/appSettings-controller';

const router = express.Router();
//Implement AppSettings API `/appSettings`.*

// define routes for appSettings 
router.route('/appSettings')
    .post(appSettingsController.saveSettings)
    .get(appSettingsController.searchSettings)

// define routes for appSettings with ID
router.route('/appSettings/:id')
    .put(appSettingsController.changeSettings)

export default router;