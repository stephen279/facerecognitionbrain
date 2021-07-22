import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

return (
	
		<div>
	<p className = 'f3'>

			
			  <h1 class="f3 lh-copy">{'Please Select Your Symptoms'}</h1>
        
         
			<div className='center'>
				
				<div className='form_transparent center pa4 br3 shadow-2'>
					
               {/*<input className='f4 pa2 w-390 center' type = 'file' />*/}

	<select id="symptoms" class="w-80 db h2 f4 bg-near-white ba b--sliver gray" name="" onChange={onInputChange} >
    
					<option value="Select Symptoms"> Symptoms one</option>
					
					<option value="10">Abdominal Pain</option>

						<option value="11">Fever</option>
							<option value="12">other</option>
    
					</select>

					<select id="symptoms1" class="w-80 db h2 f4 bg-near-white ba b--sliver gray" name="" onChange={onInputChange} >
    
					<option value="Select Symptoms"> Symptoms two </option>
					
					<option value="10">Abdominal Pain</option>

						<option value="11">Fever</option>
							<option value="12">other</option>
    
					</select>

						<select id="symptoms2" class="w-80 db h2 f4 bg-near-white ba b--sliver gray" name="" onChange={onInputChange} >
    
					<option value="Select Symptoms"> Symptoms three </option>
					
					<option value="10">Abdominal Pain</option>

						<option value="11">Fever</option>
						
						<option value="12">other</option>
    
					</select>
					
				
				<select id="age" class="w-80 db h2 f4 bg-near-white ba b--sliver gray" name="" onChange={onInputChange} >
				    
					<option value="Select age<"> age</option>
					
					<option value="1981">1981</option>

					<option value="1982">1982</option>
    
				</select>
				
				

		<select id="gender" class="w-80 db h2 f4 bg-near-white ba b--sliver gray" name="" onChange={onInputChange} >
				
					<option value="Select gender"> gender</option>
					
					<option value="male">Male</option>

					<option value="female">Female</option>
    
				</select>
				
		
<p> &nbsp; </p>

<button className='w-6 grow f6 link ph3 pv2 dib white bg-light-purple' id="submit" onClick={onButtonSubmit}>Diagnose</button>
				
				
			</div>
			
		</div>

	</p>
<div className = 'center'>
	<div id="root"></div>
</div>
	</div>

	

	
	);

}



export default ImageLinkForm;