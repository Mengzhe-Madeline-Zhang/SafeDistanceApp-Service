import Admin from '../models/admin';

// save service implementation
export const save = (admin) => {
    const newAdmin = new Admin(admin);
    const promise = newAdmin.save();
    return promise;
}

// search service implementation
export const search = (params) => {
    const promise = Admin.find(params).exec();
    return promise;
};

// update service implementation
export const update = (id, newValue) => {
    // TODO config attributes need to updated by default
    const promise = Admin.findOneAndUpdate(
        {_id: id},
        newValue,
        {new : true}
    ).exec();
    return promise;
}

// findByID service implementation
export const find = (id) => {
    const promise = Admin.find(
        {_id:id}
    ).exec();
    return promise;
};

export const findOne = (admin) => {
    const promise = Admin.findOne({
        email: admin.email
    }).exec();
    return promise;
};

