
import './App.css';
import DrawingCanvas from './components/DrawingCanvas/DrawingCanvas';
import PredictButton from './components/Predict/PredictButton';
import RetrainButton from './components/Retrain/RetrainButton';

function sayHello() {
  alert('You clicked me!');
} 

function sayBye() {
  alert('You clicked me!');
} 

function App() {
  return (

    <>
      <div className='App'>
        <DrawingCanvas> 
        </DrawingCanvas>
      </div>

      <div className='App'>
        <PredictButton onClick={sayHello}>
          Predict
        </PredictButton>

        {/* for same row buttons */}
        {/* <PredictButton onClick={sayHello}>
          Predict
        </PredictButton> */}
      </div>

      <div className='App'>
        <RetrainButton onClick={sayBye}>
          Retrain
        </RetrainButton>
      </div>
    </>
    
  );
}

export default App;
