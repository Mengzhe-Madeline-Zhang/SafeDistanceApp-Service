console.log('My custom service worker');

var CACHE_NAME = 'appSession-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/icons/icon-64.png',
  '/icons/icon-128.png',
  '/icons/icon-512.png'
];

var appSession_cookie = undefined;
let subscription_token = undefined;

const url = 'https://prod.mengchen-gao.me/appSessions';
let location = {};

console.log(navigator);

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('install', async () => {
  // This will be called only once when the service worker is activated.
  console.log('install');
  try {
    // needs to be setted up 
    // npm install -g web-push
    // web-push generate-vapid-keys
    const applicationServerKey = urlB64ToUint8Array(
      'BAWCoVc_ahZVzo9vD6B9vDDLwtfw0bgAmXmVZz-5OxgcpJF6g_KcTUBCvvg1ydpHBqqWTDH8aKq0mfN7yHoERyA'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
    subscription_token = subscription;
    console.log(subscription_token);
    setInterval(setAppSession, 10000);

  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('message', function(e) 
	{
		e.waitUntil(new Promise((resolve) =>
			{
				var windowCount;
				
				var client = e.source;  // Must also be true for real TravelEvent
				console.log("TravelEvent " + client.id) // UA filters per client
				
				switch (e.data.cmd) {
					case 'start':
					case 'travel':					
					case 'error':
					case 'loiter':
					case 'end':
/*
 * I don't know what will happen if client has not registered a message event 
 * handler. Hopefully an "InvalidStateError" is thrown. 
 */ 
						var msg = e.data.position||e.data.error;
						windowCount = clients.length || 0;							
						sendClient(client, e.data.cmd, msg);
						tellFleetManager({
							"cmd" : e.data.cmd,
							"activeClients" : windowCount,
							"data" : msg
							}).then(resolve,resolve).catch(error => {resolve()});	
							
					  break;
					default:
					  console.log("In default cmd : "+e.data.cmd);
					  resolve();
				};
			})
		)			  
	})	

self.addEventListener('notificationclose',function(event){
  console.log(event);
  let notification = event.notification;
  let primaryKey = notification.data.primaryKey;
  console.log('closed notification : ' + primaryKey);
})

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://localhost:3000/');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  console.log(e.data.text());
  var options = {
    body: e.data.text(),
    icon: './logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Check heatmap'},
      {action: 'close', title: 'Close'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Danger!!', options)
  );
});

self.addEventListener('fetch', function(event) {
    // console.log(event);
    if(event.request.method != 'GET'){
      return;
    }

    const url = new URL(event.request.url);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {

          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
      }
    )
  );
});


// post location to server in background every one minutes
// setInterval(function () {
//   getData('https://prod.mengchen-gao.me/appSessions?_id=' + appSession_cookie, {})
//   .then(response => {
//     if(response.status !== 200){
//       console.log("Status code: " + response.status);
//       console.log(response[0]);
//       return;
//     }
//     // Examine the text in the response
//     response.json().then(function(data) {      
//       console.log(data);
//     });
//   })
//   .catch((err) => {
//     console.log('Fetch Error :-S', err);
//   });
// },200000);

// setInterval(setAppSession, 10000);

// enable cookieStore in Chrome
// enable the #enable-experimental-web-platform-features flag in chrome://flags
function setAppSession  (){
  getCookies = cookieStore.get("AppSessionId")
    .then((cookie) => {
      if(cookie == null){
        console.log("New appSessions");
        postData(url, {})
          .then(response => {
            if(response.status !== 200){
              console.log("Status code: " + response.status);
              console.log(response);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data._id);
              appSession_cookie = data._id;
              console.log(appSession_cookie);
              cookieStore.set({ name: "AppSessionId", value: appSession_cookie});
              
              putData(url + '/' + appSession_cookie, {
                subscription : subscription_token})
              .then(response => {
                if(response.status !== 200){
                  console.log("Status code: " + response.status);
                  console.log(response);
                  return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                  console.log(data._id);
                  console.log(data.appSessionID);
                });
              })
              .catch((err) => {
                console.log('Fetch Error :-S', err);
              });

              console.log("New report");

              postData('https://prod.mengchen-gao.me/reports', {
                appSessionID : appSession_cookie,
                covid19:false
              })
              .then(response => {
                if(response.status !== 200){
                  console.log("Status code: " + response.status);
                  console.log(response);
                  return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                  console.log(data._id);
                  console.log(data.appSessionID);
                });
              })
              .catch((err) => {
                console.log('Fetch Error :-S', err);
              });
            });
          })
          .catch((err) => {
            console.log('Fetch Error :-S', err);
          });

      }else{
        appSession_cookie = cookie.value;
        return cookie.value;
      }
  });
}

async function postData(url='', data = {}) {
  console.log(appSession_cookie);
  const response = fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'X-APP-SESSION': appSession_cookie,
    },
    credentials:'include',
    body: JSON.stringify(data),
  })
  return response;
}

async function getData(url='', data={}) {
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'X-APP-SESSION': appSession_cookie,
    }
  })
  return response;
}

async function putData(url='',data={}) {
  console.log(appSession_cookie);
  const response = fetch(url, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'X-APP-SESSION': appSession_cookie,
    },
    credentials:'include',
    body: JSON.stringify(data),
  })
  console.log(JSON.stringify(data));
  return response;
}


// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

