import * as locationsService from '../services/locations-service';
import { response } from 'express';

// define render error function
const renderErrorResponse = (response) => {
    const callback = (error) => {
        if(error) {
            response.status(500);
            response.json({
                message: error.message
            });
            console.log(error);
        }
    };
    return callback;
}

// define listData controllers
export const list = (request, response) => {
    const query = request.query;
    const promise = locationsService.search(query);

    promise.then((locations) => {
        response.status(200);
        response.json(locations);
    })
    .catch(renderErrorResponse(request));
}

// define save item controller
export const save = (request, response) => {
    let body = request.body;
    body["appSessionID"]= request.params.id;
    const newLocations = Object.assign({},body);
    const resolve = (locations) => {
        response.status(200);
        response.json(locations);
    };
    locationsService.save(newLocations)
        .then(resolve)
        .catch(renderErrorResponse(response));
};


// define get item controller
export const get = (request, response) => {
    const newLocationsID = request.params.id;
    const query = request.query;
    const resolve = (newLocations) => {
        response.status(200);
        response.json(newLocations);
    };
    locationsService.find(newLocationsID,query)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define update items controller
export const update = (request, response) => {
    const locationsID = request.params.id;
    const updatePart = Object.assign({}, request.body);
    const resolve = (locationsID) => {
        response.status(200);
        response.json(locationsID);
    }
    locationsService.update(locationsID,updatePart)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define remove item controller
export const remove = (request, response) => {
    const appSessionID = request.params.id;
    const resolve = (locationsID) => {
        response.status(200);
        response.json({
            message: "Deleted!!"
        });
    }
    locationsService.remove(appSessionID)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

//get locations in last n minutes
export const getWithParams = (request, response) => {
    const promise = locationsService.getParams(request.params);
    promise.then((locations) => {
        response.status(200);
        response.json(locations);
    })
    .catch(renderErrorResponse());
}

