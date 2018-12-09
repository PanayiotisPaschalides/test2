import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './Messenger.css';
import RatingComponent from '../Tools/Rating'
class Messenger extends Component {

    static propTypes = {
        user: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            logUser: this.props.user,
            UserID: '',
            Page: '',
            ChatList: [],
            ActiveChat: '',
            ToUser: '',
            SenderUser: '',
            RecieverUser: '',
            MessagesList: [],
            MessengerMsg: ''
            

        }
        this.LoadChatItems = this.LoadChatItems.bind(this);
        this.LoadMessages = this.LoadMessages.bind(this);
        this.OpenChat = this.OpenChat.bind(this);
        this.OnMsgChange = this.OnMsgChange.bind(this);
        this.SendMsg = this.SendMsg.bind(this);
        this.UpdateStatus = this.UpdateStatus.bind(this);
        this.OpenAdvert =  this.OpenAdvert.bind(this);
        this.ReadMsg =  this.ReadMsg.bind(this);
        this.CheckRead =  this.CheckRead.bind(this);
        
    }
    componentDidMount(){
        this.LoadChatItems(); 

            this.interval = setInterval(() => {
              
                    this.LoadMessages(this.state.ActiveChat) ;
                    this.LoadChatItems();
                    
               
            if(this.state.ActiveChat !== '')
            {
                this.ReadMsg();
                this.UpdateStatus(this.state.SenderUser,'yes');
            }
            }, 1000);

                
            
        }
    LoadChatItems(){
        
        axios.get('/api/LoadChatItems', {
            params:{
                UserName : this.state.logUser
            }
        })
        .then(res => {this.setState({ChatList : res.data})
    })
    }
    OpenChat(id,to,sender,reciever){
        this.setState({ToUser: to, SenderUser: sender, RecieverUser: reciever});
        this.LoadMessages(id)
        this.ReadMsg()
    }
    LoadMessages(id){
        axios.get('/api/LoadMessages', {
            params:{
                ChatID : id
            }
        })
        .then(res => {this.setState({MessagesList : res.data , ActiveChat: id })
        
    })
    }
    OnMsgChange(event){
        this.setState({MessengerMsg: event.target.value})
    }
    SendMsg(){
        
        var msg = this.state.MessengerMsg;
        if(this.state.ActiveChat !== undefined && this.state.MessengerMsg !== '')
        {
            const MessageBody={
                
                By: this.state.logUser,
                To: this.state.ToUser,
                Message: this.state.MessengerMsg,
                ID: this.state.ActiveChat,
                
            }
            axios.post('/api/SendMsg',MessageBody)
            .then((response)=>{
                if(response.data.status){
                    this.setState({MessengerMsg: ''});
                }
            }).then(this.UpdateStatus(this.state.RecieverUser,'no')).then(this.UpdateChat(msg))


        }
    }
    CheckRead(id){
        axios.get('/api/checkRead', {
            params:{
                UserName : this.state.logUser,
                ID: id
            }
        })
        .then(res => {
            if(res.data)
            {
                this.setState({font_color: 'black', font_weight: 'bold'})
            }
            else{
                this.setState({font_color: 'rgba(75, 75, 75, 0.726)', font_weight: 'none'})
            }
            
    })
    }
    UpdateStatus(User,Status){
        const Data={
            user: User,
            status: Status,
            ID: this.state.ActiveChat
        }
        axios.post('/api/UpdateStatus',Data)
        .then((response)=>{
            if(response.data.status){
                
            }
        })


    }
    ReadMsg(){
        const Data={
            User: this.state.logUser,
            ID: this.state.ActiveChat
        }
        axios.post('/api/ReadMsg',Data)
        .then((response)=>{
            if(response.data.status){
                
            }
        })


    }
    UpdateChat(msg){
        
        const Data={
            UserName: this.state.logUser,
            ChatID: this.state.ActiveChat,
            LastMsg: msg.substring(0,8) + ' ...'
        }
        axios.post('/api/UpdateChat',Data)
        .then((response)=>{
            if(response.data.status){
                this.LoadChatItems();
            }
        })

        
    }
    OpenAdvert(id){
        
        this.props.addopen(id);
    }
    render() {
        

    return (

      <div>
        
       
        <div className='MessengerContainer'>
                        <div className='sidepanel' ref={(div) => {this.SidePanel = div;}} >

                        {this.state.ChatList.map((chat) => { return [

                            <div className='chatItem' key={chat.id} >
                            {chat.by_user === this.state.logUser ? (
                            <div className='chatItemContainer' onClick={() => this.OpenChat(chat.id,chat.to_user,'by_read','to_read')}>
                            <div className= 'chatItemLeft'>
                            <img className= 'ChatItemImg'src={process.env.PUBLIC_URL + '/Uploaded_Images/'+  chat.advert_img} alt='chat.advert_img'/>
                            </div>
                            <div className= 'chatItemRight'>
                            <div className='ChatItemName'>{chat.advert_title}</div>
                            {chat.last_sender === this.state.logUser?<div className='ChatItemPreview'>You: {chat.last_msg}</div>: null}
                            {chat.last_sender !== this.state.logUser && chat.by_read === 'no'?<div className='ChatItemPreviewBold'>{chat.last_msg}</div>: null}
                            {chat.last_sender !== this.state.logUser && chat.by_read === 'yes'?<div className='ChatItemPreview'>{chat.last_msg}</div>: null}
                        </div> 
                        </div>):(
                             <div className='chatItemContainer'onClick={() => this.OpenChat(chat.id,chat.by_user,'to_read','by_read')}>
                             <div className= 'chatItemLeft'>
                             <img className= 'ChatItemImg'src={process.env.PUBLIC_URL + '/Uploaded_Images/'+  chat.advert_img} alt='chat.advert_img'/>
                             </div>
                             <div className= 'chatItemRight'>
                             <div className='ChatItemName'>{chat.advert_title}</div>
                             {chat.last_sender === this.state.logUser?<div className='ChatItemPreview'>You: {chat.last_msg}</div>: null}
                            {chat.last_sender !== this.state.logUser && chat.to_read === 'no'?<div className='ChatItemPreviewBold'>{chat.last_msg}</div>: null}
                            {chat.last_sender !== this.state.logUser && chat.to_read === 'yes'?<div className='ChatItemPreview'>{chat.last_msg}</div>: null}
                         </div> 
                         </div>
                             
                             )}
                            </div>
                            ];
                        })}

                        
                        
                        
                        </div>
                        <div className='mainpanel'>
                        <div className='advertpanel'>
                        {this.state.ChatList.map((chat) => { return [

                            <div  key={chat.id} >
                            {chat.id === this.state.ActiveChat ? (
                                <div className='advertItems'>
                            <div className='AdvertInitialImg'>
                            {chat.by_user === this.state.logUser?<label className='AdvertInitialChar'>{chat.to_user[0].toUpperCase()}</label>: <label>{chat.by_user[0].toUpperCase()}</label>}
                            </div>
                            <div className='AdvertDetails'><label className='AdvertTitle' onClick={() => this.OpenAdvert(chat.advert_id)}>{chat.advert_title}</label>
                            <label className='AdvertPrice'> £{chat.advert_price}</label>
                            <RatingComponent user={this.state.logUser} Reciever={this.state.ToUser}/>
                            </div>
                            
                            </div>
                            ):(
                            <div></div>
                            )}
                            </div>
                            ];
                            })}
                        
                        
                        </div>
                            <div className='chatpanel' ref={(div) => {this.ChatPanel = div;}}>

                            {this.state.MessagesList.map((message) => { return [

                                <div  key={message.id}>
                                {message.by_user === this.state.logUser ? (
                                    <div className='MessageContainer'>
                                    <div className='SendMsgContainer'>
                                    <div className='SendMsgText'>
                                    {message.message}
                                    </div>
                                    </div>
                                    </div>

                                ):(
                                    <div className='MessageContainer'>
                                    <div className='recievedMsgContainer'>
                                    <div className='recievedMsgText'>
                                    {message.message}
                                    </div>
                                    </div>
                                    </div>
                                    
                                    
                                )}
                                </div>
                                
                                
                                
                                ];
                                })}






                            

                   
                            

                            </div>
                            <div className='bottompanel'>
                            <div className='messagepanel'>
                            <textarea className='TextArea' placeholder='Type Mesage' value={this.state.MessengerMsg} onChange={this.OnMsgChange}></textarea>
                            </div>
                            <div className='chatbuttons'>
                            <button className='MessengerSendBtn' onClick={this.SendMsg}>Send</button>
                            </div>
                            </div>
                        </div>
                    </div>


      
    </div>
    );
  }
}

export default Messenger;
