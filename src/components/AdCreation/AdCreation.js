import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './AdCreation.css'

class RatingComponent extends Component {

    static propTypes = {
        user: PropTypes.string,
        
    }
    constructor(props){
        super(props);
        this.state={
            logUser: this.props.user,
            Images: [],
            DefaultImg: 'yes',
            Preview: null,
            ImgList: [],
            testlist: []

            

        }
        this.AddImages = this.AddImages.bind(this);
        this.DisplayImages = this.DisplayImages.bind(this);
        this.sleep = this.sleep.bind(this);
        this.Remove = this.Remove.bind(this);
        this.upload = this.upload.bind(this);
        
    }
    AddImages(event){
        const self = this;
        event.preventDefault();
        
        var FileImgs = this.state.testlist
        var DisplayImgs = this.state.ImgList;
        this.sleep(200);

        for (var i = 0; i < event.target.files.length; i++) { 
            FileImgs.push(event.target.files[i])
            DisplayImgs.push(URL.createObjectURL(event.target.files[i]))
            }
        
        this.setState({ImgList: DisplayImgs, Images : FileImgs})
        setTimeout(function(){ 
           
            self.DisplayImages(); }, 200);
        
        
    
    }
    DisplayImages()
    {
        console.log(this.state.Images)
        
        //console.log(this.state.ImgList)
    }
    sleep(milliseconds) {
        console.log('sleep')
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
      Remove(image){
        var display = this.state.ImgList;
        var files = this.state.Images;
        var index = display.indexOf(image);
        if (index > -1) {
            display.splice(index, 1);
            files.splice(index, 1)
        }
        this.setState({ImgList : display, Images: files})
      }
      upload(){
          console.log(this.state.Images.length)
        for (var i = 0; i < this.state.Images.length; i++) {
        const data = new FormData()
        data.append('file', this.state.Images[i], this.state.Images[i].name)
        const Data = {
            items : this.state.ImgList
        }
        axios.post('/api/Upload', data)
        
      }
    }

    render() {
        
        
    return (



      <div >
          <div className='ImagesContainer' >
        <div><input  type="file" multiple onChange={this.AddImages} ref={ImageInput => this.ImageInput = ImageInput} /></div>
        
        <div onClick={()=> this.ImageInput.click() } className="ImageContainer">
          <img className="Image"
          src={process.env.PUBLIC_URL + '/Uploaded_Images/preview.jpg'}
          alt="image"/>
          
          </div>
        {this.state.ImgList.map((Image,index) => ( //maps throught the state and creates a new array
        <div key={index} className="ImageContainer">
          <img className="Image"
          src={this.state.ImgList[index]} 
          alt="image"/>
          <button className='RemoveBtn' onClick={() => this.Remove(Image)}>x</button>
          </div>
        ))}
        </div>
    </div>
    );
  }
}

export default RatingComponent;
