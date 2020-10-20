import React from 'react';
import '../activate-table/ActiveTable.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
          isLoaded:false,
          users:[],         
          
        };
        this.activate = this.activate.bind(this);
        this.check = React.createRef();
      }


    // Get all user data
    componentDidMount() {
      fetch("https://prod.mengchen-gao.me/admins")
      .then(res => res.json())
      .then(
        (result) => {
          
          this.setState({
            isLoaded: true,
            users: result
          });
          console.log(this.state)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }

      )
      
    }

    // Active or unactive users by checkbox 
      activate = (event,_id) =>{
        
        let activateStatus = event.target.checked;
        const options ={
          method:'PUT',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"activateStatus": activateStatus})
        };
        fetch ('https://prod.mengchen-gao.me/admins/'+ _id, options).then (response => {
        
          let users = this.state.users
          users = users.map(user=>{
              if(user._id === _id){
                  user.activateStatus = activateStatus
              }
              return user
          })
          this.setState({
              users
          })
  
        console.log(response);
        })
    console.log(activateStatus)         
      }
    

    render() {
      
      
        return (
          <Card className="activate_card">

          <Typography variant="h6" className="tableTitle" >  
              Users
          </Typography>
          <TableContainer className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>FirstName</TableCell>
                  <TableCell>LastName</TableCell>
                  <TableCell>CreatedDate</TableCell>
                  <TableCell>IsActive?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((value,key) => (
                  <TableRow key={key}>
                     
                    <TableCell>{value._id}</TableCell>
                    <TableCell>{value.email}</TableCell>
                    <TableCell>{value.first_name}</TableCell>
                    <TableCell>{value.last_name}</TableCell>
                    <TableCell>{value.date}</TableCell>
                    <TableCell padding="checkbox">
                        <Checkbox
                          checked={value.activateStatus}
                          ref={this.check}
                          onChange={e=>this.activate(e, value._id)}
                        />
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Card>


        );
    }
}
export default App;