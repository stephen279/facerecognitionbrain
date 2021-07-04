import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import SkinRecognition from './components/SkinRecognition/SkinRecognition';

import Logo from './components/Logo/Logo';

import Clarifai from 'clarifai';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import ImageFileForm from './components/ImageFileForm/ImageFileForm';

import Rank from './components/Rank/Rank';

import SignIn from './components/SignIn/SignIn';

import Registers from './components/Registers/Registers';

import Diagnosis from './components/Diagnosis/Diagnosis';

import Particles from 'react-particles-js';

import axios from 'axios';

//import FaceDetect from "./components/FaceDetect/FaceDetect";

import './App.css';

const particlesOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
	apiKey: 'e94b16ebf46741309ecb3eeef61e76a3'
});

class App extends Component {
	constructor() {
		super(); // to use this

		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
			route: 'home',
			selectedFile: null
		};
	}

	loadUser = (data) => {
	 console.log("data passed to loadUser"+data)
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
	

/*
	componentDidMount() {
		fetch('http://localhost:3000').then(function (response) {
        return response.json();
      }).then(console.log);
	}*/

	calculateFaceLocation = (data) => {
		console.log('inside face Location');
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		};
	};

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
		//console.log(event.target.value);
	};

	onButtonSubmit = () => {
		// set imageUrl state
		this.setState({ imageUrl: this.state.input });
		console.log({ imageUrl: this.state.input });

		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) =>
				// calculateFaceLocation function pass to displaybox as is parameter
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			// if error exist console.log error
			.catch((err) => console.log(err));
	};

	fileSelectedHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	fileUploadHandler = () => {
		const formData = new FormData();
		formData.append('data', this.state.selectedFile, this.state.selectedFile.name);
		axios.post('https://www.nyckel.com/v0.9/functions/edx2ml1gbri4n34d/invoke', formData).then((res) => {
			console.log(res.data.name);
			// alert(res);
			document.getElementById('result').innerHTML = res.data.name;
		});
	};

	onRouteChange = (route) => {
		this.setState({ route: route });
	};

	render() {
		return (
			<div className="App">
				{/*<input type="file" onChange={this.fileSelectedHandler} />
     <button onClick={this.fileUploadHandler} >Check </button>  */}

				<Particles className="particles" params={particlesOptions} />

				{this.state.route === 'home' ? (
					<div>
						<Navigation onRouteChange={this.onRouteChange} />
						<Logo />
						<Diagnosis />
						   <Rank
				 //
				    name={this.state.user.name}
              //  entries={this.state.user.entries}
              />

						{/*
     <ImageLinkForm 
     onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit} />
    */}
						<ImageFileForm
							fileSelectedHandler={this.fileSelectedHandler}
							fileUploadHandler={this.fileUploadHandler}
						/>

						<SkinRecognition />

						<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
					</div>
				) : this.state.route === 'signin' ? (
						<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						
						/>
				) : (
							<Registers loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
