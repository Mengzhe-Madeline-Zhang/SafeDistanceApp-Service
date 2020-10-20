import Locations from '../models/location';
import { response } from 'express';

// search by given time interval service implementation
export const search = (params) => {

    const promise = Locations.find({
        lastModifiedDate: {
            $gte: params.greaterThan,
            $lt: params.lessThan
        }
    }).exec();
    return promise;
};