import React from 'react';
import '../app-settings/AppSettings.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class extends React.Component{
   

    
    constructor(props) {
        super(props);
        
        this.state = {

            radiu: 0.1,
            numOfPeople: 100,

            open: false,
        };
    }


    componentDidMount(){
        
    }


    settingChange=()=>{

        fetch("https://prod.mengchen-gao.me/appSettings/5f315319a5a2f430be075f3c", {
            method: "PUT",
            mode:"cors",
            headers:{ "Content-Type": 'application/x-www-form-urlencoded' },
            body: `radiu=${this.state.radiu}&numberOfPeople=${this.state.numOfPeople}`
         
        }).then(response=>{
            return response.json() 
        })

        this.setState({open:true});
    }



    setNewRadiuValue = (event) => {
        this.setState({
          radiu: event.target.value,
        });

        

    };
    setNewNumOfPeople = (event) => {
        this.setState({
          numOfPeople: event.target.value,
        });

    };


    handleClose = () => {
        this.setState({open:false});
    };
    

    render() {
        return(
            <div className="app_settings">
            <Card className="appsetting_card">
            <CardContent>
                <Typography variant="h5" component="h2" className="t1">
                Set Alert Information
                </Typography>
                <Typography>
                Alert Radius: {this.state.radiu}
                </Typography>
                <Typography>
                Alert Number Of People: {this.state.numOfPeople}
                </Typography>

                <TextField
                id="content1"
                value={this.state.radiu}
                onChange={this.setNewRadiuValue}
                // className={clsx(classes.margin, classes.textField)}
                variant="filled"
                label="radiu"
                InputProps={{
                startAdornment: <InputAdornment position="start">m</InputAdornment>,
                }}
                />
                
                <TextField
                    id="content2"
                    value={this.state.numOfPeople}
                    onChange={this.setNewNumOfPeople}
                    // className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                    label="number of people"
                    InputProps={{
                    startAdornment: <InputAdornment position="start">humans</InputAdornment>,
                    }}
                />
                <Button size="small" color="primary" onClick={this.settingChange}>
                confirm <br/> change
                </Button>

            </CardContent>

            </Card>

            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Dear admin!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Successfully set new radius and number of people
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    close
                </Button> 
                </DialogActions>
            </Dialog>
                
            </div>
        )
    }
}