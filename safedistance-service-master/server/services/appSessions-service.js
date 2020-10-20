import AppSession from '../models/appSession';

export const save = (appSession) => {
    const newAppSession = new AppSession(appSession);
    const promise = newAppSession.save();
    return promise;
}

export const find = (appSessionID) => {
    const promise = AppSession.find(appSessionID).exec();
    return promise;
}

export const getAllAppSessions = () => {
    const promise = AppSession.find().exec();
    return promise;
}

export const conditionalFind = (query) => {
    console.log(query);
    const promise = AppSession.find(query).exec();
    return promise;
}

export const conditionalUpdate = (id, query) => {
    const updateAppSession  = Object.assign({"lastModifiedDate" : Date.now()},query);
    console.log(updateAppSession);
    const promise = AppSession.findByIdAndUpdate(
        {_id: id},
        updateAppSession
    );
    return promise;
}