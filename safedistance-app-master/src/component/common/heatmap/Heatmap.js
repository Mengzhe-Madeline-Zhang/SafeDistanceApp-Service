import React from 'react';
import '../heatmap/Heatmap.scss';

import GoogleMapReact from 'google-map-react';

export default class extends React.Component{
    //constructor will set the center of the map.
    constructor(props){
        super(props);
        this.state= {
            center: {
                lat: 42.332488999999995,
                lng: -71.1091895
            },
            latitude: null,
            longitude: null,
            locations:null
        };

        this.getLocation();
    }
     
    //in this function HeatMap data is fetched.
    componentDidMount(){
        //Api headers are set here.
        const requestOptions = {
            method: 'GET',
        };

        //Api is called here
        fetch('https://prod.mengchen-gao.me/locations/1000',requestOptions)
            .then(response => response.json())
            .then(data => 
              this.setState({locations:data}));
    }

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
      
      getCoordinates(position){
          let jsonTemp = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,      
        }
        this.setState({
            center : jsonTemp
        });
        console.log(this.state)
      }

    render() {
        //if map locations are fetched then below code will execute.
        console.log(this.state);
        if(this.state.locations != null){
            //array is converted according to google map format
            let positions=[];
            this.state.locations.forEach(element => {
                positions.push({lat:element.latitude, lng:element.longitude});
            });
            const heatmapData = {
                "positions":positions
            }    
            //heatmap code
            return (
                <div className="map-div">
                     

                <GoogleMapReact
                    bootstrapURLKeys={{ key: `AIzaSyBk6HNiH_eMMZNnSGKFM2vhubu5wJiSa-w` }}
                    defaultCenter={this.state.center}
                    center={this.state.center}
                    defaultZoom={11}
                    heatmapLibrary={true}          
                    heatmap={heatmapData}   
                >
                </GoogleMapReact>
                
                </div>
                 
            );
            //this code will execute before heatmap data is fetched.
        }else{
            return(<div>
                <h2>Heat Map:</h2>
                Map will render in Afew Seconds.
               
            </div>)
        }
    }
}