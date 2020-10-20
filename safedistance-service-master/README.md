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

