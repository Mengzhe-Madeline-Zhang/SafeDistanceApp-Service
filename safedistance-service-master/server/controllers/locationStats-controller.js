import * as locationStatsService from '../services/locationStats-service';
import { response } from 'express';

// define render error function
const renderErrorResponse = (response) => {
    const callback = (error) => {
        if (error) {
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
    const interval = request.params.interval; //interval given in admin dashboard
    let locationsStats = [];

    let endTime = new Date();
    let startTime = new Date(endTime.getTime() - (1000 * 60 * 60 * parseInt(interval)));
    // Creating timeDuration for each interval
    let intervalDuration = {
        "1": 5,
        "2": 10,
        "3": 15,
        "4": 20,
        "5": 25,
        "6": 30,
    };

    /**
     * creating a list to store all Active sessions. 
    *  Length of this gives the count of users in particular time interval
    */
    let appSessionIDList;

    const resolve = (locations) => {
        const timeInterval = intervalDuration[interval];
        //Iterating and getting appsessions in (12*interval) slots
        for (let i = 1; i <= (12); i++) {
            let newEndTime = new Date(startTime.getTime() + (1000 * 60 * timeInterval));
            appSessionIDList = new Set();

            for (let j = 0; j < locations.length; j++) {
                if (locations[j].appSessionID !== undefined) {
                    if (locations[j].lastModifiedDate <= newEndTime &&
                        locations[j].lastModifiedDate >= startTime) {
                        appSessionIDList.add(locations[j].appSessionID);
                    }
                }

            }
            //Saving startTime, endTime and count of users in a list
            locationsStats.push({
                startTime: startTime,
                endTime: newEndTime,
                numberOfUsers: appSessionIDList.size
            });
            //changing location startTime for every iteration
            startTime = newEndTime;

        }
        response.status(200);
        response.json(locationsStats);
    };

    locationStatsService.search({
        greaterThan: startTime,
        lessThan: endTime
    })
        .then(resolve)
        .catch(renderErrorResponse(response));
}