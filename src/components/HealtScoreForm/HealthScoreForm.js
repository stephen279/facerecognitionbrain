import React from 'react';
import './HealthScoreForm.css';
import { useEffect } from 'react';

const parse = require('html-react-parser');











        

const HealthScoreForm = ({ onInputChange, onHSButtonSubmit , hsSelectedHandler ,hshandleFormSubmit}) => {


const scriptTag = document.createElement('script');

   scriptTag.src = "https://code.jquery.com/jquery-1.11.1.min.js";
           scriptTag.src = "https://developer.zivacare.com/connect.js";
        scriptTag.async = true;

        document.body.appendChild(scriptTag);
      

var url_string = window.location;
var url = new URL(url_string);
var code = url.searchParams.get("code");

//document.getElementById("code").innerHTML = "dddddd";
  // document.getElementById("code").value = code;
   console.log(code)
//getAccessToken(code);



   

   return (

    


   

      <div className="score">





         
         
         



         


         
         <p classname='f3'>
            <h1 className="f3 lh-copy">{"please answer below Questions for your Health Score"}</h1>
<p><a href="https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=fdc30a61126f1c849b3b5c59fb7a8d7200d745a5eb38c3f0c898d069a1c3adc4&redirect_uri=http://onevitals.io&scope=user.info,user.metrics&state=1234zyx&selecteduser=17539818/">Connect to Your Withings </a></p>
            <div className='center'>
               
               <div className='form_trnsparent center pa4 br3 shadow-2'>
                     
                     <p>
                      
                     <input className='f4 pa2 w-70 center' type="text" id='hs_age' name="hs_age" placeholder="Age" onChange={hsSelectedHandler} />
                     
                     <br></br> 
             
                      
                     <input className='f4 pa2 w-70 center' type="text" id='hs_sex' name="hs_sex" placeholder="Sex"  onChange={hsSelectedHandler}/>

                      <br></br> 
                     
                           <input className='f4 pa2 w-70 center' type="text" id='hs_height' name="hs_height" placeholder="Height CM" onChange={hsSelectedHandler}/>
                     
                     <br></br> 
             
                      
                     <input className='f4 pa2 w-70 center' type="text" id='hs_weight' name="hs_weight" placeholder="Weight KG" onChange={hsSelectedHandler}/>
                     
                     <br></br> 

                                  <input className='f4 pa2 w-70 center' type="text" id='hs_fat' name="hs_fat" placeholder="Fat Percentage" onChange={hsSelectedHandler}/>
                     
                     <br></br> 
                     
                         <input className='f4 pa2 w-70 center' type="text" id='hs_dpb' name="hs_dpb" placeholder="Diastolic Blood pressure" onChange={hsSelectedHandler}/>
                     
                     <br></br> 
                     
                         <input className='f4 pa2 w-70 center' type="text" id='hs_sbp' name="hs_sbp" placeholder="Systolic Blood Pressure" onChange={hsSelectedHandler}/>
                     
                        <br></br> 

                       <input className='f4 pa2 w-70 center' type="text" id='hs_rhr' name="hs_rhr" placeholder="Resting heart rate" onChange={hsSelectedHandler}/>
                     
                        <br></br> 

                          <input className='f4 pa2 w-70 center' type="text" id='hs_fbg' name="hs_fbg" placeholder="Fasting Blood Glucose" onChange={hsSelectedHandler}/>
                     
                        <br></br> 
             
                     
                     Tick if you smoke now?
                    <input className='f4 pa2 w-10 center' type="checkbox" id="hs_now" name="hs_now"  value="1" placeholder="Smoke Now?" onChange={hsSelectedHandler} /> 

               
                      
                        <br></br> 
             
                    Tick if you ever smoke?
                    <input className='f4 pa2 w-10 center' type="checkbox" id="hs_evr" name="hs_evr"  value="1" placeholder="Ever Smoke ?" onChange={hsSelectedHandler} /> 

               
                      
                        <br></br> 
                  </p>



                 
                  
                

                  <button className='f7 link dim ph3 pv1 mb1 dib white bg-light-purple' id="submit" onClick={hshandleFormSubmit}>Check Score</button>
				

               </div>
            </div>
         </p>




      </div>


   



);
   
}

export default HealthScoreForm;