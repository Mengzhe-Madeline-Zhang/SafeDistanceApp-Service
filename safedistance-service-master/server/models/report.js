import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    covid19: {
        type: String,
        required: "covid-19 status is required!"
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

export default mongoose.model('Report', ReportSchema);