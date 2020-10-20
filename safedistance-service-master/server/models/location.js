import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: "latitude is required!"
    },
    longitude: {
        type: Number,
        required: "longitude is required!"
    },
    createdDate:{
        type: Date,
        default:Date.now()
    },
    lastModifiedDate:{
        type: Date,
        default:Date.now()
    },
    createdBy:{
        type: String
    },
    lastModifiedBy:{
        type: String
    },
    appSessionID:{
        type: String,
        required: "appSessionID is required!"
    }
},{
    versionKey: false
});

export default mongoose.model('Location', LocationSchema);