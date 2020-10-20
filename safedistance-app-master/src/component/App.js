
import React from 'react';
import './App.scss';
import Heatmap from './common/heatmap/Heatmap';
import Location from './common/Location/Location';
import Report from './user/Report/C19report';
import Welcome from './WelcomePage';


class App extends React.Component {


  render() {
    return (
      <div className="App">
        <h2>Social Distancing App</h2>
        <Location />
        {/* <AlertCard /> */}
        <Heatmap />
        <Report />

        <p> Admin Login/ Register</p>
        <Welcome />
      </div>
    );
  }
}
export default App
