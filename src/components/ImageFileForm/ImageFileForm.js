import React from 'react';
import './ImageFileForm.css';


const ImageFileForm = ({fileSelectedHandler, fileUploadHandler}) => {

return (
	
	<div>
	<p className = 'f3'>

         {'Please upload your image'}
         
         <div className = 'center'>
	<div className = 'form center pa4 br3 shadow-5'>
               {/*<input className='f4 pa2 w-390 center' type = 'file' />*/}

               
                <input type="file" onChange={fileSelectedHandler} />
               <button onClick={fileUploadHandler} >Check Image</button>

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