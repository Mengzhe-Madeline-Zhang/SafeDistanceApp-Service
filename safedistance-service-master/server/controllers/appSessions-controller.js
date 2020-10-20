import * as appSessionService from '../services/appSessions-service';
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

// get appSession details by AppSessionID
export const getByID = (request, response) => {
    const appSessionID = request.param.id;
    const resolve = (appSession) => {
        response.status(200);
        response.json(appSession);
    }
    appSessionService.find(appSessionID)
        .then(resolve)
        .catch(renderErrorResponse(response));
}

export const save = (request, response) => {
    let body = request.body;
    // clone an object
    const newAppSession = Object.assign({},body);
    const resolve = (appSessionID) => {
        response.status(200);
        response.json(appSessionID);
    }
    appSessionService.save(newAppSession)
        .then(resolve)
        .catch(renderErrorResponse(response));
}

export const conditionalGet = (request, response) => {
    const promise = appSessionService.conditionalFind(request.query);
    promise.then((appSession) => {
        response.status(200);
        response.json(appSession);
    })
    .catch(renderErrorResponse(response));  
}

export const conditionalUpdateByID = (request, response) => {
    const id = request.params.id;
    const promise = appSessionService.conditionalUpdate(id, request.body);
    promise.then((appSession) => {
        response.status(200);
        response.json(appSession);
    })
    .catch(renderErrorResponse(response)); 
}