import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css';
import healthscan from './healthscan.png';

const Logo = () => {

return (
	
	<div className='ma4 mt0'>
		<Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
	 <div className="Tilt-inner pa3"> < img style = {{paddingTop: '5px'}}alt = 'logo' src={healthscan}/></div>
	</Tilt>
	</div>
	);

}

export default Logo;