import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios';
// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { fontSize } from '@material-ui/system';


axios.defaults.baseURL = "https://us-central1-hotelmanagement-684f5.cloudfunctions.net/api"


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
    },
    customError: {
        color: 'red',
        fontSize:'0.8rem',
        marginTop: 15
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
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userData)
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    errors : err.response.data,
                    loading: false
                })
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

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

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
