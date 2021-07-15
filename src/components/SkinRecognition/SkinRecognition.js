import React from 'react';
import './SkinRecognition.css';

const SkinRecognition = () => {
  return (
    <div className='center ma'>
        <div className='f3 lh-copy'>
        <h1 class="f3 lh-copy">Image Result:</h1>

        
        <article id = "mycard" class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <h1 id = "confidence" class="f1 bg-near-white br2 br--top black-60 mv0 pv1 ph3" >confidence</h1>
  <div class="pa2 bt b--black-10">
    <p id = "result"  class="f6 f5-ns lh-copy measure"> Result will so here
    
      
    </p>
  </div>
</article>

      
      </div>
    </div>
  );
}

export default SkinRecognition;