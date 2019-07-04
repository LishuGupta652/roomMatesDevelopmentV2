import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'

// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
//MUI imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const styles = {
    card : {
        maxWidth: 800, 
        marginBottom: 20
    },
    image:{
        objectFit: 'cover'
    }
}

class Room extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, room: {  desc, title, createdAt, image, price , roomId, rating}} = this.props
        
        return (
            // <Card className={classes.card}>
            //     {/* <CardMedia image={userImage}  title="Room Image"/> */}
            //     <CardMedia image={image}  title="Room Image" className={classes.image}/>
            //     <CardContent class={classes.content}>
            //         <Typography variant="h4" component={Link} to={`/rooms/${title}`} color="primary">{title}</Typography>
            //         <Typography variant="body2" color="textSecondary">{"Data : " +createdAt}</Typography>
            //         <Typography variant="body1">{"Room-description : " +  desc}</Typography>
            //         <Typography variant="body1">{"Room-price : " +  price}</Typography>
            //         <Typography variant="body1">{"Room-rating : " +  rating}</Typography>
            //     </CardContent>
            // </Card>
            <Card className={classes.card}>
                <CardActionArea component={Link} to={`/rooms/${title}`}>
                    <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={image}
                    title={title}
                    className={classes.image}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {desc}
                    </Typography>
                    <Typography variant="h6">
                        {"Available at " +  price}
                    </Typography>
                    <Typography variant="body1">
                        {"Rating " +  rating}
                    </Typography>
                    <Typography variant="body2">
                        {"Posted : " +  dayjs(createdAt).fromNow()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary"component={Link} to={`/buy/rooms/${roomId}/${title}`}>
                    Book Now
                    </Button>
                    <Button size="small" color="primary" component={Link} to={`/rooms/${title}`}  >
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default  withStyles(styles)(Room)
