import React, { Component } from 'react';
import axios from 'axios';
import history from './history';
import '../css/home.css';
import FontAwesome from 'react-fontawesome';
import { Modal} from 'react-bootstrap';
import Messenger from './Messenger/Messenger'
import Geocode from "react-geocode";
//mport Map from "./Tools/map"
import CreateAdd from "./AdCreation/AdCreation"

class home extends Component {
    constructor(){
        super();
        
        this.state={
            LoginShow: false,
            SignupShow: false,
            DropDownMenuShow: false,
            Username: '',
            Password: '',
            PasswordConfirm: '',
            Email: '',
            searchField: '',
            AdvertList: [],
            TempManagmentList: [],
            recipesList: [],
            ManagmentList: [],
            logUser:'',
            UserID: '',
            Page: '',
            OpenedRecipe: [],
            IngredientsList: [],
            ChatList: [],
            ActiveChat: '',
            ToUser: '',
            SenderUser: '',
            RecieverUser: '',
            MessagesList: [],
            testimg: [],
            MessengerMsg: '',
            MessengerStatus: 'fas fa-comment-o',
            LoggedIn: true,
            lat: '52.018099',
            long: '-1.49229',
            song: [],
            pictures: []
            
            

        }
        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickRecipe = this.handleClickRecipe.bind(this);
        this.handleClickLog = this.handleClickLog.bind(this);
        this.handleClickReg = this.handleClickReg.bind(this);
        this.handleClickUsername = this.handleClickUsername.bind(this);
        this.onChangesearchField = this.onChangesearchField.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
       
        //this.OpenRecipe = this.OpenRecipe.bind(this);
        this.LoadAdverts = this.LoadAdverts.bind(this);
        this.Search =  this.Search.bind(this);

        //used to show the login
        this.LoginOpen = this.LoginOpen.bind(this);
        this.LoginClose = this.LoginClose.bind(this);
        this.SignupOpen = this.SignupOpen.bind(this);
        this.SignupClose = this.SignupClose.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
        this.Logout = this.Logout.bind(this);
        this.SignupLink = this.SignupLink.bind(this);
        this.LoginLink = this.LoginLink.bind(this);
        this.OpenDropDown = this.OpenDropDown.bind(this);
        this.CloseDropDown = this.CloseDropDown.bind(this); 
        this.onManageRecipesClick = this.onManageRecipesClick.bind(this);
        this.ConstructManagmentList = this.ConstructManagmentList.bind(this);
        this.publish = this.publish.bind(this);
        this.un_publish = this.un_publish.bind(this);
        this.LoadRecipe =  this.LoadRecipe.bind(this);
       
        this.OnMessengerClick =  this.OnMessengerClick.bind(this);
        this.CheckForNewMessages = this.CheckForNewMessages.bind(this);
        this.OpenAdvert =  this.OpenAdvert.bind(this);
        this.PostAdd =  this.PostAdd.bind(this);
        
    }
    componentDidUpdate(){
        
    }
    componentDidMount(){
        if(this.props.User !== undefined && this.props.ID !== undefined )
        {
            
            this.setState({logUser: this.props.User, UserID: this.props.ID, Page:'Home', LoggedIn: true})

            this.interval = setInterval(() => {
                
            this.CheckForNewMessages();
           
            }, 1000);

                
            
        }
        else{
            
            this.setState({ Page:'Home', LoggedIn: false})
        }
        this.LoadAdverts();
        

    }
    LoginOpen() {
        console.log(this.state.testimg)
        const self = this;
                // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey("AIzaSyDDzkcHMNPwBQcJAMTet_kFkpO75zCxNJI");
        
        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        
        // Get address from latidude & longitude.
        /*Geocode.fromLatLng("48.8583701", "2.2922926").then(
        response => {
            const address = response.results[0].formatted_address;
            console.log(address);
        },
        error => {
            console.error(error);
        }
        );*/
        
        // Get latidude & longitude from address.
        Geocode.fromAddress("CV12HZ").then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            self.setState({lat: lat, long: lng})
            console.log(lat, lng);
            console.log(self.state.lat)
        },
        error => {
            console.error(error);
           
        }
        );
        this.setState({ LoginShow: true});
      }
    
      LoginClose() {
        this.setState({ LoginShow: false, Password: '', Username: ''});
      }
      SignupOpen() {
        this.setState({ SignupShow: true});
      }
    
      SignupClose() {
        this.setState({ SignupShow: false, Password: '', Username: '', PasswordConfirm: '', Email: ''});
      }
      LoadAdverts(){
        axios.get('/api/GetAdverts')
        .then(res => {this.setState({AdvertList : res.data})
    })


    }

    onChangesearchField(event){
        this.setState({searchField: event.target.value});
    
      }
      onChangeUsername(event){
        this.setState({Username: event.target.value});
    
      }
      onChangePassword(event){
        this.setState({Password: event.target.value});
    
      }
      onChangePasswordConfirm(event){
        this.setState({PasswordConfirm: event.target.value});
    
      }
      onChangeEmail(event){
        this.setState({Email: event.target.value});
    
      }
    handleClickHome(event){
        event.preventDefault();
        this.LoadAdverts();
        this.setState({Page: 'Home'});
    }

    handleClickRecipe(event){
        event.preventDefault();
        this.setState({Page: 'Recipe'});
    }

    handleClickLog(event){
        event.preventDefault();
        history.push('/login');
    }

    handleClickReg(event){
        event.preventDefault();
        history.push('/register');
    }
    handleClickUsername(event){
        event.preventDefault();
        this.setState({Page: ''});
    }

    Search(event){
        event.preventDefault();
        console.log(this.state.testimg)
        //console.log(this.state.searchField)
        //this.LoadRecipes(this.state.searchField);
    }
    Logout(){
        this.props.LogUserOut();
        window.location.reload();
    }

    onLoginSubmit(event){
        const self = this;
        axios.get('/api/Login', {
            params: {
            Username: this.state.Username,
            Password: this.state.Password
            }
        })
        .then(function (response) {
            if(response.data.status)
            {
                console.log(response.data)
              self.setState({
                  logUser: self.state.Username, 
                  UserID: response.data.ID
              })
              self.props.LogUserIn(self.state.Username, response.data.ID);
              self.LoginClose();
              window.location.reload();
            }
           
          })
    }
    onSignupSubmit(){
        const self = this;
        if(this.state.Password !== this.state.PasswordConfirm)
        {
           
        }
        else
        {
            const user={
                Username: this.state.Username,
                Email: this.state.Email,
                Password: this.state.Password
            }
            axios.post('/api/Register',user)
            .then((response)=>{
                if(response.data.status){
                    self.SignupClose();
                    self.LoginOpen();
                }
            })
        }
    
      
    }
    LoginLink(){
        this.SignupClose();
        this.LoginOpen();
    }
    SignupLink(){
        this.LoginClose();
        this.SignupOpen();
    }
    OpenDropDown()
    {
        
        this.setState({ DropDownMenuShow: true })
         
    }
    CloseDropDown(){
        
       
        this.setState({ DropDownMenuShow: false })
    }

    onManageRecipesClick(event){
        const self = this;
        axios.get('/api/GetRecipesManagment', {
            params:{
                ID : this.state.UserID
            }
        })
        .then(res => {this.setState({TempManagmentList : res.data})
    })
    .then(() => {self.ConstructManagmentList();});
    }

    ConstructManagmentList(){
        const Recipes = this.state.TempManagmentList.map(recipe => (
            {id: recipe.id,
            image: recipe.image,
            title: recipe.title,
            keywords: recipe.keywords,
            views: recipe.views,
            comments: recipe.comments,
            status: recipe.status}
          ))
          this.setState({ManagmentList: Recipes, Page: 'Managment'})
    }
    publish(ID){
        const self = this;
        const recipe={
            ID: ID,
            Status: 'yes',
        }
        axios.post('/api/UpdateRecipeStatus',recipe)
        .then((response)=>{
            if(response.data.status){
                self.onManageRecipesClick();
            }
        })
    }
    un_publish(ID){
        const self = this;
            const recipe={
                ID: ID,
                Status: 'no',
            }
            axios.post('/api/UpdateRecipeStatus',recipe)
            .then((response)=>{
                if(response.data.status){
                    self.onManageRecipesClick();
                }
            })

    }

    OpenRecipe(ID){
            const self = this;
            this.setState({IngredientsList: []})
            const recipe={
                ID: ID,
            }
            axios.post('/api/UpdateRecipeViews',recipe)
            .then((response)=>{
                if(response.data.status){
                    self.LoadRecipe(ID);
                }
            })
    }
    LoadRecipe(ID){
        axios.get('/api/GetRecipe', {
            params:{
                ID : ID
            }
        })
        .then(res => {this.setState({OpenedRecipe : res.data})
    })
    
    }
    
    OnMessengerClick(event){
        event.preventDefault();
        this.setState({Page: 'Messenger'});       
    }
    PostAdd(event){
        event.preventDefault();
        this.setState({Page: 'CreateAdd'});       
    }
    CheckForNewMessages(){
        axios.get('/api/New_Messages_Check', {
            params:{
                UserName : this.state.logUser
            }
        })
        .then(res => {
            if(res.data)
            {
                this.setState({MessengerStatus: 'fas fa-comment'})
            }
            else{
                this.setState({MessengerStatus: 'fas fa-comment-o'})
            }
            
    })
    }


    
    OpenAdvert(id){
        console.log(id + ' Yes im working')
    }
    render() {
        

        let PageBody;
        let PageHeader;
        if(this.state.LoggedIn)
        {
            PageHeader = (
                <header onMouseEnter={this.CloseDropDown}>
                
                <h1 className="sansserif">e</h1>
                <div className="buttons">
                <button name="buttonHome" onClick={this.handleClickHome} className="ButtonStyle">Home</button>
                
                <button name="buttonUsername" onMouseOver={this.OpenDropDown} className="ButtonStyle"><FontAwesome name='fas fa-user'/></button>
                <button className="ButtonMessenger"onClick={this.OnMessengerClick}><FontAwesome name={this.state.MessengerStatus}/></button>
                
                </div>  
            
            </header>
            )
        }
        else{
            PageHeader = (
                <header onMouseEnter={this.CloseDropDown}>
                
                <h1>My Stuff</h1>

                <div className="buttons">
                <button name="buttonHome" onClick={this.handleClickHome} className="ButtonStyle">Home</button>
                <button name="buttonRecipe" onClick={this.handleClickRecipe} className="ButtonStyle">Recipes</button>
                <button name="buttonLog" onClick={this.LoginOpen} className="ButtonStyle">Login</button>
                <button name="buttonReg" onClick={this.SignupOpen} className="ButtonStyle">Sing up</button>
                
                </div>  
            
            </header>
            )
        }

        if(this.state.Page === 'Home'){
            PageBody = (
                <span onMouseEnter={this.CloseDropDown}>
                    <div className='AdvertsContainer'> 
                    {this.state.AdvertList.map((Advert) => { return [
                <div key={Advert.id} className="Album" >
                  <img src={process.env.PUBLIC_URL + '/Uploaded_Images/'
                   +  Advert.image} className="Album-Img" alt="Album" onClick={() => this.OpenRecipe(Advert.id)}/>
                  <p className="Album-Name" onClick={() => this.OpenRecipe(Advert.id)}>
                    <label className='title'>{Advert.title}</label>
                    <label className='Price'>£ {Advert.price}</label>
                  </p>
                </div>
                
              ];
            })}
            </div>
                </span>
            )

            
        }
        else if(this.state.Page === 'Managment'){

            PageBody = (
                <span onMouseEnter={this.CloseDropDown}>
                    <div className='ManagmentContainer'>
                    {this.state.ManagmentList.map((recipe) => { return [
                <div key={recipe.id} className="RecipeItem" >
                  <div className= 'Item-Img-Container'><img src={process.env.PUBLIC_URL + '/Uploaded_Images/'
                   +  recipe.image} className="Item-Img" alt="Item"/></div>
                  <div className="Item-Para" onClick={() => this.OpenRecipe(recipe.id)}>
                    <div className='Item-title'>{recipe.title}</div>
                    <div className="Item-keywords">{recipe.keywords}</div>
                    <div className="Item-stats"> views: {recipe.views} comments: {recipe.comments}</div>
                  </div>
                  {recipe.status === 'yes' ? <div className='Button-Container'><button className='Item-Buttons' onClick={() =>this.un_publish(recipe.id)}>Un-Publish</button></div> : 
                  <div className='Button-Container'><button className='Item-Buttons' onClick={ () =>this.publish(recipe.id)}>Publish</button></div>}
                </div>

                
                
              ];
            })}
            </div>
                </span>
            )
        }
        else if(this.state.Page === 'Messenger'){
            
            PageBody = (
                <span onMouseEnter={this.CloseDropDown}>
                    <Messenger user={this.state.logUser} addopen={this.OpenAdvert} />
                    </span>
            )
            
        }
        else if(this.state.Page === 'CreateAdd'){
            
            PageBody = (
                    <CreateAdd user={this.state.logUser}/>
            )
            
        }
        

    return (

      <div>
            <title>Home</title>
            <link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css"></link>
        {this.state.DropDownMenuShow? (
                 <div className='ExternalContainer' onClick={this.CloseDropDown}>
                    <div className="DropdownContainer" onMouseLeave={this.CloseDropDown}>
                        <button className="DropdownItem">Create recipes</button>
                        <div className="divider"/>
                        <button className="DropdownItem" onClick={this.onManageRecipesClick}>Manage recipes</button>
                        <div className="divider"/>
                        <button className="DropdownItem" onClick={this.PostAdd}>Post Ad</button>
                        <div className="divider"/>
                        <button className="DropdownItem" onClick={this.OnMessengerClick}>Favourites</button>
                        <div className="divider"/>
                        <button className="DropdownItem" onClick={this.Logout}>Logout</button>
                    </div>
                 </div>
             )
                :null}
            {PageHeader}
            <div className='Top-Spacer'/>
      
            
             {PageBody}
            
             {/*<Map lat={this.state.lat} long={this.state.long}/>*/}
            

             

            <Modal show={this.state.LoginShow} onHide={this.LoginClose}>
            <button className='Modal-Close-Btn' onClick={this.LoginClose}>X</button>
              <Modal.Header> 
                  <label className='Modal-Title'>Log-In</label>
                  
              </Modal.Header>
              <Modal.Body>
                  <div className="bodyContainer">
                  <label className="fieldHeading">Username</label>
                  <br/>
                  <input type="text" className="InputField"  value={this.state.Username} onChange={this.onChangeUsername}/>
                  <br/>
                  <br/>
                  <label className="fieldHeading">Password</label>
                  <br/>
                  <input type="password" className="InputField"  value={this.state.Password} onChange={this.onChangePassword}/>
                  <br/>
                  <br/>
                  <button className='body-Btn' onClick={this.onLoginSubmit}>Login</button>
                  </div>
              
              </Modal.Body>
              <Modal.Footer>
                <label className='Footer-Message' >DONT HAVE AN ACCOUNT? </label>
                <label className='Footer-Btn' onClick={this.SignupLink}>SIGN UP</label>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.SignupShow} onHide={this.SignupClose}>
            <button className='Modal-Close-Btn' onClick={this.SignupClose}>X</button>
              <Modal.Header> 
                  <label className='Modal-Title'>Sign-Up</label>
                  
              </Modal.Header>
              <Modal.Body>
                  <div className="bodyContainer">
                  <label className="fieldHeading">Username</label>
                  <br/>
                  <input type="text" className="InputField"  value={this.state.Username} onChange={this.onChangeUsername}/>
                  <br/>
                  <br/>
                  <label className="fieldHeading">Password</label>
                  <br/>
                  <input type="password" className="InputField"  value={this.state.Password} onChange={this.onChangePassword}/>
                  <br/>
                  <br/>
                  <label className="fieldHeading">Confirm Password</label>
                  <br/>
                  <input type="password" className="InputField"  value={this.state.PasswordConfirm} onChange={this.onChangePasswordConfirm}/>
                  <br/>
                  <br/>
                  <label className="fieldHeading">Email</label>
                  <br/>
                  <input type="email" className="InputField"  value={this.state.Email} onChange={this.onChangeEmail}/>
                  <br/>
                  <br/>
                  <button className='body-Btn' onClick={this.onSignupSubmit}>Sign Up</button>
                  </div>
              
              </Modal.Body>
              <Modal.Footer>
                <label className='Footer-Message' >ALREADY HAVE AN ACCOUNT? </label>
                <label className='Footer-Btn' onClick={this.LoginLink} >LOG IN</label>
              </Modal.Footer>
            </Modal>


        
    </div>
    );
  }
}

export default home;
