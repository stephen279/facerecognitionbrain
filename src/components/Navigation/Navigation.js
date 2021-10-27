import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn, name, entries }) => {

	
   if (isSignedIn) {
      return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<p className='f3 link dim blacvk underline pa3 pointer'>{entries} Tokens</p>
				<p className='f3 link dim blacvk underline pa3 pointer'>{name}</p>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim blacvk underline pa3 pointer'> sign out </p>
				<p onClick={() => onRouteChange('about')} className='f3 link dim blacvk underline pa3 pointer'> About</p>
				

			</nav>
		);

	} else {
		return(
			
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p onClick={() => onRouteChange('signin')} className = 'f3 link dim blacvk underline pa3 pointer'> sign in </p>

		<p onClick={() => onRouteChange('home')} className = 'f3 link dim blacvk underline pa3 pointer'> Diagnosis</p>

	</nav>
	);
	}

}

export default Navigation;