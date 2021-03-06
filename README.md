# SafeDistanceApp-Service

# Safedistance-App
Reactjs App for social distancing app.

### Description

#### This app helps in finding number of people around us and helps in notifying about danger zones( more covid positive cases).

### Features

##### App Users: 

1. App finds the user location and saves the information 
2. If user is tested positive, they can report it as an anonymous user.
3. User can register as admin and can be approved only by existing admins.
4. User gets an alert when a COVID positive user reports the result.

##### Admin: 

1. Admin can login and check for statistics, heatmap and app settings.
2. Statistics: Admin can check number of active users in last one hour to six hours.
3. Appsettings: Admin can change settings in alert like radius and number of people.

##### PWA Support:    

1. web app can be installed.
2. service worker support PUSH Notification feature
3. service worker support cache function to guarentee the offline works
4. service worker support cookie management

### Technologies

1. Nodejs
2. Express
3. Mongoose
4. MongoDB
5. React
6. PWA

### Steps to run the Project

1. Using git clone, copy the code to your directory.
```bash
git clone https://github.com/neu-mis-info6150-summer-2020/safedistance-app.git
```

2. Open folder and run following command to run the app
```bash
npm run start
```

3. Access the app at https://localhost:3000


### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


# safedistance-service
REST API for Social Distancing App


## 1. Rest API 

<details>
<summary>Rest API:</summary>

### AppSessions
#### GET /appSessios
Support search with query, reture appSession
#### POST /appSessions
Create an appSession for an anonymous user
#### PUT /appSessions/:id
Update an appSession status by appSession ID

### Locations
#### GET /locations
Support search with query, return locations
#### POST /appSession/:id/locations
Store a new location for an appSession finded by id
#### GET /appSessions/:id/locations
Find all locations of an appSession finded by id
#### GET /locations/:lastModified
Find locations of a time range

### LocationStats
#### GET /locationStats/:interval
Get locationStatus by interval

### Reports
#### GET /reports
Find all reports
#### POST /reports
Create a new reports for appSession 
#### GET /appSessions/:id/reports
Find reports of an appSession finded by id
#### PUT /appSessions/:id/reports
Update report of an appSession finded by id

### Admin
#### GET /admins
List all admins
#### POST /admins
Create new admin
#### GET /admins/:id
Find an admin by id
#### PUT /admins/:id
Update an admin by id
#### /login
support admin login

### AppSettings
#### GET /appSettings
Get the current setting
#### POST /appSettings
Create new setting
#### PUT appSettings/:id
Updated appSettings
</details>


## 2. Alert Function Introduction
- Sending alert based on the parameters set in the admin dashboard (radius / number of people)
- Support check user safty when users mark themselves as positive of Covid19.
- Support check if user in a crowded situation
- Support push notification to the user by service worker generated subcription infos 
    - crypted with VipidKey 
    - included endpoint info 


