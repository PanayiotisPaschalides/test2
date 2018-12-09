import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { Modal} from 'react-bootstrap';
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
            testlist: [],
            title: '',
            type: '',
            PreviewImage: false,
            selectedImg: 0,
            SelectShow: false,
            description: '',
            cents: 0,
            pounds: 0

            

        }
        this.AddImages = this.AddImages.bind(this);
        this.DisplayImages = this.DisplayImages.bind(this);
        this.sleep = this.sleep.bind(this);
        this.Remove = this.Remove.bind(this);
        this.upload = this.upload.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this); 
        this.onChangeDropDown = this.onChangeDropDown.bind(this);
        this.SelectImage = this.SelectImage.bind(this);
        this.SelectOpen = this.SelectOpen.bind(this);
        this.SelectClose = this.SelectClose.bind(this);
        this.OnDescriptionChange = this.OnDescriptionChange.bind(this);
        this.OnPoundsChange = this.OnPoundsChange.bind(this);
        this.OnCentsChange = this.OnCentsChange.bind(this);
    }

    SelectClose() {
        this.setState({ SelectShow: false});
    }
    SelectOpen() {
        this.setState({ SelectShow: true});
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
        
        console.log(this.state.type)
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
        this.setState({ImgList : display, Images: files, PreviewImage: false, selectedImg: 0})
      }
      upload(){
          console.log(this.state.Images.length)
        for (var i = 0; i < this.state.Images.length; i++) {
        const data = new FormData()
        data.append('file', this.state.Images[i], this.state.Images[i].name)
        
        axios.post('/api/Upload', data)
        
      }
    }
    onChangeTitle(event){
        this.setState({title: event.target.value})
    }
    onChangeDropDown(event){
        this.setState({type: event.target.value})
    }
    SelectImage(index){
        this.setState({selectedImg : index, PreviewImage: true})
        this.SelectClose();
    }
    OnDescriptionChange(event){
        this.setState({description: event.target.value})
    }
    OnPoundsChange(event){
        const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({pounds: event.target.value})
      }
    }
    OnCentsChange(event){
        const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({cents: event.target.value})
      }
    }
    render() {
        
        
    return (



      <div >
          <div className='StartingSpacer'></div>

          <div className='Section'>
          <div className='SectionTitle'>
          <label className='SectionText'>Ad Title</label>
          </div>
          <div className='SectionBody'>
          <input type="text" name="title" placeholder="Enter ad Title" value={this.state.title} onChange={this.onChangeTitle}/>
          </div>
          </div>

          <div className='Spacer'></div>

          <div className='Section'>
          <div className='SectionTitle'>
          <label className='SectionText'>Ad type</label>
          </div>
          <div className='SectionBody'>
          <select className='DropDown' onClick={this.onChangeDropDown}>
            <option value="Electrical" className='DropDownOption'>Electrical</option>
            <option value="Gardening" className='DropDownOption'>Gardening</option>
            <option value="Cars" className='DropDownOption'>Cars</option>
            <option value="Motorbikes" className='DropDownOption'>Motorbikes</option>
            <option value="Sports" className='DropDownOption'>Sports</option>
            <option value="Clothing" className='DropDownOption'>Clothing</option>
            <option value="audi" className='DropDownOption'>Education</option>
         </select>
          </div>
          </div>

          <div className='Spacer'></div>

          <div className='Section'>
          <div className='SectionTitle'>
          <label className='SectionText'>Add Images</label>
          </div>
          <div className='SectionBody'>
          <div className='ImagesContainer' >
        <div><input  type="file" multiple onChange={this.AddImages} ref={ImageInput => this.ImageInput = ImageInput} /></div>
        
        <div onClick={()=> this.ImageInput.click() } className="ImageContainer">
        <img className="Image"
          src={process.env.PUBLIC_URL + '/Uploaded_Images/preview.jpg'} 
          alt=""/>
          
          </div>
        {this.state.ImgList.map((Image,index) => ( //maps throught the state and creates a new array
        <div key={index} className="ImageContainer">
          <img className="Image"
          src={this.state.ImgList[index]} 
          alt=""/>
          <button className='RemoveBtn' onClick={() => this.Remove(Image)}>x</button>
          </div>
        ))}
        </div>
          </div>
          </div>

          <div className='Spacer'></div>

          <div className='Section'>
          <div className='SectionTitle'>
          <label className='SectionText'>Select Ad Display Image</label>
          </div>
          <div className='SectionBody' style={{textAlign: "center"}}>
          <div onClick={this.SelectOpen} className="ImageContainer">
          {this.state.PreviewImage ? <img className="Image"
          src={this.state.ImgList[this.state.selectedImg]} 
          alt=""/> : <button className='SelectBtn'>+</button> }
          </div>
          </div>
          </div>

          <div className='Spacer'></div>

            <div className='Section'>
            <div className='SectionTitle'>
            <label className='SectionText'>Description</label>
            </div>
            <div className='SectionBody'>
            <textarea className='Description' placeholder='Type Products Description' value={this.state.description} onChange={this.OnDescriptionChange}></textarea>
            </div>
            </div>

          <Modal show={this.state.SelectShow} onHide={this.SelectClose}>
            <button className='Modal-Close-Btn' onClick={this.SelectClose}>X</button>
              <Modal.Header> 
                  <label className='Modal-Title'>Select Image</label>
                  
              </Modal.Header>
              <Modal.Body>
              {this.state.ImgList.map((Image,index) => ( //maps throught the state and creates a new array
            <div key={index} className="ImageContainer" onClick={()=> this.SelectImage(index) }>
            <img className="Image"
            src={this.state.ImgList[index]} 
            alt=""/>
            </div>
        ))}
              
              </Modal.Body> 
            </Modal>

            <div className='Spacer'></div>

            <div className='Section'>
            <div className='SectionTitle'>
            <label className='SectionText'>Sell For</label>
            </div>
            <div className='SectionBody'>
            
            <div className='price'>
            <label className='PriceSymbol'>£</label>
            <input type="number" name="pounds" placeholder="00" value={this.state.pounds} onChange={this.OnPoundsChange} step='any' min='1'/>
            <label className='PriceSeparator'>.</label>
            <input type="number" name="cents" placeholder="00" value={this.state.cents} onChange={this.OnCentsChange} step='any' min='1' max='99'/>
            </div>
            </div>
            </div>
    </div>
    );
  }
}

export default RatingComponent;
