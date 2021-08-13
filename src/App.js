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

import SymptomsRecognition from './components/SymptomsRecognition/SymptomsRecognition';

import Registers from './components/Registers/Registers';



//const dotenv = require('dotenv').config()








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
			symptoms: '',
			symptoms1: '',
			symptoms2: '',
			age: '',
			gender:'',
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

		if (event.target.id == 'symptoms') {
				
			this.setState({ symptoms: event.target.value });
			
			
		} else if (event.target.id == 'symptoms1') {
				
			this.setState({ symptoms1: event.target.value });
			
			
		} else if (event.target.id == 'symptoms2') {
				
			this.setState({ symptoms2: event.target.value });
			
			
		}
		else if (event.target.id == 'age') {
			this.setState({ age: event.target.value });
			console.log("age" + this.state.age);
		} else if (event.target.id == 'gender') {
			this.setState({ gender: event.target.value });
			console.log("gender"+this.state.gender);
		}
		//this.setState({ symptoms: event.target.id });
		//this.setState({ age: event.target.id });


	

		
		

	};

	onButtonSubmit = (event) => {
		console.log("symptoms" + this.state.symptoms);
		console.log("symptoms1" + this.state.symptoms1);
		console.log("symptoms2" + this.state.symptoms2);

		
		

		
		console.log("age" + this.state.age);
		console.log("gender" + this.state.gender);
		// set imageUrl state
	

		const symptomsformData = new FormData();
	

		symptomsformData.append('data', this.state.input);
		var symptoms = this.state.symptoms;
		var symptoms1 = this.state.symptoms1;
		var symptoms2 = this.state.symptoms2;

		let age = this.state.age;

		let gender = this.state.gender;

		/*
			axios.get('https://healthservice.priaid.ch/diagnosis?symptoms=['+symptoms+']&gender='+gender+'&year_of_birth='+age+'&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN0ZXBoZW5ob2xsYW5kMzc5QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDg2NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjAtMDgtMDEiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2MjY5NDM1MjYsIm5iZiI6MTYyNjkzNjMyNn0.Lcs6Dv3uwcVq0c6le3Ogcy7uYOp6n0RRq3y9sBJ7764&format=json&language=en-gb', symptomsformData).then((res) => {
					console.log(res.data[0]);
				console.log(res.data[0].Issue.Name);
				console.log(res.data[0].Issue.Accuracy);
				console.log(res.data[0].Issue.Gender);
				


				let name = res.data[0].Issue.Name;
				let accuracy = res.data[0].Issue.Accuracy+ "%";
				let geder = res.data[0].Issue.Gender;
				


		//	console.log(res.data.name);

		//	let confidence_new = (Math.round(res.data.confidence * 100) / 100).toFixed(2)*100 + "%";
			// alert(res);
			document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;
		});

		*/

	/*	app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) =>
				// calculateFaceLocation function pass to displaybox as is parameter
				this.displayFaceBox(this.calculateFaceLocation(response))
			)
			// if error exist console.log error
			.catch((err) => console.log(err));
		
		*/
		

		

const options = {
  method: 'GET',
  url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
  params: {gender: gender, year_of_birth: age, symptoms: '['+symptoms+','+symptoms1+']', language: 'en-gb'},
 headers: {
    'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd',
    'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com'
  }
};


axios.request(options).then(function (response) {
	console.log(response.data[0].Issue.Name);
	let name = response.data[0].Issue.Name;
	let accuracy = response.data[0].Issue.Accuracy;
	let name_1 = response.data[1].Issue.Name;
	let accuracy_1= (Math.round(response.data[1].Issue.Accuracy * 100) / 100).toFixed(0)  ;
	//let accuracy_1= response.data[1].Issue.Accuracy+ "%";

	let geder = response.data[0].Issue.Gender;

	console.log(response.data[0]);

	document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;

			

				document.getElementById('symptoms_result_1').innerHTML = name_1;
			document.getElementById('symptoms_confidence_1').innerHTML = accuracy_1;
}).catch(function (error) {
	console.error(error);
});
/*
axios.request(options).then(function (response) {
	console.log("new response" + response.data[0].Issue);
	let name = response.data[0].Issue.Name;
	let accuracy = response.data[0].Issue.Accuracy+ "%";
	let geder = response.data[0].Issue.Gender;
	let all = response.data;
	console.log(all);
	document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;
}).catch(function (error) {
	console.error(error);
});
		*/
		
		
				
				


		//	console.log(res.data.name);

		//	let confidence_new = (Math.round(res.data.confidence * 100) / 100).toFixed(2)*100 + "%";
			// alert(res);
			
		
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
			console.log(res.data.confidence);
			console.log(res.data.name);

			let confidence_new = (Math.round(res.data.confidence * 100) / 100).toFixed(2)*100 + "%";
			// alert(res);
			document.getElementById('result').innerHTML = res.data.name;
				document.getElementById('confidence').innerHTML = confidence_new;
		});
	};

	onRouteChange = (route) => {

		console.log("ROUTE IS "+route)
		if (route == 'signin') {

			console.log("result -------"+route);
			
			fetch('https://protected-gorge-67490.herokuapp.com/')
			
					.then(response => response.text())
					.then(data => console.log(data));

				
					//  return res.json()
			if (data == "session") {
				this.setState({ route: 'home' })
			}
				
   
		
		//	this.setState({ route: route });
		//	console.log("route is signin");
		//	this.setState({ route:'signin'})
		}
	};

	//test
	/*onRouteChange = (route) => {
		if (route = 'home') {
			fetch('https://protected-gorge-67490.herokuapp.com/', {
				method: 'get',
     
			}).then(response => response.json())



				.then
			
			console.log("response "+response);
					
					if (response == "session") {
						this.state.route === 'home'
					} else {
						this.state.route === 'signin'
					}
              
				

		}
	}*/

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
					
						<Rank
							//
							name={this.state.user.name}
						//  entries={this.state.user.entries}
						/>

						<ImageLinkForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
								
								
						
						/>
						
						<SymptomsRecognition />


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
				)  : this.state.route === 'diagnoses' ? (
							<SymptomsRecognition loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
							<Registers loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
