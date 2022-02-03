import React from 'react';
import './ScoreRecognition.css';

const ScoreRecognition = () => {
  return (
    <div className='center ma'>
        <div className='f3 lh-copy'>
        <h1 class="f3 lh-copy">HealthScore Results:</h1>

        
        <article id = "mycard" class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
  <h1 id = "symptoms_confidence" class="f1 bg-near-white br2 br--top black-60 mv0 pv1 ph3" ></h1>
  <div class="pa2 bt b--black-10">
    <p id = "score_result"  class="f9 f4-ns lh-copy measure"> Result will show here .
             
             
    </p><p class="f6 f5-ns lh-copy measure">/1000</p>
            
               

       </div>
          

  
</article>

     

      
      </div>
    </div>
  );
}

export default ScoreRecognition;