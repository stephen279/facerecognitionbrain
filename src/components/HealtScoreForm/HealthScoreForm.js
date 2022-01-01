import React from 'react';
import './HealthScoreForm.css';

const HealthScoreForm = ({ onInputChange, onHSButtonSubmit , hsSelectedHandler ,hshandleFormSubmit}) => {



   

   return (

      <div>
         <p classname='f3'>
            <h1 className="f3 lh-copy">{"please answer below Questions for your Health Score"}</h1>

            <div className='center'>
               <div className='form_trnsparent center pa4 br3 shadow-2'>

                     <p>
                      
                     <input className='f4 pa2 w-70 center' type="text" id='hs_age' name="hs_age" placeholder="Age" onChange={hsSelectedHandler} />
                     
                     <br></br> 
             
                      
                     <input className='f4 pa2 w-70 center' type="text" id='hs_sex' name="hs_sex" placeholder="Sex" />

                      <br></br> 
                     
                           <input className='f4 pa2 w-70 center' type="text" id='height' name="height" placeholder="Height" />
                     
                     <br></br> 
             
                      
                     <input className='f4 pa2 w-70 center' type="text" id='weight' name="weight" placeholder="Weight" />
                     
               
                  </p>

                 
                  
                

                  <button className='f7 link dim ph3 pv1 mb1 dib white bg-light-purple' id="submit" onClick={hshandleFormSubmit}>Check Score</button>
				

               </div>
            </div>
         </p>




      </div>


   



);
   
}

export default HealthScoreForm;