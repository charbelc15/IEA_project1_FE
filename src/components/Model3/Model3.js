import React, { useState, useRef } from 'react';
import PredictButton from '../Predict/PredictButton';
import RetrainButton from '../Retrain/RetrainButton';
import axios from "axios";
import './Model3.css';



const Model3 = () => {
    
    const [BB_image, setBBImage] = useState("");
    const [Cropped_image, set_Cropped_Image] = useState("");
    const [Delated_image, set_Delated_Image] = useState("");
    const [Resized_image, set_Resized_Image] = useState("");

    const RetrainLabel3 = useRef()
    const arrow = require('../../right-arrow.png')

    const predict = e => {
    console.log("Uploaded File: ",e.target.files[0])
    // setFile([...file, e.target.files[0]]);

    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('type', e.target.files[0].type);
    
    axios.post('http://localhost:8000/preprocess_inference_model1', formData, {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        }
        })
        .then(function(response) {
        getBBImage()
        getCroppedImage()
        getDelatedImage()
        getResizedImage()
        console.log("FastAPI model3 response", response)
        // response.data.data="['H']"
        document.getElementById("ImagelabelModel3").value="Model3 label:" + response.data.data;
        document.getElementById("toTranslate").value= document.getElementById("toTranslate").value + response.data.data[2];
        console.log(response.data.data)
        })      
        .catch(function(response) {
        document.getElementById("ImagelabelModel3").value="cant display file label";
        console.error(response);
        });
    e.preventDefault();
    }

    const retrain = e => {
    // setFile([...file2, e.target.files[0]]);

    let formData = new FormData();
    formData.append('image', e.target.files[0]);      // To change key according to anthony param
    formData.append('type', e.target.files[0].type);

    var label = RetrainLabel3.current.value;

    console.log(label.length)
    
    if(label.length>0){
        
        axios.post('http://localhost:8000/re-train1?output_label='+label, formData, {
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

    const getBBImage = () => {
    axios.get("http://localhost:8000/send_BB_Image", {
        'accept': 'application/json'
        })
        .then((res) => {
        console.log(res.data.data )
        const base64 = res.data.data
        setBBImage(base64)
    })
    }

    const getCroppedImage = () => {
        axios.get("http://localhost:8000/send_Cropped_Image", {
            'accept': 'application/json'
            })
            .then((res) => {
            console.log(res.data.data )
            const base64 = res.data.data
            set_Cropped_Image(base64)
    })
    }
    
    const getDelatedImage = () => {
        axios.get("http://localhost:8000/send_Delated_Image", {
            'accept': 'application/json'
            })
            .then((res) => {
            console.log(res.data.data )
            const base64 = res.data.data
            set_Delated_Image(base64)
    })
    }

    const getResizedImage = () => {
        axios.get("http://localhost:8000/send_Resized_Image", {
            'accept': 'application/json'
            })
            .then((res) => {
            console.log(res.data.data )
            const base64 = res.data.data
            set_Resized_Image(base64)
    })
    }

    return(
    <div>
        
        <div className='App'>
            <h2 id="ModelLabel">
            ---------------------------------
            {/* <img id="AI" src={require('../../AI.png')}/>  */}
            ------------------------------MODEL 3---------------------------------
            {/* <img id="AI" src={require('../../AI2.png')}/> */}
             ---------------------------------
            </h2>
        </div>
        
        
        <div className='App'>
            <h3 id="PredictionLabel">
            -------------------------- PREDICTION --------------------------
            </h3>
        </div>
      
        <div className='warning'>  
            <PredictButton onClick={() => { }}>
            <input type="file" onChange={predict} ></input>
            </PredictButton>

            <textarea id='ImagelabelModel3' placeholder="Model 3 label" disabled readOnly></textarea>
        </div>
      
        <div className='App'>
            <img id="image" src={`data:image/png;base64,${BB_image}`} alt="" />
            <img id="arrow" src={arrow} alt=""/>

            <img id="image" src={`data:image/png;base64,${Cropped_image}`} alt="" />
            <img id="arrow" src={arrow} alt=""/>

            <img id="image" src={`data:image/png;base64,${Delated_image}`} alt="" />
            <img id="arrow" src={arrow} alt=""/>

            <img id="image" src={`data:image/png;base64,${Resized_image}`} alt="" />

        </div>

        
        
        <div className='App'>
            <h3  id="RetrainLabel">
            -------------------------- RETRAIN --------------------------
            </h3>
        </div>
      
        <div className='warning'>
            <label>
                Retrain Label:
                <input required ref={RetrainLabel3} id="retrainlabel3" type="text"  />
            </label>

            <RetrainButton onClick={() => { }}>
            <input type="file" onChange={retrain} ></input>
            </RetrainButton>
        </div>
     

    </div>
     
    )
}

export default Model3;