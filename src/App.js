
import './App.css';
import React, { useState, useRef } from 'react';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import PredictButton from './components/Predict/PredictButton';
import RetrainButton from './components/Retrain/RetrainButton';
import TranslateButton from './components/Translate/TranslateButton';
import axios from "axios";

function App() {

  function sayHello() {
    axios({
      method: 'get',
      url: 'http://localhost:8000/printme',
      headers: {
          'Accept': 'application/json'
          },
      })
      .then(function(response) {
          alert(response.data.success)
      })
      .catch(function(response) {
          console.error(response);
      });
  } 

  function translate() {
    var textToTranslate = document.getElementById("toTranslate").value;
    axios({
      method: 'get',
      url: 'http://localhost:8000/translate?word='+textToTranslate,
      headers: {
          'Accept': 'application/json'
          },
      })
      .then(function(response) {
        document.getElementById("translated").value=response.data.data;
      })
      .catch(function(response) {
          console.error(response);
      });
  } 

  const [file, setFile] = useState([]);
  const [file2, setFile2] = useState([]);
  const RetrainLabel = useRef()
 
  const predict = e => {
    console.log(e.target.files[0])
    // setFile([...file, e.target.files[0]]);

    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('type', e.target.files[0].type);
    
    axios.post('http://localhost:8000/preprocess_inference', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(response) {
        document.getElementById("label").value="Image label:" + response.data.data;
        document.getElementById("toTranslate").value= document.getElementById("toTranslate").value + response.data.data[2];
        console.log(response.data.data)
      })      
      .catch(function(response) {
        document.getElementById("label").value="cant display file label";
        console.error(response);
      });
    e.preventDefault();
  }

  const retrain = e => {
    // setFile([...file2, e.target.files[0]]);

    let formData = new FormData();
    formData.append('image', e.target.files[0]);      // To change key according to anthony param
    formData.append('type', e.target.files[0].type);

    var label = RetrainLabel.current.value;

    console.log(label.length)
    
    if(label.length>0){
      
      axios.post('http://localhost:8000/re-train?output_label='+label, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(response) {
        alert("Retrain Done! and " + label + " was added")
        console.log(response.data.success);
      })      
      .catch(function(response) {
        alert("Retrain fail");
      });
    
    }
    else{
      alert("Fill Label output value!")
    }
    
      e.preventDefault();
    
  }

  return (
    < >
      <div className='App'>
        <DrawingCanvas> 
        </DrawingCanvas>
      </div>

      <div className='App'>
        <label>
          PREDICTION
        </label>
      </div>
      
      <div className='App'>  
        <PredictButton onClick={() => { }}>
        <input type="file" onChange={predict} ></input>
        </PredictButton>

        <textarea id='label' placeholder="Label" disabled readOnly></textarea>
      </div>

      <div className='App'>
        <label>
          RETRAIN
        </label>
      </div>
      
      <div className='App'>
        <label>
              Retrain Label:
              <input required ref={RetrainLabel} id="retrainlabel" type="text"  />
        </label>

        <RetrainButton onClick={() => { }}>
          Retrain--
        <input type="file" onChange={retrain} ></input>
        </RetrainButton>
      </div>

      <div className='App'>
        <label>
          TRANSLATION
        </label>
      </div>

      <div className='App'>
        <textarea id='toTranslate' placeholder="Text to translate" disabled readOnly></textarea>
        <TranslateButton onClick={translate}>
          Translate
        </TranslateButton>
        <textarea id='translated' placeholder="Translation output" disabled readOnly></textarea>
      </div>

    </>
  );
}

export default App;
