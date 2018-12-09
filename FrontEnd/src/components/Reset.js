import React, { Component } from 'react';
import axios from 'axios';
import '../css/reset.css';
//import history from './history';
class reset extends Component {
    constructor(){
        super();
          this.state = {
              email: '',
              Validate_Email_Msg: '',
              success: false
          }
          this.handleSubmit = this.handleSubmit.bind(this);
          this.onChangeEmail=this.onChangeEmail.bind(this);
          this.ToRender=this.ToRender.bind(this);

    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({Validate_Email_Msg: ''});
        if(this.state.email === '')
        {
           
            this.setState({Validate_Email_Msg: 'Must enter an email first'});
        }
        else
        {
        
            
            axios.get('/api/reset-password',{
                    params: {
                    email: this.state.email
                    }
                })
            .then((response)=>{
                if(response.data.status)
                {
                    this.ToRender(true);
                }
                else
                {
                    this.ToRender(false);
                }
                
            })
        }
        
    
      }

      onChangeEmail(event){
        this.setState({email: event.target.value});
    
      }
      ToRender(status){
        this.setState({success: status});
    
      }
  render() {
    return (
        <div>
        <head>
            <title>Reset Password</title>     
        </head>
            <body>
                <div className="containerReset">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-inputR">
                            <input type="text" name="Remail" placeholder="Enter Your Email" value={this.email} onChange={this.onChangeEmail}/>   
                        </div>
                        <div>
                            <label id="RegLabels" name="Email-Validation">{this.state.Validate_Email_Msg}</label>
                        </div>
                            <input type="submit" value="Reset-Password" className="btn-reset"/>
                    </form>
                </div>
            </body>
            </div>
    );
  }
}

export default reset;
