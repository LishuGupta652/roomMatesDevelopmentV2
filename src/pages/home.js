import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import '../App.css'

import Room from '../components/Room'

class home extends Component {
    state ={
        rooms : null
    }
    componentDidMount(){
        axios.get('/rooms')
            .then(res => {
                console.log(res.data)
                this.setState({
                    rooms: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentRoomsMarkup = this.state.rooms ? (
            this.state.rooms.map(room => <Room room={room} />)
        ) : <div className="load-container"><p className="loading"></p></div>
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {recentRoomsMarkup}
                </Grid>
                
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
