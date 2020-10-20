import React, { Component } from 'react';
import Heatmap from '../heatmap/Heatmap';
import './Landing.scss';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="map-outer col-sm-8 mx-auto">
           <Heatmap />
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
