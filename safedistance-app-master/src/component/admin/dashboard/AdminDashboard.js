import React from 'react';
import '../dashboard/AdminDashboard.scss';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Heatmap from '../../common/heatmap/Heatmap';
import AppSettings from '../app-settings/AppSettings';
import AdminDashboardStats from '../dashboard-stats/AdminDashboardStats';
export default class extends React.Component{
   

    
    //constructor will set the center of the map.
    constructor(props){
        super(props);
        this.state= {
        };
    }
     
    //in this function HeatMap data is fetched.
    componentDidMount(){
        //Api headers are set here.
    }

    render() {
        return(
            <div className="admin-dashboard">
                <div className="grid-container-admin">
                    <div className="grid-cell grid-one">
                        <Card className="card1">
                            <Typography variant="h6" className="card-title" >  
                                Statistics
                            </Typography>
                                <AdminDashboardStats />   
                        </Card>
                    </div>
                    <div className="grid-cell grid-two">
                        <Card className="card1">
                        <Typography variant="h6" className="card-title" >  
                            Heat Map
                        </Typography>
                        <div className="outerDiv">
                            <Heatmap></Heatmap>
                        </div>
                        </Card>
                    </div>
                    <div className="grid-cell grid-three">
                    <Card className="card1">
                        <Typography variant="h6" className="card-title" >  
                            App settings
                        </Typography>
                        <AppSettings></AppSettings> 
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}