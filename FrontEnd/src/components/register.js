import React, { Component } from 'react';
import axios from 'axios';
import '../css/register.css';
import history from './history';
class register extends Component {
    constructor(){
        super();
          this.state = {
              username:'',
              email: '',
              password: '',
              confirmpassword: '',
              Validate_Pass_Msg: '',
              Validate_Email_Msg: '',
              Validate_Username_Msg: ''
          }
          this.handleSubmit = this.handleSubmit.bind(this);
          this.onChangeUsername=this.onChangeUsername.bind(this);
          this.onChangePassword=this.onChangePassword.bind(this);
          this.onChangeEmail=this.onChangeEmail.bind(this);
          this.onChangeConfirm_Password=this.onChangeConfirm_Password.bind(this);
          this.validate_pass=this.validate_pass.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({Validate_Pass_Msg: ''});
        this.setState({Validate_Email_Msg: ''});
        this.setState({Validate_Username_Msg: ''});
        if(this.state.password !== this.state.confirmpassword)
        {
           
            this.setState({Validate_Pass_Msg: 'Passwords do not match'});
        }
        else
        {
            const user={
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            axios.post('/api/create-user',user)
            .then((response)=>{
                switch(response.data.status){
                    case 2: //succesfull
                        history.push('/');
                        break;
                    case 0://username exists
                    this.setState({Validate_Username_Msg: 'Username Taken'});
                        break;
                    case 1://email exists
                        this.setState({Validate_Email_Msg: 'Email Taken'});
                        break;
                    default:
                        break;
                }
            })
        }
    
      }
    onChangeUsername(event){
        this.setState({username: event.target.value});
    
      }
      onChangeEmail(event){
        this.setState({email: event.target.value});
    
      }
      onChangePassword(event){
        this.setState({password: event.target.value});
    
      }
      onChangeConfirm_Password(event){
        this.setState({confirmpassword: event.target.value});
    
      }
      validate_pass(event){
        
    
      }
  render() {
    return (
        <div>
        <head>
            
            <title>register</title>     
        </head>
            <body>
                <div className="containerR">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputR">
                            <input type="text" name="username" placeholder="Enter the user name" value={this.username} onChange={this.onChangeUsername}/>
                        </div>
                        <div>
                            <label id="RegLabels" name="UserName-Validation">{this.state.Validate_Username_Msg}</label>
                        </div>
                        <div className="form-inputR">
                            <input type="text" name="email" placeholder="Enter A Valid Email" value={this.email} onChange={this.onChangeEmail}/>   
                        </div>
                        <div>
                            <label id="RegLabels" name="Email-Validation">{this.state.Validate_Email_Msg}</label>
                        </div>
                        <div className="form-inputR">
                            <input type="password" name="password" placeholder="Enter Password" value={this.password} onChange={this.onChangePassword}/>
                        </div>
                        <div className="form-inputR">
                            <input type="password" name="confirmpassword" placeholder="Confirm Password" value={this.confirmpassword} onChange={this.onChangeConfirm_Password} />
                        </div>
                        <div>
                            <label id="RegLabels" name="Pass-Validation">{this.state.Validate_Pass_Msg}</label>
                        </div>
                            <input type="submit" value="Sign-Up" className="btn-register"/>
                        <div className="error-msg-cont">
                            <label id="error-msg"></label>
                        </div>
                    </form>
                </div>
            </body>
            </div>
    );
  }
}

export default register;
