import React, { Component,useEffect, useState } from 'react';

import Navigation from './components/Navigation/Navigation';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import SkinRecognition from './components/SkinRecognition/SkinRecognition';

import Logo from './components/Logo/Logo';

import Clarifai from 'clarifai';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import HealthScoreForm from './components/HealtScoreForm/HealthScoreForm'

import ImageFileForm from './components/ImageFileForm/ImageFileForm';

import Rank from './components/Rank/Rank';

import SignIn from './components/SignIn/SignIn';

import About from './components/About/About';

import Footer from './components/Footer/Footer';





import SymptomsRecognition from './components/SymptomsRecognition/SymptomsRecognition';

import Registers from './components/Registers/Registers';








//const dotenv = require('dotenv').config()








import Particles from 'react-particles-js';

import axios from 'axios';

//import FaceDetect from "./components/FaceDetect/FaceDetect";

import './App.css';
//import HealthScoreForm from './components/HealtScoreForm/HealthScoreForm';

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


		console.log("constructor called");
		

		this.state = {

			showMe: false,

			input: '',
			imageUrl: '',
			symptoms: '',
			symptoms1: '',
			symptoms2: '',
			age: '',
			gender: '',
			box: {},
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			},
			route: 'about',
			isSignedIn: 'false'
			, selectedFile: null,
			hs_age: '',
			hs_sex: '',
			height: '',
			weight: ''

		
		};

		
	//	this.checkSession(this.state.name);

		
	}

	//check for session on refresh
	componentDidMount() {



		const token = window.sessionStorage.getItem('token');
		
		if (token) {
			fetch('https://protected-gorge-67490.herokuapp.com/signin', {
				
				method: 'post',
				headers: {
					'content-Type': 'application/json',
					'Authorization': token
				}
				
			}).then(resp => resp.json())
				.then(data => {
					if (data) {
						//console.log('success we need to get the user profile');
						
						console.log("data.id "+data.id);
						fetch('https://protected-gorge-67490.herokuapp.com/profile/'+data, {
							method: 'get',
							headers: {
								'content-Type': 'application/json',
								'Authorization': token
							
							}
							

						})
							.then(resp => resp.json())
							.then(user => {
								if (user) {
									console.log("before loaduser is called"+user);
									this.loadUser(user);
									this.onRouteChange('home');
								}
						
							})
					}
				})
				.catch(console.log);
		}
    //  this.checkSession();
	}


	checkLoginStatus() {
		axios.server("https://protected-gorge-67490.herokuapp.com/")
	}
	
	



	loadUser = (data) => {
		console.log("data passed to loadUser" + data.name)
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
		console.log("name set now"+this.state.user.name);
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
			console.log("gender" + this.state.gender);
		}
		//this.setState({ symptoms: event.target.id });
		//this.setState({ age: event.target.id });

		else if (event.target.id == 'hs_age') {

			console.log(event.target.value);
			
		}


	

		
		

	};



	
		 

	onButtonSubmit = (event) => {
			this.showOperation();
			console.log("inside axio request");
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


		fetch('https://protected-gorge-67490.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
					this.setState(Object.assign(this.state.user, { entries: count }))
					

					


				})
		



		const options = {

			
			method: 'GET',
			url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
			params: { gender: gender, year_of_birth: age, symptoms: '[' + symptoms + ',' + symptoms1 + ']', language: 'en-gb' },
			headers: {
				'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd',
				'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com'
			}

		};


		axios.request(options).then(function (response) {
			
		
			console.log("inside axio request");
			console.log(response.data[0]);
			console.log(response.data[1]);


			console.log(response.data[0].Issue.Name);
			let name = response.data[0].Issue.Name;
			let accuracy = (Math.round(response.data[0].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist = response.data[0].Specialisation[0].Name;
			//let specialist = response.data[0].Issue.Name;
			let name_1 = response.data[1].Issue.Name;
			let accuracy_1 = (Math.round(response.data[1].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist_1 = response.data[1].Specialisation[1].Name;
			//let accuracy_1= response.data[1].Issue.Accuracy+ "%";

			let geder = response.data[0].Issue.Gender;

			console.log(response.data[0]);
			//console.log(response.data[0].Issue.Name);
			console.log(response.data[0].Specialisation.Name);

			document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;
			document.getElementById('specialist').innerHTML = specialist;
			document.getElementById('symptoms_expalin').innerHTML = specialist;
			document.getElementById('symptoms_result_1').innerHTML = name_1;
			document.getElementById('symptoms_confidence_1').innerHTML = accuracy_1;
			document.getElementById('specialist_1').innerHTML = specialist_1;
		
		}).catch(function (error) {
			console.error(error);
		});
	
			
		
	};




	hshandleFormSubmit = (event) => {
		
/*		
var myHeaders = new Headers();
myHeaders.append("X-dacadoo-Key", "KDAgUABLa0kdebkpsNP6se5XDK4f5e6GEhGh41EZ");
myHeaders.append("Host", "models-nl.dacadoo.com");
		myHeaders.append("Content-Type", "application/json; charset=UTF-8");
				myHeaders.append("Access-Control-Allow-Origin", "*");
		
		// "Access-Control-Allow-Origin",'*'

var raw = "{\n  \"mhm\": {\n    \"age\": 40,\n    \"sex\": 1,\n    \"hgt\": 170,\n    \"wgt\": 75,\n    \"fat\": 15,\n    \"dbp\": 80,\n    \"sbp\": 120,\n    \"rhr\": 45\n  },\n  \"smk\": {\n    \"now\": 0,\n    \"evr\": 0\n  },\n  \"slp\": {\n    \"bed\": [ 8.0, null, null, 7.5, 8.0 ],\n    \"slp\": [ 7.0, null, null, 7.0, 7.9 ],\n    \"awk\": [ 1, null, null, 1, 1 ]\n  },\n  \"nut\": {\n    \"nqs\": [ 0.2, 0.2, 0.2, 0.5, null, null, 0.8 ]\n  },\n  \"qlm\": {\n    \"q01\": 1,\n     \"q02\": 1,\n      \"q03\": 0,\n    \"q07\": 0.7,\n    \"q08\": 0.2\n  },\n  \"clip\": false\n}";

		var requestOptions = {
	 mode: 'cors',
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
*/



var data = '{\n  "mhm": {\n    "age": 40,\n    "sex": 1,\n    "hgt": 170,\n    "wgt": 75,\n    "fat": 15,\n    "dbp": 80,\n    "sbp": 120,\n    "rhr": 45\n  },\n  "smk": {\n    "now": 0,\n    "evr": 0\n  },\n  "slp": {\n    "bed": [ 8.0, null, null, 7.5, 8.0 ],\n    "slp": [ 7.0, null, null, 7.0, 7.9 ],\n    "awk": [ 1, null, null, 1, 1 ]\n  },\n  "nut": {\n    "nqs": [ 0.2, 0.2, 0.2, 0.5, null, null, 0.8 ]\n  },\n  "qlm": {\n    "q01": 1,\n     "q02": 1,\n      "q03": 0,\n    "q07": 0.7,\n    "q08": 0.2\n  },\n  "clip": false\n}';

var config = {
  method: 'post',
  url: 'https://http-cors-proxy.p.rapidapi.com/https://models-nl.dacadoo.com/score/1.4.0',
  headers: { 
    'X-dacadoo-Key': 'KDAgUABLa0kdebkpsNP6se5XDK4f5e6GEhGh41EZ', 
    'Host': 'models-nl.dacadoo.com', 
    'Content-Type': 'application/json; charset=UTF-8', 
    'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com', 
    'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd', 
    'x-dacadoo-host': 'models-nl.dacadoo.com', 
    'origin': 'models-nl.dacadoo.com', 
    'x-requested-with': 'models-nl.dacadoo.com'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
		/*


		fetch('https://models-nl.dacadoo.com/score/1.4.0', {
            method: 'POST',
			headers: {
				'POST' :'/risk/1 HTTP/1.1',
				'X-dacadoo-Key': 'KDAgUABLa0kdebkpsNP6se5XDK4f5e6GEhGh41EZ',
				'Accept-Encoding': 'gzip,deflate,sdch',
				'Connection': 'keep-alive',
					'Host': 'models-nl.dacadoo.com',
				'content-Type': 'application/json; charset=UTF-8',
				'Origin': 'http://onevitals.io'
			},
            body: JSON.stringify({
					age: this.state.hs_age,
					sex: this.state.hs_sex            })
          })
            .then(response => response.json())
           /* .then(count => {
					this.setState(Object.assign(this.state.user, { entries: count }))
					

					


				})
		



		*/


/*

		axios.request(options).then(function (response) {
			
		
			console.log("inside axio request");
			console.log(response.data[0]);
			console.log(response.data[1]);


			console.log(response.data[0].Issue.Name);
			let name = response.data[0].Issue.Name;
			let accuracy = (Math.round(response.data[0].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist = response.data[0].Specialisation[0].Name;
			//let specialist = response.data[0].Issue.Name;
			let name_1 = response.data[1].Issue.Name;
			let accuracy_1 = (Math.round(response.data[1].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist_1 = response.data[1].Specialisation[1].Name;
			//let accuracy_1= response.data[1].Issue.Accuracy+ "%";

			let geder = response.data[0].Issue.Gender;

			console.log(response.data[0]);
			//console.log(response.data[0].Issue.Name);
			console.log(response.data[0].Specialisation.Name);

			document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;
			document.getElementById('specialist').innerHTML = specialist;
			document.getElementById('symptoms_expalin').innerHTML = specialist;
			document.getElementById('symptoms_result_1').innerHTML = name_1;
			document.getElementById('symptoms_confidence_1').innerHTML = accuracy_1;
			document.getElementById('specialist_1').innerHTML = specialist_1;
		
		}).catch(function (error) {
			console.error(error);
		});
	
		*/	
		
	};


	

	



	


	

	

	fileSelectedHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};


	hsSelectedHandler = (event) => {
		console.log(event.target.value);
		this.setState({
			hs_age: event.target.value,
			hs_sex: 0
			
		});
		
	};



	fileUploadHandler = () => {
		
 	this.showOperation()
		const formData = new FormData();
		formData.append('data', this.state.selectedFile, this.state.selectedFile.name);
		//console.log("formData"+formData);
		axios.post('https://www.nyckel.com/v0.9/functions/edx2ml1gbri4n34d/invoke', formData).then((res) => {
			console.log(res.data.confidence);
			console.log(res.data.name);

			let confidence_new = (Math.round(res.data.confidence * 100) / 100).toFixed(2) * 100 + "%";
			// alert(res);
			document.getElementById('result').innerHTML = res.data.name;
			document.getElementById('confidence').innerHTML = confidence_new;
		});
		fetch('https://protected-gorge-67490.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

	};


	onRouteChange = (route) => {

		console.log("inside onroutechange function");
		/*const that = this;

		console.log("ROUTE IS " + route)
		if (route == 'home') {

			//	this.setState({ route: 'signin' });

			console.log("result -------" + route);

			let data;
			
			fetch('https://protected-gorge-67490.herokuapp.com/')
			
				.then(response => response.statusText)
				
				.then(function (data) {
					console.log('Request succeeded with JSON response', data);
					if (data) {
						console.log("got resulr");
						//	this.state.route === 'home';
						that.setState({ route: "home" });
					} else {

						console.log("got No resulr");
						that.setState({ route: "signin" });
						//  alert("User not Registered!")
							
					}
				}).catch(function (error) {
					console.log('Request failed', error);
				});
					
	
		
			

			
	
		
			//console.log("ata is----------" +data);
				
			//  return res.json()
		
				
   
		
			this.setState({ route: route });
			//	console.log("route is signin");
			
		}*/
		//this.setState({ route: 'signin' })





		if (this.checkSession() || route == 'register') {
			this.setState({ isSignedIn: true })
		
			this.setState({ route: route });
		} else {
			  this.setState({isSignedIn: false})
			this.setState({ route: 'signin' });
		}
	};



	checkSession = () => {

	

console.log("isSignedIN called"+this.state.isSignedIn);
		console.log("checksession called"+this.state.user.name);
		if  (this.state.user.name === "") {
			


			console.log("name is not undifiend");

			
			this.setState({ route: 'about' });
			this.setState({ isSignedIn: false });
			console.log("isSignedIN1 called"+this.state.isSignedIn);
			return false;

					
	
		} else

			console.log("name is defined");
		this.setState({ isSignedIn: true });
		console.log("isSignedIN2 called"+this.state.isSignedIn);
		   return true;
		

	}

	
 
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



	getUsers = () => {
    let url = 'users.json';
    try {
		 let res = fetch('https://protected-gorge-67490.herokuapp.com/');
		 console.log(res.json);
        return  res.json();
    } catch (error) {
        console.log(error);
    }
	}

	showOperation = () => {
		this.setState({
			showMe:true
		})
	}
	


	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
	
		return (
			<div className="App">
				{/*<input type="file" onChange={this.fileSelectedHandler} />
     <button onClick={this.fileUploadHandler} >Check </button>  */}
				
		

				<Particles className="particles" params={particlesOptions} />

				{this.state.route === 'home' ? (
					<div>

						
				
					
							<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} name={this.state.user.name} entries={this.state.user.entries}
							
						
							/>
				
								
						
						<Logo />
					
						<Rank
							
							
							name={this.state.user.name}
							
						  entries={this.state.user.entries}
						/>

						<ImageLinkForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
								
								
						
						/>

						
					
						{
							
								this.state.showMe?
					
						
							<SymptomsRecognition />

								:
								null
						}
						{/*
     <ImageLinkForm 
     onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit} />
    */}
						<ImageFileForm
							fileSelectedHandler={this.fileSelectedHandler}
							fileUploadHandler={this.fileUploadHandler}
						/>


						<HealthScoreForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						onInputChange={this.onInputChange} onHSButtonSubmit={this.onHSButtonSubmit} hsSelectedHandler={this.hsSelectedHandler}
							hshandleFormSubmit={this.hshandleFormSubmit}	
								
						
						/>

						
						{ this.state.showMe ?

							<SkinRecognition />
							
							:
							null
						}
					

						

						

						<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />

						<Footer />

					</div>
				) : this.state.route === 'signin' ? (
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						
					/>
					) : this.state.route === 'about' ? (
							
							
							<div>	
								
					
						
					<About onRouteChange={this.onRouteChange}
						
								/>
								
								

						
						</div>
							
						
				) : (
							<Registers loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
							)
				
				
				
				}
			</div>
		);
	}
}

export default App;
