import React, { Component } from 'react'
import axios from 'axios'


import Grid from '@material-ui/core/Grid'
import '../App.css'

import Room from '../components/Room'

axios.defaults.baseURL = "https://us-central1-hotelmanagement-684f5.cloudfunctions.net/api"

class home extends Component {
    state ={
        rooms : null
    }

    // Mounting the component usiing axios
    componentDidMount(){
        axios.get('/rooms')
            .then(res => {
                this.setState({
                    rooms: res.data
                })
            })
            .catch(err => console.log(err));
    }
    // componentDidMount(){
    //         fetch('https://us-central1-hotelmanagement-684f5.cloudfunctions.net/api/rooms')
    //         .then(data => data.json())
    //         .then(data => {
    //             this.setState({
    //                 rooms: data
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
    render() {
        let recentRoomsMarkup = this.state.rooms ? (
            this.state.rooms.map(room => <Room key={room.createdAt} room={room} />)
        ) : <div className="load-container"><p className="loading"></p><div className="top-loader"></div></div>
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {recentRoomsMarkup}
                </Grid>
                
                <Grid item sm={4} xs={12}>
                    <h3>Section For  User Profiles .....</h3>
                    <div className="loading"></div>
                </Grid>
            </Grid>
        )
    }
}

export default home
