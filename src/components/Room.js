import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

const styles = {
    card : {
        display: 'flex'
    }
}

class Room extends Component {
    render() {
        const { classes, room: { avaliable, desc, title, createdAt, image, price , rating}} = this.props
        
        return (
            <Card>
                {/* <CardMedia image={userImage}  title="Room Image"/> */}
                <CardMedia image={image}  title="Room Image"/>
                <CardContent>
                    <Typography variant="h4">{"Title : " +title}</Typography>
                    <Typography variant="body2" color="textSecondary">{"Data : " +createdAt}</Typography>
                    <Typography variant="body1">{"Room-description : " +  desc}</Typography>
                    <Typography variant="body1">{"Room-price : " +  price}</Typography>
                    <Typography variant="body1">{"Room-rating : " +  rating}</Typography>
                </CardContent>
            </Card>
        
        )
    }
}

export default  withStyles(styles)(Room)
