import React, { Component } from 'react'
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode';
//Redux

//Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'
// pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'


const theme  = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodeToken = jwtDecode(token);
  if(decodeToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  }else{
    authenticated = true;
  }
}

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
            <Router>
              <Navbar/>
              <div className="container">
                <Switch>
                  <Route exact path='/' component={home}/>
                  <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
                  <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
                </Switch>  
              </div>
            </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
