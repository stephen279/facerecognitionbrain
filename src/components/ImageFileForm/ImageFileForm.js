import React from 'react';
import './ImageFileForm.css';


const ImageFileForm = ({fileSelectedHandler, fileUploadHandler}) => {

return (
	
	<div>
	<p className = 'f3'>

			
			  <h1 class="f3 lh-copy">{'Please upload your image for Skin Diagnoses'}</h1>
        
         
			<div className='center'>
				
				<div className='form_transparent center pa4 br3 shadow-2'>
					
               {/*<input className='f4 pa2 w-390 center' type = 'file' />*/}

               
                <input  className='f4 pa2 w-70 center' type="file" onChange={fileSelectedHandler} />
					<button
						   className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={fileUploadHandler} >Check Image</button>

               {/*<button className='w-6 grow f4 link ph3 pv2 dib white bg-light-purple' >Test Image</button>*/}
				

			</div>
			
		</div>

	</p>
<div className = 'center'>
	<div id="root"></div>
</div>
	</div>

	
	);

}



export default ImageFileForm;