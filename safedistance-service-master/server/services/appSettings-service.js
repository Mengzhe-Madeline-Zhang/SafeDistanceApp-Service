import AppSettings from '../models/appSettings';

export const find = (query) => {
    const promise = AppSettings.find().exec();
    return promise;
};

export const save = (appSettings) => {
    const newAppSettings = new AppSettings(appSettings);
    const promise = newAppSettings.save();
    return promise;
}

export const update = (id, newValue) => {
    // TODO config attributes need to updated by default
    // update({查询器},{修改器},true)
    const promise = AppSettings.findOneAndUpdate(
        {_id: id},
        newValue,
        {new : true}
    ).exec();
    return promise;
}
