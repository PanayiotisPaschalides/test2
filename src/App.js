import React, { Component } from 'react';
import Home from './components/home';
import history from './components/history';
import {Router, Route}from 'react-router-dom';
import {withCookies} from 'react-cookie';
import Cookies from 'universal-cookie';
//import './App.css';

const cookies = new Cookies();


class App extends Component {
  constructor(){
    super ();
    this.LogUser = this.LogUser.bind(this);
    }
    

  
  
  LogUser(User, ID){
    cookies.set('User', User, { path: '/' });
    cookies.set('UserID', ID,{ path: '/' });
  }

  LogOut(){
    cookies.remove('User');
    cookies.remove('UserID');
  }
  
  
  render() {
    return (
      
      <Router history={history}>
      <div>
        <Route path='/' exact render={(props) => <Home {...props} User={cookies.get('User')} ID={cookies.get('UserID')} LogUserIn={this.LogUser} LogUserOut={this.LogOut}/>}/>
        </div>
      </Router>

    );
  }
}

export default withCookies(App);
