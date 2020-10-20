import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import WelcomePage from './component/WelcomePage';
import * as serviceWorker from './serviceWorker';

//React Redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//store stores all data and state. It is like a globalized state.
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(

  <Provider store={store}>
    <WelcomePage />
  </Provider>,
  document.querySelector('#root')

);

window.addEventListener('appinstalled', (e) => {
  document.cookie = 'AppSessionId' +'=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  alert("Installed app on desktop");
  window.location.reload(); 
})

Notification.requestPermission(function(status){
  console.log('Notification permission status:' + status);
})

serviceWorker.register();
