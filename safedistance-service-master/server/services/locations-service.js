import Location from '../models/location';

// save service implementation
export const save = (location) => {
    const newLocation = new Location(location);
    const promise = newLocation.save();
    return promise;
}

// search service implementation
export const search = (query) => {
    const promise = Location.find(query).exec();
    return promise;
};

// update service implementation
export const update = (id, newValue) => {
    // TODO config attributes need to updated by default
    const promise = Location.findOneAndUpdate(
        {_id: id},
        newValue,
        {new : true}
    ).exec();
    return promise;
}

// removeByID service implementation
export const remove = (id) => {
    const promise = Location.findOneAndDelete(
        {appSessionID: id}
    );
    return promise;
};

// findByID service implementation
export const find = (id) => {
    const promise = Location.find({
        appSessionID: id
    }).exec();
    return promise;
};


//get locations of users in last n minutes
export const getParams = (params) => {
    const promise = Location
     .aggregate([
        //it will compare the lastModifiedDate and requestedTime
        {$match:{
           "lastModifiedDate": { $gt: new Date(Date.now()-1000*60*params.lastModified)}
         }},
         //It will group according to appsessionId and get the latest latitude and longitude value.
        {$group:
            {
                _id: "$appSessionID",
                latitude:{$last : "$latitude"},
                longitude:{$last :"$longitude"}
            }
        }])
   .exec();
    return promise;
};




    