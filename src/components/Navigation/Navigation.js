import React from 'react'

const Navigation = ({ onRouteChange }) => {

return (
	<nav style = {{ display: 'flex', justifyContent: 'flex-end'}}>


	<p onClick={() => onRouteChange('about')} className = 'f3 link dim blacvk underline pa3 pointer'> About</p>
		<p onClick={() => onRouteChange('home')} className = 'f3 link dim blacvk underline pa3 pointer'> Diagnosis</p>
<p onClick={() => onRouteChange('signin')} className = 'f3 link dim blacvk underline pa3 pointer'> sign out </p>

	</nav>
	);

}

export default Navigation;