import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

// Material imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


export class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">RoomMates</Button>
                    <Button color="inherit" component={Link} to="/signup">SignUP</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
