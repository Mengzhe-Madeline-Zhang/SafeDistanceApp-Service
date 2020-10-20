import React from 'react';
import Cookies from 'js-cookie';

class Location extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      appSessionID: null,
      latitude: null,
      longitude: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

// Get coordinates by geolocation api
getLocation(){
  if (navigator.geolocation){
    return new Promise(res =>{
        navigator.geolocation.getCurrentPosition((position)=>{
          this.getCoordinates(position)
          res()
        }
    )})
    
  } else {
    alert ("Location is not available")
  }
}

// Set corrdinate in state
getCoordinates(position){
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    appSessionID: Cookies.get('AppSessionId')
  })
}

// Send location date at an interval
componentDidMount(){

 this.interval = setInterval(()=>{
   this.setState({
      appSessionID: Cookies.get('AppSessionId')
   });
   if(this.state.appSessionID !== undefined){
      this.getLocation().then(res => {  
        const options ={
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        };
        fetch ('https://prod.mengchen-gao.me/appSessions/'+ this.state.appSessionID + '/locations', options).then (response => {
          console.log(response);
        })
    
        })
   }
 },60000);
}


componentWillUnmount(){
  clearInterval(this.interval);
}



render(){
  return(
    <div className="Location">
      {/* <button onClick={this.getLocation}>Show Location</button>
       <p>Latitude: {this.state.latitude}</p>
       <p>Longitude:{this.state.longitude}</p> */}
    </div>
  );
}

}

export default Location;