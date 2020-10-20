import mongoose from 'mongoose';

const AppSettingSchema = new mongoose.Schema({
    radiu:{
        type:String,
        default:0.1
    },
    numberOfPeople:{
        type:String,
        default:100
    }
},{
    versionKey: false
});

export default mongoose.model('AppSettings', AppSettingSchema);