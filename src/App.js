
import './App.css';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import PredictButton from './components/Predict/PredictButton';
import RetrainButton from './components/Retrain/RetrainButton';
import TranslateButton from './components/Translate/TranslateButton';
import { CFormTextarea } from '@coreui/react'

function sayHello() {
  alert('You clicked me!');
} 

function sayBye() {
  alert('You clicked me!');
} 

function App() {
  return (

    < >
      <div className='App'>
        <DrawingCanvas> 
        </DrawingCanvas>
      </div>

      <div className='App'>
        
        <PredictButton onClick={sayHello}>
          Predict
        </PredictButton>

        <CFormTextarea
          placeholder="Readonly textarea"
          aria-label="Readonly textarea example"
          disabled
          readOnly
        ></CFormTextarea>

      </div>

      <div className='App'>
        
        <RetrainButton onClick={sayBye}>
          Retrain
        </RetrainButton>
        
        <TranslateButton>
          Translate
        </TranslateButton>
        
      </div>
    </>
    
  );
}

export default App;
