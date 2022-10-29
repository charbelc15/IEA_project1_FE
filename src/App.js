
import './App.css';
import React, { useState } from 'react';
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

  const [file, setFile] = useState([]);
 
  const predict = e => {
    console.log(e.target.files[0])
    setFile([...file, e.target.files[0]]);

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
        console.log(response.data.data)
      })      
      .catch(function(response) {
        document.getElementById("label").value="cant display file label";
        console.error(response);
      });
  }


  return (
    < >
      <div className='App'>
        <DrawingCanvas> 
        </DrawingCanvas>
      </div>

      <div className='App'>  
        <PredictButton onClick={() => { }}>
          PREDICT--
        <input type="file" onChange={predict} ></input>
        </PredictButton>

        <textarea id='label' placeholder="Label" disabled readOnly></textarea>
      </div>

      <div className='App'>
        <RetrainButton onClick={sayHello}>
          Retrain
        </RetrainButton>
        
        <TranslateButton onClick={sayHello}>
          Translate
        </TranslateButton>
      </div>
    </>
  );
}

export default App;
