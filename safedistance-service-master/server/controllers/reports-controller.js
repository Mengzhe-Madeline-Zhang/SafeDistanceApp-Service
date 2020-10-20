import * as reportsService from '../services/reports-service';
import { response, request } from 'express';


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
    const query = request.query;
    const promise = reportsService.search(query);
    promise.then((reports) => {
        response.status(200);
        response.json(reports);
    })
    .catch(renderErrorResponse(request));
    
}

// define save item controller
export const save = (request, response) => {
    let body = request.body;
    // body["appSessionID"]= request.params.id;
    const newReports = Object.assign({},body);
    const resolve = (reports) => {
        response.status(200);
        response.json(reports);
    };
    reportsService.save(newReports)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define get item controller
export const get = (request, response) => {
    const newReportsID = request.params.id;

    const resolve = (newReports) => {
        response.status(200);
        response.json(newReports);
    };
    reportsService.find(newReportsID)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define update items controller
export const update = (request, response) => {
    const reportsID = request.params.id;
    const updatePart = Object.assign({}, request.body);

    const resolve = (reportsID) => {
        response.status(200);
        response.json(reportsID);
    }

    reportsService.update(reportsID,updatePart)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// define remove item controller
export const remove = (request, response) => {
    const appSessionID = request.params.id;
    const resolve = () => {
        response.status(200);
        response.json({
            message: "Deleted!!"
        });
    reportsService.remove(appSessionID)
        .then(resolve())
        .catch(renderErrorResponse(response));

}

reportsService.remove(reportsID)
.then(resolve)
.catch(renderErrorResponse(response));
};