import './NavBar.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'



/**
 * Creating Nav bar using Material-ui core components
 * Reference - https://material-ui.com/components/menus/
 */

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    } 

}));

class Navbar extends Component {

    logOut(e) {
      e.preventDefault()
      localStorage.removeItem('admintoken')
      this.props.history.push(`/`)
    }

    render() {

    return (
        <div className={useStyles.root}>
            <nav className="nav">
            {localStorage.admintoken ? 
                (<Button aria-controls="simple-menu" aria-haspopup="true" component={Link} to="/admin/dashboard" color="inherit">
                    Safe Distance
                </Button> ) : 
                (<Button color="inherit" component={Link} to="/">Safe Distance</Button> )}
                {localStorage.admintoken ? 
                (<Button aria-controls="simple-menu" aria-haspopup="true" component={Link} to="/admin/users" color="inherit">
                    Users
                </Button> ) : 
                (<Button aria-controls="simple-menu" aria-haspopup="true" component={Link} to="/user/report" color="inherit">
                    Report
                </Button>)}
                {localStorage.admintoken ? 
                (<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.logOut.bind(this)} to="/" color="inherit">
                    Logout
                </Button> ) : 
                (<Button aria-controls="simple-menu" aria-haspopup="true" component={Link} to="/admin/login" color="inherit">
                    Login
                </Button>)}
            </nav>
        </div>
    );

}
}

export default withRouter(Navbar)