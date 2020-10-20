import Report from '../models/report';
import AppSettings from '../models/appSettings';
import Location from '../models/location';
import AppSession from '../models/appSession';
import webpush from 'web-push';
import { log } from 'debug';


// save service implementation
export const save = (report) => {
    const newReport = new Report(report);
    const promise = newReport.save();
    return promise;
}

// search service implementation
export const search = (query) => {
    const promise = Report.find(query).exec();
    return promise;
};

//calculate diatance and alert

const GetDistance=(lat1, lng1, lat2, lng2)=>{
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}

const getParams = () => {
    const promise = Location.find(
        {
            "$and":[

                {"lastModifiedDate":{"$gt":new Date(Date.now()-1000*60*60*100)}},
                {"lastModifiedDate":{"$lt":new Date(Date.now())}}
            ]
        },
        {
            // latitude: 1,
            // longitude: 1,
            // _id: "$appSessionID",
        }
        ).exec();
    return promise;
};

const findMyLocation = (id) => {
    const promise = Location.find({
        appSessionID: id
    }).exec();
    // console.log("testfindMyLocation"+promise);
    return promise;
};

const findRadiuAndNum = (id) => {
    const promise = AppSettings.find().exec();
    // console.log("testfindRandN"+promise);
    return promise;
};

const findCovid19=(id)=>{
    const promise = Report.find({
        appSessionID: id
    }).exec();
    // console.log("testfind19"+promise);
    return promise;
}

const updatePeopleNearby = (id, newValue) => {

    const updateAppReport = Object.assign({
        "lastModifiedDate" : Date.now(),
        "dangerMark":true
    },newValue);

    const promise = AppSession.findOneAndUpdate(
        {_id: id},
        updateAppReport,
        {new : true}
    ).exec();

    promise.then(pushNotification(id, 'You are marked Danger!! Positive nearby!'));
    return promise;
}
const updateMyself = (id, newValue) => {

    const updateAppReport = Object.assign({
        "lastModifiedDate" : Date.now(),
        "crowdedMark":true
    },newValue);

    const promise = AppSession.findOneAndUpdate(
        {_id: id},
        updateAppReport,
        {new : true}
    ).exec();

    promise.then(() => {
        console.log('push' + id);
        pushNotification(id, 'You are marked Crowed!! Too many people nearby!');

    });

    return promise;
}

export const update = (id, newValue) => {
    // TODO config attributes need to updated by default
    const whoIsDangers=new Set();
    const covid19=[];
    const RadiuAndNum=[];
    const numSet=[];
    const myLocation = [];
    const userLocation = [];

    const updateAppReport = Object.assign({"lastModifiedDate" : Date.now()},newValue);

    const promise = Report.findOneAndUpdate(
        {appSessionID: id},
        updateAppReport,
        {new : true}
    ).exec();

    promise.then(
        findCovid19(id).then((data) => {
            // myLocation.push(locations);
            [].push.apply(covid19,data)

            // console.log("XXXX:"+covid19[0]);
        }).then(findMyLocation(id).then((data)=>{
            [].push.apply(myLocation,data);

        })).then(findRadiuAndNum(id).then((RandN)=>{
            [].push.apply(RadiuAndNum,RandN)
            numSet.push(RadiuAndNum[0].numberOfPeople);
            // console.log("YYYY:"+numSet);

        })).then(getParams().then((locations) => {
            // userLocation.push(locations);
            [].push.apply(userLocation,locations)

            for(let key in userLocation){
                let dis = GetDistance(
                    userLocation[key].latitude, userLocation[key].longitude, myLocation[0].latitude, myLocation[0].longitude
                    );
                // if(dis<=RadiuAndNum[0].radiu){
                if(dis<=RadiuAndNum[0].radiu){
                    whoIsDangers.add(userLocation[key].appSessionID);

                }
            }
	console.log("the number of people in danger : "+ whoIsDangers.size);
		if(newValue.covid19=="true"){
                // console.log("YYZZ:"+number);
                for(let key of whoIsDangers){
                    console.log("whoisdangers:"+key);
                   updatePeopleNearby(key, newValue);
                }
            }
    		console.log("the number of people arount : " + numSet + "  ? " + whoIsDangers.size);
            if(whoIsDangers.size>=numSet){
                console.log("numSet:"+numSet+" "+whoIsDangers.size);
                updateMyself(id,newValue)
            }
        })).catch()
    )
    return promise;
}

// removeByID service implementation
export const remove = (id) => {
    const promise = Report.findOndAndDelete(
        {appSessionID: id}
    );
    return promise;
};

// findByID service implementation
export const find = (id) => {
    const promise = Report.find({
        appSessionID: id
    }).exec();
    return promise;
};

// the vipid keys used for PUSH API 
// !!! the private key should not be stored here
const vipidKeys = {
    publicKey: 'BAWCoVc_ahZVzo9vD6B9vDDLwtfw0bgAmXmVZz-5OxgcpJF6g_KcTUBCvvg1ydpHBqqWTDH8aKq0mfN7yHoERyA',
    privateKey:'mh4mMv_rVOw5Havf3WPQdH4tpneV5029nK2X3XaY_6I'
  }

webpush.setVapidDetails(
    'mailto:gao.mengc@northeastern.edu',
    vipidKeys.publicKey,
    vipidKeys.privateKey
)

const sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, dataToSend)
}

function pushNotification (appSessionID, msg) {
    AppSession.find(
        {
            _id: appSessionID
        },
        {
            subscription:1
        }
    ).exec()
        .then(subscription => {
            console.log(subscription[0].subscription);
            sendNotification(subscription[0].subscription,msg);
        });
}