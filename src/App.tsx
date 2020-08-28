import React, { useRef, useEffect } from 'react';
import { init } from './nonogram';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      init(canvas);
    }
  }, []);

  return (
    <div className='App'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
