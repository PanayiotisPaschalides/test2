import React, { Component } from 'react';
class error extends Component {
  constructor(){
    super();
    this.DownloadFile = this.DownloadFile.bind(this);
  }
  DownloadFile(){
    console.log(window.location.href.replace('http://localhost:3000/Download/',''))
    const name = 'file.jpg'
    let url = process.env.PUBLIC_URL + '/Uploaded_Images/' + window.location.href.replace('http://localhost:3000/Download/','');
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
  }
  render() {
    return (
      <html>
        <head>
            <title>Error</title>
            
        </head>
        <body>
           <button onClick={this.DownloadFile}>Download</button>
        </body>
    </html>
    );
  }
}

export default error;
