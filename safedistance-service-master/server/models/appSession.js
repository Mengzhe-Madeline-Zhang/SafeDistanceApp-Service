import mongoose from 'mongoose';

import  { Schema } from 'mongoose';

const AppSessionSchema = new mongoose.Schema({
    createdDate:{
        type: Date,
        default:Date.now()
    },
    lastModifiedDate:{
        type: Date,
        default:Date.now()
    },
    dangerMark: {
        type: Boolean,
        default: false
    },
    crowdedMark: {
        type: Boolean,
        default: false
    },
    subscription: {
        type: Object
    }

},{
    versionKey: false
});

export default mongoose.model('AppSession', AppSessionSchema);