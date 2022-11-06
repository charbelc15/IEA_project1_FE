import { useEffect, useRef, useState } from 'react';
import './DrawingCanvas.css'

const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;
        
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0,0, canvas.width, canvas.height);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 40;
        contextRef.current = context;

    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
        
    };
    
    const draw = ({nativeEvent}) => {
        if (!isDrawing) {
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };
    
    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false)
    };

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.fillRect(0,0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.fillStyle = "white";
    };

    

    return (
        <div>
                    <canvas 
                    id="canvas"
                    className="canvas-container"
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}>

                    </canvas>
                <div>

                <button onClick={clearCanvas} className="button">
                        Clear
                </button>

                </div>

        
        </div>

    )
}

export default DrawingCanvas;