import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

return (
	
	<div>
	<p className = 'f3'>

	{'Add You Symptoms'};

	</p>
		<form></form>
<div className = 'center'>
	<div className = 'form center pa4 br3 shadow-5'>
		
				
	
      <select  className='f4 pa2 w-390 '  id = "symptoms" onChange={onInputChange} >
					<option value="Select Symptoms">Select Symptoms</option>
					
					<option value="10">Abdominal Pain</option>

					<option value="11">Fever</option>
    
				</select>
				
				    <select id = "age" onChange={onInputChange} >
					<option value="Select age<">Select age</option>
					
					<option value="1981">1981</option>

					<option value="1982">1982</option>
    
      </select>

				
				    <select id = "gender"onChange={onInputChange} >
					<option value="Select gender">Select gender</option>
					
					<option value="male">Male</option>

					<option value="female">Female</option>
    
				</select>
			
    

<button className='w-6 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Diagnose</button>
				
				

			</div>
			
			
		</div>
		<div class="container mt-5">
	<h4 class="mb-3">Diagnosis Result:</h4>
	<div id="root"></div>
</div>
	</div>


	
	

	
	);

}



export default ImageLinkForm;