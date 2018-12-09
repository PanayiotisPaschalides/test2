import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';

import history from './history';


class login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.RegisterLink=this.RegisterLink.bind(this);
        this.ResetLink=this.ResetLink.bind(this);
       
    }
    
    componentDidMount(){
        if(this.props.User !== undefined)
        {
            history.push('/MyMusic');
        }
    }
    onChangeUsername(event){
        this.setState({username: event.target.value});
    
      }
      onChangePassword(event){
        this.setState({password: event.target.value});
    
      }
    handleSubmit(event) {

        event.preventDefault();
        axios.get('/api/LoginValidation', {
            params: {
            username: this.state.username,
            password: this.state.password
            }
        })
        .then((response) => {
            if(response.data.status)
            {
                
                this.props.LogUserIn(this.state.username, response.data.ID);
                history.push('/MyMusic');
                
            }
           
          })

          

          
        
          
    
      }
      RegisterLink(event){
        event.preventDefault();
        history.push('/Register');
    
      }
      ResetLink(event){
        event.preventDefault();
        history.push('/Reset');
    
      }


  render() {
    
    return (
      <div>
          <head>
         
         <title>Login</title>   
         
       </head>
        
            <div className="containerL">
                
                <form onSubmit={this.handleSubmit} >
                <div className="Logo">
                <img src={require('../imgs/Local/Logo2.png')} alt='' />
                </div>
                    <div className="form-inputL">
                        <input type="text" className="textarea" name="username" placeholder="Enter the user name" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-inputL">
                        <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                        <button type="submit"  className="btn-loginL">login</button>
                    <div className="reset-linkL">
                        <a className="link" href="/reset" name='reset' onClick={this.ResetLink}>Forgot password?</a>
                    </div>
                    <div className="register-linkL">
                    <a className="link" href="/register" name='Register' onClick={this.RegisterLink}>Not A Memeber? Register Now</a>
                    </div>
                </form>
            </div>
        
    </div>
    );
  }
}

export default login;
