import React from 'react';
import Cookies from 'js-cookie';
import './C19report.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Heatmap from '../../common/heatmap/Heatmap';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// Styles of Button from material-ui
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#607d8b'),
    backgroundColor:  '#37474f',
    '&:hover': {
      backgroundColor: '#607d8b',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  }, 
}));




class C19report extends React.Component{
  
  constructor(props){
    super(props);
    this.state ={

        covid19: null,
        appSessionID: null,
        covidStats: false,
        unsubmitted:true,
        alteropen:false
    };
    this.getreport = this.getreport.bind(this);
    this.report = this.report.bind(this);
    this.submit = this.submit.bind(this);
    this.optionsRef = React.createRef();
  }
  
  // Get report content when choosing
  getreport(){
    console.log(this.optionsRef.current.value);
    if(this.optionsRef.current.value === 'Positive'){
      
      this.setState({
        covidStats:true,
        covid19: "Positive",
      })
    } 
    if(this.optionsRef.current.value === 'Negative'){this.setState({
      covidStats:false,
      covid19:"Negative"
    })}
    
    this.setState({
      appSessionID: Cookies.get('AppSessionId'),
    });
  }
  
  // Running getreport in componentDidMount
  componentDidMount(){
   this.getreport()
  }


// Change submit status
submit(){
  this.setState(
    {unsubmitted:!this.state.unsubmitted}
  )
}

// Close the alter 
alterClose=()=>{
  this.setState({
    alteropen: false
  })
}

// Send report when clicking sumit button. Alter will show if making no choice
report(){
  if(this.optionsRef.current.value ==='Select'){
    this.setState({
      alteropen:true
    })
  }
  else{
  fetch('https://prod.mengchen-gao.me/appSessions/'+this.state.appSessionID+'/reports', {
    method: "PUT",
    mode:"cors",
    headers:{ "Content-Type": 'application/x-www-form-urlencoded' },
    body: `covid19=${this.state.covidStats}`
    
    }).then(response=>{
    return response.json() 
    })
  this.submit()
  }
}

render(){
  return(
    <div>
         <div className='heatmap'style={{position:'absolute', zIndex:-10}}>
      <Heatmap/></div>
      <div className="report" style={{position:'relative', zIndex:10}}>
        <Card className="card" variant="outlined" >
        {
         this.state.unsubmitted?
         <div> 
        <CardContent className="content">
        <Typography variant="h6">Covid-19 Report</Typography>
        <Typography variant="body2" color="textSecondary">your report will remain anonymous</Typography>
         <br/>
        <Typography variant="body1" >Status:
            <select className='options' ref={this.optionsRef} onChange={this.getreport}>
            <option value='Select'> Please Select</option>
           <option value='Positive'> Positive </option>
           <option value='Negative'> Negative </option>
        </select>
              </Typography><br/>
             <ColorButton variant="contained" color="primary" className={useStyles.margin}
               onClick={ this.report}>
                  Submit </ColorButton>
  
        </CardContent></div>
        :
        <div className="newcontent">
          <Typography variant="h6" >Thank you! </Typography>
          <Typography variant="body2" color="textSecondary" >Your health statue has been updated!</Typography>
          <br/>
          <Typography variant="body2" color="textSecondary" >You Current Covid-19 Report:</Typography>
          <Typography variant="h5" >{this.state.covid19}</Typography>
          
           {
             this.state.covidStats?
             <div><Typography variant="body2" color='error' >Please Quarantine!!!</Typography></div>
             :
             <div><Typography variant="body2" color='inherit'>Please Keep Social Distancing!</Typography></div>
           }
          <br/>
          <ColorButton variant="contained" color="primary" className={useStyles.margin}
               onClick={this.submit}>NewReport </ColorButton>
          
        </div>}
         </Card>
         </div>
         <Dialog
        open={this.state.alteropen}
        onClose={this.alterClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Choose Your Covid-19 Status Truthfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          COVID-19 is declared a pandemic because of the speed at which it has spread globally. 
          COVID-19 can affect anyone, and the disease can cause symptoms ranging from mild to very severe. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.alterClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
 
         </div>
  );
}
}

export default C19report;