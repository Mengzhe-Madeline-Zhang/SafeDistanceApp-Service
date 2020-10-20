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

### License
[MIT](https://choosealicense.com/licenses/mit/)
