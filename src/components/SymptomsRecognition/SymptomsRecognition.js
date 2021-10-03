import React from 'react';
import './SymptomsRecognition.css';

const SymptomsRecognition = () => {
  return (
    <div className='center ma'>
        <div className='f3 lh-copy'>
        <h1 class="f3 lh-copy">Symptoms Results Accuracy:</h1>

        
        <article id = "mycard" class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <h1 id = "symptoms_confidence" class="f1 bg-near-white br2 br--top black-60 mv0 pv1 ph3" ></h1>
  <div class="pa2 bt b--black-10">
    <p id = "symptoms_result"  class="f6 f5-ns lh-copy measure"> Result will show here.
             
             
    </p>
             <p id = "specialist"  class="f6 f5-ns lh-copy measure"> 
    
      
    </p>
            
     <p id = "symptoms_explain"  class="f6 f5-ns lh-copy measure"> 
    
      
    </p>
          </div>
          

  
</article>

       <article id = "mycard" class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <h1 id = "symptoms_confidence_1" class="f1 bg-near-white br2 br--top black-60 mv0 pv1 ph3" ></h1>
  <div class="pa2 bt b--black-10">
    <p id = "symptoms_result_1"  class="f6 f5-ns lh-copy measure"> Result 2 will show here.
    
      
    </p>
  </div>
  
</article>

      
      </div>
    </div>
  );
}

export default SymptomsRecognition;