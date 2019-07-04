import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        width: 50,
        height: 50,
        margin: '10px auto 10px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    }, 
    button: {
        marginTop : 20
    }
};


class login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:"",
            loading:false,
            errors: {}
        } 
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading:true
        });
        const userData = {
            email : this.state.email,
            password : this.state.password
        }

        var data = new FormData();
        data.append('json', JSON.stringify(userData))
        fetch('https://us-central1-hotelmanagement-684f5.cloudfunctions.net/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: data
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        const { classes }  = this.props;
        const { errors, loading }= this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="SiteImage" className={classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField} 
                        helperText={errors.email} 
                        error={errors.email ? true : false } 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth />

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="password" 
                        className={classes.textField} 
                        helperText={errors.password} 
                        error={errors.password ? true : false }  
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth />

                        <Button type="submit" variant="contained" color="primary" className={classes.button} >Login</Button>

                    </form>

                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes : PropTypes.object.isRequired
}

export default withStyles(styles)(login);
