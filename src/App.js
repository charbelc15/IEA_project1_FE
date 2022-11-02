
import './App.css';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import Model1 from './components/Model1/Model1';
import Model2 from './components/Model2/Model2';
import TranslateButton from './components/Translate/TranslateButton';
import axios from "axios";

function App() {

  // function sayHello() {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:8000/printme',
  //     headers: {
  //         'Accept': 'application/json'
  //         },
  //     })
  //     .then(function(response) {
  //         alert(response.data.success)
  //     })
  //     .catch(function(response) {
  //         console.error(response);
  //     });
  // } 

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


  return (
    < >
      <div className='App'>
        <DrawingCanvas> 
        </DrawingCanvas>
      </div>

      <div className='App'>
        <Model1> 
        </Model1>
      </div>

      <div className='App'>
        <Model2> 
        </Model2>
      </div>


      <div className='App'>
        <h2 id="Translationlabel">
        ------------------------------------------------------ TRANSLATION---------------------------------------------------------
        </h2>
      </div>

      <div className='App'>
        <div className='warning'>
        <textarea id='toTranslate' placeholder="Text to translate"></textarea>
        <TranslateButton onClick={translate}>
          Translate
        </TranslateButton>
        <textarea id='translated' placeholder="Translation output" disabled readOnly></textarea>
        </div>
      </div>
    </>
  );
}

export default App;
