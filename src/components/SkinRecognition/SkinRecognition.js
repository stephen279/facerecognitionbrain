import React from 'react';
import './SkinRecognition.css';

const SkinRecognition = () => {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
           <p>Image Result:</p>
       <div id = "result" ></div>
      </div>
    </div>
  );
}

export default SkinRecognition;