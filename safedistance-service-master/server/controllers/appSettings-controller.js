import * as appSettingsService from '../services/appSettings-service';

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

export const searchSettings = (request, response) => {

    const query = request.query;
    const promise = appSettingsService.find(query);
    // const newAppSettingsID = request.params.id;
    // const resolve = (newAppSettingsID) => {
    //     response.status(200);
    //     response.json(newAppSettingsID);
    // };
    promise.then((data) => {
        response.status(200);
        response.json(data);
    })
    .catch(renderErrorResponse(request));
        
    }

export const saveSettings = (request, response) => {
    let body = request.body;
    // body["appSessionID"]= request.sessionID;
    const newAppSettings = Object.assign({},body);
    const resolve = (AppSettings) => {
        response.status(200);
        response.json(AppSettings);
    };
    appSettingsService.save(newAppSettings)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

export const changeSettings = (request, response) => {
    const appSettingsID = request.params.id;
    const updatePart = Object.assign({}, request.body);

    const resolve = (SettingsID) => {
        response.status(200);
        response.json(SettingsID);
    }

    appSettingsService.update(appSettingsID,updatePart)
        .then(resolve)
        .catch(renderErrorResponse(response));
};