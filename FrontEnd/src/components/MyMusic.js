import React, { Component } from 'react';
import axios from 'axios';
import '../css/MyMusic.css';
import history from './history';
import Select from 'react-select';
import { Modal,DropdownButton,MenuItem} from 'react-bootstrap';
import MusicPlayer from './Music Player/MusicPlayer'

//import MusicPlayer from 'react-responsive-music-player'

class MyMusic extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          CreateAlbumshow: false,
          AddSongshow: false,
          AddSongshowV2: false,
          DeleteUsershow: false,
          LoggedUser: '',
          UserID: '',
          Preview: '',
          AlbumName: '',
          PreviewAlbumName: 'Album Name',
          MyImg: '',
          Song: '',
          SongName: '',
          Artist: '',
          SelectedAlbumID: '',
          UploadBtnText: 'Upload',
          DefaultImg: false,
          LoadPlaylist: false,
          AlbumNames: [],
          albumList: [],
          SongList: [],
          Playlist:[{url: '',
          title: ''}]
          
        };
        this.CreateAlbumhandleShow = this.CreateAlbumhandleShow.bind(this);
        this.CreateAlbumhandleClose = this.CreateAlbumhandleClose.bind(this);
        this.AddSonghandleShow = this.AddSonghandleShow.bind(this);
        this.AddSonghandleClose = this.AddSonghandleClose.bind(this);
        this.DeleteUserShow = this.DeleteUserShow.bind(this);
        this.DeleteUserClose = this.DeleteUserClose.bind(this);
        this.DeleteAccount = this.DeleteAccount.bind(this);
        this.AddSonghandleShowV2 = this.AddSonghandleShowV2.bind(this);
        this.AddSonghandleCloseV2 = this.AddSonghandleCloseV2.bind(this);
        this.LogOutClick = this.LogOutClick.bind(this);
        this.fileSelected = this.fileSelected.bind(this);
        this.SongSelected = this.SongSelected.bind(this);
        this.onChangeAlbumName = this.onChangeAlbumName.bind(this);
        this.onChangeDropDown = this.onChangeDropDown.bind(this);
        this.onChangeSongName =  this.onChangeSongName.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.uploadAlbum = this.uploadAlbum.bind(this);
        this.uploadSong = this.uploadSong.bind(this);
        this.loadAlbums = this.loadAlbums.bind(this);
        this.setupDropDown = this.setupDropDown.bind(this);
        this.Play_Album = this.Play_Album.bind(this);
        this.loadAlbumSongs =  this.loadAlbumSongs.bind(this);
        this.Construct_Playlist = this.Construct_Playlist.bind(this);

      }

      componentDidMount(){
        
        if (this.props.User !== undefined)
        {
        this.setState({LoggedUser: this.props.User, UserID: this.props.ID , Preview: 'preview.jpg'})
        
        }
        else
        {
          history.push('/');
        }
        const self = this;
        setTimeout(function(){ self.loadAlbums() }, 9.1);

      }
      CreateAlbumhandleClose() {
        this.setState({ CreateAlbumshow: false});
      }
    
      CreateAlbumhandleShow() {
        this.setState({ CreateAlbumshow: true, 
          DefaultImg: true, 
          Preview:'preview.jpg',
          AlbumName: '', 
          PreviewAlbumName: 'Album Name',
          UploadBtnText: 'Upload'});
      }
      AddSonghandleClose() {
        
        this.setState({ AddSongshow: false , DefaultImg: true});
      }
    
      DeleteUserShow() {
        this.setState({ DeleteUsershow: true });
      }
      DeleteUserClose() {
        
        this.setState({ DeleteUsershow: false});
      }
    
      AddSonghandleShow() {
        this.setState({ AddSongshow: true });
      }
      AddSonghandleCloseV2() {
        
        this.setState({ AddSongshowV2: false});
      }
    
      AddSonghandleShowV2(albumID) {
        this.setState({ AddSongshowV2: true, SelectedAlbumID: albumID,Artist: '',SongName: '', UploadBtnText: 'Upload'});
      }
      loadAlbums(){
        const self = this;
        axios.get('/api/GetAlbums',{
          params: {
            ID: this.state.UserID
          }
        })
        .then(res => {this.setState({ albumList: res.data });
        }).then(()=> { self.setupDropDown();} )



      }
      loadAlbumSongs(id){
        const self = this;
        axios.get('/api/GetAlbumSongs',{
          params: {
            ID: id
          }
        })
        .then(res => {
          if(res.data.length !== 0)
          {
            console.log(res.data)
            this.setState({ SongList: res.data ,LoadPlaylist : true});
          }
          else{
            this.setState({LoadPlaylist : false})
          }
        }).then(()=> { 
          if(this.state.LoadPlaylist)
          {
          self.Construct_Playlist(id);
          }
        } )



      }
      Construct_Playlist(album_id){
        const Playlist = this.state.SongList.map(song => (
          {url: process.env.PUBLIC_URL + '/Uploaded_Songs/' + this.state.LoggedUser + '/' + album_id + '/' + song.song,
          title: song.artist + ' - ' + song.song_name}
        ))
        this.setState({Playlist: Playlist})
      }
      setupDropDown(){
        const Albums = this.state.albumList.map(album =>(
          {value: album.id, label: album.album_name }
        ))
        this.setState({AlbumNames: Albums});
        
        
      }
      LogOutClick(){
        

        this.props.LogOutUser(); 
        history.push('/');
      } 
      
      fileSelected(event)
      { 
        event.preventDefault();
        this.setState({MyImg: event.target.files[0]});
        
          if (event.target.files && event.target.files[0]) {
              let reader = new FileReader();
              reader.onload = (e) => {
                
                  this.setState({Preview: e.target.result , DefaultImg: false});
              }
              
              
              reader.readAsDataURL(event.target.files[0]);
              
              
          }
        }
        SongSelected(event)
        {
          event.preventDefault();
          this.setState({Song: event.target.files[0]});
        }
      onChangeAlbumName(event){
        if(event.target.value ==='')
        {
          this.setState({AlbumName: event.target.value, PreviewAlbumName: 'Album Name'})
        }
        else{
        this.setState({AlbumName: event.target.value, PreviewAlbumName: event.target.value})
      }
    }
    onChangeSongName(event){
      this.setState({SongName: event.target.value})
    }
    onChangeArtist(event){
      this.setState({Artist: event.target.value})
    }
      onChangeDropDown(selectedOption){
        console.log(`Option selected:`, selectedOption.value);
      }
      uploadAlbum(){
        
        this.setState({UploadImgBtnText: 'Uploading ...'});
       const data = new FormData()
        data.append('file', this.state.MyImg, this.state.AlbumName)
        data.append('ID', this.state.UserID)
        data.append('UserName', this.state.LoggedUser)
        axios.post('/api/upload', data)
        .then((response)=>{
          if(response.data.status)
          {
              this.loadAlbums();
              this.CreateAlbumhandleClose();
          }

        
        
      })
    }
    uploadSong(){
        
      this.setState({UploadBtnText: 'Uploading ...'});
     const data = new FormData()
      data.append('file', this.state.Song, this.state.Song.name)
      data.append('ID', this.state.SelectedAlbumID)
      data.append('UserID', this.state.UserID)
      data.append('SongName', this.state.SongName)
      data.append('Artist', this.state.Artist)
      data.append('UserName', this.state.LoggedUser)
      axios.post('/api/uploadSong', data)
      .then((response)=>{
        if(response.data.status)
        {
            this.AddSonghandleCloseV2();
        }

      
      
    })
  }
    Play_Album(albumID)
    {
      console.log(albumID)
    }
    Delete_Album(id,imgName)
    {
      const Data = {
        ID: id,
        UserName: this.state.LoggedUser,
        Album_Img: imgName
      }
      axios.post('/api/Delete', Data)
      .then((res) => {
        if(res)
        {
          this.loadAlbums();
        }
      })
    }
    DeleteAccount(){
      const Data = {
        ID: this.state.UserID,
        UserName: this.state.LoggedUser
      }
      axios.post('/api/DeleteUser', Data)
      .then((res) => {
        if(res)
        {
          this.props.LogOutUser(); 
          history.push('/');
          
        }
      })
    }
    
    
  render() {
    const { selectedOption } = this.state;
    const style = {
      control: (base, state) => ({
        ...base,
        background: '#666666',
        
        border: state.isFocused ? 0 : 0,
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        "&:hover": {
          border: state.isFocused ? 0 : 0
        }
        
      }),
      singleValue: base => ({
        ...base,
        color: "#fff",
       
      }),
      option: (base,state) => ({
        
        cursor: 'pointer',
        backgroundColor: state.isFocused ? '#4d4d4d': 'transparent', 
        color: 'white',
        "&:focus":{
          
        }
      }),
      menu: base =>({
        ...base,
        backgroundColor: '#666666'
      })

      
    };
    return (
        <div>
          <head>
         
            <title>MyMusic</title>   
            
          </head>
          <header>
            <div className="HeaderStyle">
              <label id="FirstLogoPart">My</label>
              <label id="SecondLogoPart">Music</label>
              <button onClick={this.CreateAlbumhandleShow} name="Header-Buttons">Create Playlist</button> {/* A JSX comment */}
              <button onClick={this.AddSonghandleShow} name="Header-Buttons">Add Song</button>
              
              <DropdownButton bsSize="small" title={"Logged in as: " + this.state.LoggedUser} id="dropdown-size-small">
                <MenuItem eventKey="1">Change Password</MenuItem>
                <MenuItem eventKey="2">Change Email</MenuItem>  
                <MenuItem eventKey="3" onClick={this.DeleteUserShow}>Delete Account</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4" onClick={this.LogOutClick} name='logout'>Log-Out</MenuItem>
              </DropdownButton>  
            </div>
          </header>
          <div className="Top-Spacer" />
          <body>
         
            <div className="Albums-Container">
            <div className="Add-Album" >
                  <img src={process.env.PUBLIC_URL + '/Uploaded_Images/Add-Album.png'} className="Add-Album-Img" alt="Album"/>
                  <p className="Add-Album-Name">
                    Create New Album

                  </p>

                    <div className="Add-Album-Btn-Circle" onClick={this.CreateAlbumhandleShow}/>
                    <div className="Add-Album-Btn" onClick={this.CreateAlbumhandleShow} >+</div>
                    
                  
                
                 
                </div>
            {
              this.state.albumList.map((album) => { return [
                <div key={album.id} className="Album" >
                  <img src={process.env.PUBLIC_URL + '/Uploaded_Images/' + this.state.LoggedUser + '/'
                   +  album.album_image} className="Album-Img" alt="Album"/>
                  <p className="Album-Name">
                    {album.album_name}

                  </p>
                    <div className="Play-Btn-Circle" onClick={() => this.loadAlbumSongs(album.id)}>
                    </div>
                    <div className="Play-Btn" onClick={() => this.loadAlbumSongs(album.id)}/>
                    
                    <div className="Add-Btn-Circle" onClick={() => this.AddSonghandleShowV2(album.id)}/>
                    <div className="Add-Btn"onClick={() => this.AddSonghandleShowV2(album.id)}>+</div>
                    <div className="Trash-Btn-Circle"onClick={() => this.Delete_Album(album.id,album.album_image)}/>
                    <div class="icon-trash" onClick={() => this.Delete_Album(album.id,album.album_image)}>
                      <div class="trash-lid" ></div>
                      <div class="trash-container" ></div>
                      <div class="trash-line-1"></div>
                      <div class="trash-line-2"></div>
                      <div class="trash-line-3"></div>
                    </div>
                    
                  
                
                 
                </div>
                
              ];
            })}

            </div>

            
              
            <Modal show={this.state.CreateAlbumshow} onHide={this.CreateAlbumhandleClose}>
              <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {this.state.DefaultImg ? (
                      <div className="Preview-Album" >
                      <img onClick={()=> this.fileInput.click() } 
                      src={process.env.PUBLIC_URL + '/Uploaded_Images/' + this.state.Preview} 
                      className="Preview-Album-Img" alt="Album"/>
                      <p className="Preview-Album-Name">{this.state.PreviewAlbumName}</p>
                    </div>
                    ) : (
                      <div className="Preview-Album" >
                      <img onClick={()=> this.fileInput.click() } 
                      src={this.state.Preview} 
                      className="Preview-Album-Img" alt="Album"/>
                      <p className="Preview-Album-Name">{this.state.PreviewAlbumName}</p>
                      </div>
                    )}
                  <div> 
                    <input accept="image/x-png,image/gif,image/jpeg" type="file" onChange={this.fileSelected} ref={fileInput => this.fileInput = fileInput} />
                  </div>
                  <div>
                  
                  </div>
                  <div>
                  <label className='AlbumLabel'>Album Name:</label>
                  <br/>
                    <input type="text" className="AlbumNameField" placeholder="Type Album Name" value={this.state.AlbumName} onChange={this.onChangeAlbumName}/>
                    
                  </div>
                  <button onClick={this.uploadAlbum} id='upload'>{this.state.UploadBtnText}</button>
                  
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.AddSongshow} onHide={this.AddSonghandleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
              <Select className="selector" styles={style}
                value={selectedOption}
                onChange={this.onChangeDropDown}
                options={this.state.AlbumNames}
                
                defaultValue={this.state.AlbumNames[0]}
                />
              </Modal.Body>
              <Modal.Footer>
                <button onClick={this.AddSonghandleCloseV2}>Close</button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.DeleteUsershow} onHide={this.DeleteUserClose}>
              <Modal.Header closeButton>
               <label className='DeleteUserMsg'>Are you sure you want to delete your Account?</label>
              </Modal.Header>
              <Modal.Body>
              <div className='DeleteUserModalBody'>
                      <button className='Btn-Yes' onClick={this.DeleteAccount}>Yes</button>
                      <button className='Btn-No' onClick={this.DeleteUserClose}>No</button>
              </div>
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.AddSongshowV2} onHide={this.AddSonghandleCloseV2}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
              <div><input  type="file" onChange={this.SongSelected} ref={SongInput => this.SongInput = SongInput} /></div>
              <div><button className="Select-Song" onClick={()=> this.SongInput.click() }>Select Song</button></div>
              <div><input type="text" className="SongNameField" placeholder="Type Song Name" value={this.state.SongName} onChange={this.onChangeSongName}/></div>
              <div><input type="text" className="SongArtistField" placeholder="Type Artist Name" value={this.state.Artist} onChange={this.onChangeArtist}/></div>
              <div><button onClick={this.uploadSong} id='upload'>{this.state.UploadBtnText}</button></div>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={this.AddSonghandleCloseV2}>Close</button>
              </Modal.Footer>
            </Modal>
          </body>
          <div className="Bottom-Spacer" />
          {this.state.LoadPlaylist ? (
          <footer><div className="Player"><MusicPlayer  playlist={this.state.Playlist}  autoplay = {true}/></div> </footer>):(
            null
          )}
          
          <a href={process.env.PUBLIC_URL + '/Uploaded_Images/preview.jpg'} download>Click to download</a>
          
        </div>
    );
  }
}

export default MyMusic;