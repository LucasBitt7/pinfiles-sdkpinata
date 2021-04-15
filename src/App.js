import './App.css';
import React, { Component } from "react";
import './yourfile.png';


const yourPinataApiKey = 'e42f603260fa1afab855';
const yourPinataSecretApiKey = '5d6ef8b9d55ff154f98870e74ba3d3516c911c808cbb8060fc0770ee6d3e4561';
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(yourPinataApiKey , yourPinataSecretApiKey);


pinata.testAuthentication().then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});
class App extends Component {
  constructor(props){

    super(props);
    
    this.state = {
           data: '',
           isLoading: false,
     };
     this.click = this.click.bind(this);  
};     handleFileUpload = event => {
    console.log(event.target.files[0].name);
  }; 

    click() {
      const yourPinataApiKey = 'e42f603260fa1afab855';
      const yourPinataSecretApiKey = '5d6ef8b9d55ff154f98870e74ba3d3516c911c808cbb8060fc0770ee6d3e4561';
      const pinataSDK = require('@pinata/sdk');
      const pinata = pinataSDK(yourPinataApiKey , yourPinataSecretApiKey);
      let fs = require('graceful-fs');
 
     
      
      this.setState({ isLoading: true });
    
     
      const readableStreamForFile = fs.createReadStream('yourfile.png');
      const options = {
          pinataMetadata: {
              name: 'MyCustomName',
              keyvalues: {
                  customKey: 'customValue',
                  customKey2: 'customValue2'
              }
          },
          pinataOptions: {
              cidVersion: 0
          }
      };
      pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
          //handle results here
          console.log(result);
      }).catch((err) => {
          //handle error here
          console.log(err);
      });}

  render() {
  return (     
    <div className="App">
      <header className="App-header">
      <div className="app-col-2">
      <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{ display: "none" }}
          multiple={false}
        />
        <button onClick={() => this.refs.fileInput.click()}>Upload NFT</button></div> 
       <div className="app-col-2">
      <button type="button" className="btn btn-success" onClick={this.click} disabled={this.state.isLoading}>Save</button>
      {this.state.data}
      </div>
      </header>

    </div>
  );
}

}
export default App;
