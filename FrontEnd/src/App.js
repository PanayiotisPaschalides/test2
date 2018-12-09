import React, { Component } from 'react';
import Login from './components/login';
import Register from './components/register';
import MyMusic from './components/MyMusic'
import history from './components/history';
import Reset from './components/Reset';
import Download from './components/error'
import {withCookies} from 'react-cookie';
import Cookies from 'universal-cookie';
import {Router, Route}from 'react-router-dom';

//import './App.css';
const cookies = new Cookies();
class App extends Component {
  constructor(){
    super();
    this.state = {
    }
    this.LogUser = this.LogUser.bind(this);
    this.LogoutUser = this.LogoutUser.bind(this);

  }
  LogUser(User, ID){
    cookies.set('User', User, { path: '/' });
    cookies.set('UserID', ID,{ path: '/' });
  }
  LogoutUser(){
    cookies.remove('User')
  }
  render() {
    
    return (
      <Router history={history}>
        <div>
          <Route path='/' exact render={(props) => <Login {...props} User={cookies.get('User')} LogUserIn={this.LogUser} />}/>
          <Route path="/Register" component={Register} exact/>
          <Route path="/Reset" component={Reset} exact/>
          <Route path="/Download" component={Download}/>
          <Route path='/MyMusic' exact render={(props) => <MyMusic {...props} User={cookies.get('User')} ID={cookies.get('UserID')} LogOutUser={this.LogoutUser} />}/>
          <Route path='/Registqwder' exact render={(props) => <Register {...props} User={this.state.LoggedUser} />}/>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
