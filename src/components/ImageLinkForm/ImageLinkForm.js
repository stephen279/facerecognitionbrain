import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

return (
	
	<div>
	<p className = 'f3'>

	{'The healthscan app will detect abnormalitys on your skin'};

	</p>
<div className = 'center'>
	<div className = 'form center pa4 br3 shadow-5'>
		<input className='f2 pa2 w-390 center' type = 'text' onChange ={onInputChange}/>


				<button className='w-6 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
				

			</div>
			
		</div>
		<div class="container mt-5">
	<h4 class="mb-3">React: Upload Handler</h4>
	<div id="root"></div>
</div>
	</div>

	
	);

}



export default ImageLinkForm;