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


import Sketch from './components/HealtScoreForm/./sketch'














import SymptomsRecognition from './components/SymptomsRecognition/SymptomsRecognition';


import ScoreRecognition from './components/ScoreRecognition/ScoreRecognition';

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
			hs_age: '0',
			hs_sex: '0',
			hs_height: '0',
			hs_weight: '0',
			hs_fat: '0',
			hs_dbp: '0',
			hs_sbp: '0',
			hs_rhr: '0',
			hs_alc: '0',
			hs_now: '0',
			hs_evr: '0',
			hs_fbg:'null',
			hs_bed: [8.0, 8.0, 8.0],
			hs_nqs: [0.5, 0.5, null, 0.5, null, null, 0.8 ],



			testValue: 40,
		

			

		
		};

		//		var data = JSON.stringify({ mhm: { age: +this.state.hs_age, sex: 1, hgt: 110, wgt: 125, fat: 45, rhr: 45 }, smk: { now: 0 }, sleep: { bed: [8.0, 8.0,8.0] } });


		
	//	this.checkSession(this.state.name);

		
	}

	//check for session on refresh
	componentDidMount() {

//following code is for captering the code inside the url for withing		
var url_string = window.location;
var url = new URL(url_string);
var code = url.searchParams.get("code");

//document.getElementById("code").innerHTML = "dddddd";
  // document.getElementById("code").value = code;
   console.log(code)


 
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
									//console.log("before loaduser is called"+user);
									this.loadUser(user);
									this.onRouteChange('home');
									var access = this.getAccessToken(code,this.getWithMeas,this.getWithFatMeas,this.getDiastolicMeas,this.getSystolicMeas, this.getHeartMeas);
										
									console.log("call the first .then")
								
									console.log("access returned is"+access );
									
									
								}
						
							})
					}
				})
				.catch(console.log);
		}
    //  this.checkSession();
	}


	getAccessToken = (code, getWithMeas, getWithFatMeas, getDiastolicMeas, getSystolicMeas ,getHeartMeas, getHeaightMeas) => {
		 console.log(code)

		/*var url_string = window.location;
var url = new URL(url_string);
var code = url.searchParams.get("code");

//document.getElementById("code").innerHTML = "dddddd";
  // document.getElementById("code").value = code;
   console.log(code)
		
					console.log("inside getAccessToken" + code);
							
					var axios = require('axios');
					var FormData = require('form-data');
					var data = new FormData();
					data.append('action', 'request_token');
					data.append('grant_type', 'authorization_code');
					data.append('client_id', 'fdc30a61126f1c849b3b5c59fb7a8d7200d745a5eb38c3f0c898d069a1c3adc4');
					data.append('client_secret', '39343c01f5217dc236bec8d1e4277f4ed971252e7d760034b93c0c13916f0565');
					data.append('code', code);
					data.append('redirect_uri', 'http://onevitals.io');
					data.append('state', '1234zyx');

					var config = {
					method: 'post',
					url: 'https://http-cors-proxy.p.rapidapi.com/https://account.withings.com/oauth2/token',
						headers: { 
						  'Content-Type': 'application/json; charset=UTF-8',
						'Cookie': 'ns_af=DhwiD832nkkfj2; next_workflow_login=oauth2_user; next_block_login=authorize2; current_path_login=%3Fresponse_type%3Dcode%26client_id%3Dfdc30a61126f1c849b3b5c59fb7a8d7200d745a5eb38c3f0c898d069a1c3adc4%26redirect_uri%3Dhttp://onevitals.io%26scope%3Duser.info%252Cuser.metrics%26state%3D1234zyx%26selecteduser%3D17539818%26b%3Dauthorize2; signin_authorize_state=71518a5675', 
						  'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com', 
                'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd'
							
					},
					data : data
					};

					axios(config)
						.then(function (response) {

							
							console.log("Access token Value")
							
							console.log(JSON.stringify(response.data));
						
						
							var test = "hi";
							getWithMeas(response.data);
							getWithFatMeas(response.data);
							getDiastolicMeas(response.data);
							getSystolicMeas(response.data);
							//return response;
							
						
						}).catch(function (error) {
					console.log(error);
					});*/
		
		
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://http-cors-proxy.p.rapidapi.com/https://wbsapi.withings.net/v2/oauth2',
  headers: {
    'content-type': 'application/json',
    origin: 'onevitals.io',
    'x-requested-with': 'http://onevitals.io',
    'x-rapidapi-host': 'http-cors-proxy.p.rapidapi.com',
    'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd'
  },
  data: {
    action: 'requesttoken',
    grant_type: 'authorization_code',
    client_id: 'fdc30a61126f1c849b3b5c59fb7a8d7200d745a5eb38c3f0c898d069a1c3adc4',
    client_secret: '39343c01f5217dc236bec8d1e4277f4ed971252e7d760034b93c0c13916f0565',
    code: code,
    redirect_uri: 'http://onevitals.io',
    'Content-Type': 'application/json; charset=UTF-8',
    state: '1234zyx'
  }
};

		axios.request(options).then(function (response) {
	
	console.log("access Token is"+response.data.body.access_token);
				getWithMeas(response.data);
				getWithFatMeas(response.data);
				getDiastolicMeas(response.data);
			getSystolicMeas(response.data);
			getHeartMeas(response.data);
			getHeaightMeas(response.data);
}).catch(function (error) {
	console.error(error);
});
							
		
	}


	getWithMeas = (access) => {
		 
		console.log("vakue passed into getMeas"+access.body.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '1');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

		axios(config)
			.then(function (response) {
				console.log(" measuremens values")
				console.log(JSON.stringify(response.data));
				//let stringifydata = JSON.stringify(response.data);
				let responseWeightInt = response.data.body.measuregrps[0].measures[0].value;
				let stringifydata = JSON.stringify(responseWeightInt);
				let stripZeroNumberWeight = (stringifydata / 1000);
				let mathWeight = Math.round(stripZeroNumberWeight);
				//	let realIntWeight = parseInt(stripZeroNumberWeight);
					
				//console.log( (stripZeroNumberWeight).toFixed() );
				let intdata = parseInt(stripZeroNumberWeight);
				console.log("stripNumber weight is " + intdata);
				//alert(typeof realIntWeight);
				//alert(stringifydata);
				document.getElementById("hs_weight").value = stripZeroNumberWeight;
				let valueinsidextfied = document.getElementById("hs_weight").value;
			//	alert(document.getElementById("hs_weight").value);
				let displayValue = (typeof valueinsidextfied);
				let intdataofstring = parseInt(displayValue);
				//alert("int version" + intdataofstring);
				//alert(displayValue);
			//	alert(displayValue);
					
			})
			.catch(function (error) {
			console.log(error);
			});


	}

	getWithFatMeas = (access) => {

		console.log("vakue passed into getMeas"+access.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '6');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

			axios(config)
				.then(function (response) {
				console.log("fat measuremens values")
					console.log(JSON.stringify(response.data));
					let responseFatInt = response.data.body.measuregrps[0].measures[0].value;
					let stripZeroNumberFat = (responseFatInt / 1000);
					
					  this.setState({hs_fat: 55})
					
				//	console.log("stripNumber Fat is " + JSON.stringify(response.data));
					alert("hi");
					console.log("new hs_fat i"+this.state.hs_fat);
					document.getElementById("hs_fat").value = stripZeroNumberFat;
					
			
					
			})
			.catch(function (error) {
			console.log(error);
			});
		


	}

		getDiastolicMeas = (access) => {

		console.log("vakue passed into getMeas"+access.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '9');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

			axios(config)
				.then(function (response) {
				console.log("dpb measuremens values")
					console.log(JSON.stringify(access.body.access_token));

					let responseDiaInt = response.data.body.measuregrps[0].measures[0].value;
					let stripZeroNumberDia = (responseDiaInt / 1000);
					
					console.log("stripNumber Fat is "+stripZeroNumberDia);
					 document.getElementById("hs_dpb").value = stripZeroNumberDia


				//	 document.getElementById("hs_dpb").value = response.data.body.measuregrps[0].measures[0].value
			})
			.catch(function (error) {
			console.log(error);
			});
		


		}
	
		getSystolicMeas = (access) => {

		console.log("vakue passed into getMeas"+access.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '10');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

			axios(config)
				.then(function (response) {
				console.log("sbp measuremens values")
					console.log(JSON.stringify(response.data));

						let responseSysInt = response.data.body.measuregrps[0].measures[0].value;
					let stripZeroNumberSys = (responseSysInt/1000);
					console.log("stripNumber Fat is "+stripZeroNumberSys);
					document.getElementById("hs_sbp").value = stripZeroNumberSys;

					
				//	 document.getElementById("hs_sbp").value = response.data.body.measuregrps[0].measures[0].value
			})
			.catch(function (error) {
			console.log(error);
			});
		


		}
	
	
	
		getHeartMeas = (access) => {

		console.log("vakue passed into getHeartMeas"+access.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '11');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

			axios(config)
				.then(function (response) {
				console.log("heart measuremens values")
					console.log(JSON.stringify(response.data));

						let responseHeartInt = response.data.body.measuregrps[0].measures[0].value;
					let stripZeroNumberHeart = (responseHeartInt/1000);
					console.log("stripNumber Heart is "+stripZeroNumberHeart);
					document.getElementById("hs_rhr").value = stripZeroNumberHeart;

					
					// document.getElementById("hs_rhr").value = response.data.body.measuregrps[0].measures[0].value
			})
			.catch(function (error) {
			console.log(error);
			});
		


	}


		getHeightMeas = (access) => {

		console.log("vakue passed into getHeaightMeas"+access.access_token);
					
			var axios = require('axios');
			var FormData = require('form-data');
			var data = new FormData();
			data.append('action', 'getmeas');
			data.append('access_token', access.body.access_token);
			data.append('meastype', '4');
			data.append('category', '1');
			data.append('startdate', '1642984801');

			var config = {
			method: 'post',
			url: 'https://wbsapi.withings.net/measure',
			headers: { 
				'Authorization': ''
			//	...data.getHeaders()
			},
			data : data
			};

			axios(config)
				.then(function (response) {
				console.log("Height measuremens values")
					console.log(JSON.stringify(response.data));

					//	let responseHeightInt = response.data.body.measuregrps[0].measures[0].value;
					//let stripZeroNumberHeight = (responseHeightInt/1000);
				//	console.log("stripNumber height is "+stripZeroNumberHeight);
				//	document.getElementById("hs_height").value = stripZeroNumberHeight;

					
				 document.getElementById("hs_height").value = response.data.body.measuregrps[0].measures[0].value
			})
			.catch(function (error) {
			console.log(error);
			});
		


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

		//	console.log(event.target.value);
			
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
			params: { gender: gender, year_of_birth: age, symptoms: '[' + symptoms + ',' + symptoms1 + ',' + symptoms2 + ']', language: 'en-gb' },
			headers: {
				//'x-rapidapi-key': 'KDAgUABLa0kdebkpsNP6se5XDK4f5e6GEhGh41EZ',
				'x-rapidapi-key': '3b5c37eca6msh16cc56dbeca52cfp1bdf10jsn63b2a383dcbd',
				'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com'
			}

		};


		axios.request(options).then(function (response) {
			
			console.log(response.data);
			let returnedArray = response.data;
			if (returnedArray.length === 0) {
				alert("No Diagnoses identified with your Entered Symptoms.");
			} 
			console.log("inside axio request");
			console.log(response.data[0]);
			console.log(response.data[1]);


			console.log(response.data[0].Issue.Name);
			let name = response.data[0].Issue.Name;
			let accuracy = (Math.round(response.data[0].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist = response.data[0].Specialisation[0].Name;
			document.getElementById('symptoms_result').innerHTML = name;
			document.getElementById('symptoms_confidence').innerHTML = accuracy;
			document.getElementById('specialist').innerHTML = specialist;
		//	document.getElementById('symptoms_expalin').innerHTML = specialist;
			//let specialist = response.data[0].Issue.Name;
			let name_1 = response.data[1].Issue.Name;
			console.log("issue 2 Name" + name_1);
			let accuracy_1 = (Math.round(response.data[1].Issue.Accuracy * 100) / 100).toFixed(0);
			let specialist_1 = response.data[1].Specialisation[1].Name;
			//let accuracy_1= response.data[1].Issue.Accuracy+ "%";

			document.getElementById('symptoms_result_1').innerHTML = name_1;
			document.getElementById('symptoms_confidence_1').innerHTML = accuracy_1;
			document.getElementById('specialist_1').innerHTML = specialist_1;

		
			
		
		}).catch(function (error) {
			console.error(error);
		});
	
			
		
	};




	hshandleFormSubmit = (event) => {

			this.showOperation();

		
			

		//let hs_fat_new = document.getElementById("hs_fat").value;
		//alert(hs_fat_new);
		/*
		this.setState({
			hs_fat:  hs_fat_new
		})

		alert(this.state.hs_fat);*/
		
		
		
		const age = this.state.hs_age;
		console.log("insode" + age);

//var data = '{\n  "mhm": {\n    "age": ${this.state.testVal,\n    "sex": 1,\n    "hgt": 170,\n    "wgt": 75,\n    "fat": 15,\n    "dbp": 80,\n    "sbp": 120,\n    "rhr": 45\n  },\n  "smk": {\n    "now": 0,\n    "evr": 0\n  },\n  "slp": {\n    "bed": [ 8.0, null, null, 7.5, 8.0 ],\n    "slp": [ 7.0, null, null, 7.0, 7.9 ],\n    "awk": [ 1, null, null, 1, 1 ]\n  },\n  "nut": {\n    "nqs": [ 0.2, 0.2, 0.2, 0.5, null, null, 0.8 ]\n  },\n  "qlm": {\n    "q01": 1,\n     "q02": 1,\n      "q03": 0,\n    "q07": 0.7,\n    "q08": 0.2\n  },\n  "clip": false\n}';
		var data = JSON.stringify({
			mhm: { age: +this.state.hs_age, sex: +this.state.hs_sex, hgt: +this.state.hs_height, wgt: +this.state.hs_weight, fat: +this.state.hs_fat, rhr: +this.state.hs_rhr, dbp: +this.state.hs_dbp ,sbp: +this.state.hs_sbp  , fbg: +this.state.hs_fbg, exh:10}, smk: { now: + this.state.hs_now , evr: + this.state.hs_evr },nut:{nqs:[ 0.1,0.1,0.1,0.1 ,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1]},
			slp: {
				bed: [null,null,null],
    			slp: [null,null,null],
				awk: [null,null,null]
			},
			nut: {
			//	nqs: [0.9, 0.9, 0.9, null, 0.1, null, null, null, null, null, null, 0.9, 1.0, 0.1, 0.9, 0.1, 0.9]
			}
		});
		

	//	var data = JSON.stringify({ mhm: { age: 42 } });
var config = {
  method: 'post',
  url: 'https://http-cors-proxy.p.rapidapi.com/https://models-nl.dacadoo.com/score/1.4.0',
  headers: { 
    'X-dacadoo-Key': 'CEsRqXcySklmUNOgUb92OaiQ6CZN2LsZvtHvcLd6', 
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
	let scr_result = response.data.components.bdy;
		document.getElementById('score_result').innerHTML =  scr_result;

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
			console.log("selectedfile will be"+event.target.files[0]);
		this.setState({

			selectedFile: event.target.files[0]
		//	console.log("selectedfile is" + selectedFile);
		});
	};


	hsSelectedHandler = (event) => {
		console.log(event.target.value);
		
	

		if (event.target.id == 'hs_age') {
			
		
			this.setState({ hs_age: event.target.value });
			
			
		} else if (event.target.id == 'hs_sex') {
				
			this.setState({ hs_sex: event.target.value });

			
			
		}else if (event.target.id == 'hs_height') {
				
			this.setState({ hs_height: event.target.value });

			
			
		}else if (event.target.id == 'hs_weight') {
			
				
			this.setState({ hs_weight: event.target.value });

			
			
				}else if (event.target.id == 'hs_now') {
				
			this.setState({ hs_now: event.target.value });

			
			
		}else if (event.target.id == 'hs_evr') {
				
			this.setState({ hs_evr: event.target.value });

			
			
		}else if (event.target.id == 'hs_dpb') {
				
			this.setState({ hs_dbp: event.target.value });

			
			
		}else if (event.target.id == 'hs_sbp') {
				
			this.setState({ hs_sbp: event.target.value });

			
			
		}else if (event.target.id == 'hs_fat') {
				
			this.setState({ hs_fat: event.target.value });

			
			
				}else if (event.target.id == 'hs_rhr') {
				
			this.setState({ hs_rhr: event.target.value });

			
			
				}else if (event.target.id == 'hs_fbg') {
				
			this.setState({ hs_fbg: event.target.value });

			
			
				}
		
		


	

		
		

	};




	fileUploadHandler = () => {
		
	// this.showOperation
		console.log("inside file upload" + this.state.selectedFile);
		const formData = new FormData();
		formData.append('data', this.state.selectedFile, this.state.selectedFile.name);
		//console.log("formData"+formData);
		axios.post('https://www.nyckel.com/v1/functions/edx2ml1gbri4n34d/invoke', formData).then((res) => {

			console.log("res"+res);
			console.log("res.data.name"+res.data.labelName);
			console.log("res.data.confidence"+res.data.confidence);
			console.log(res.data);

			let confidence_new = (Math.round(res.data.confidence * 100) / 100).toFixed(2) * 100 + "%";
			// alert(res);
			document.getElementById('result').innerHTML = res.data.labelName;
		document.getElementById('confidence').innerHTML = confidence_new;
		});

	/*	var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('data', this.state.selectedFile, this.state.selectedFile.name);

var config = {
  method: 'post',
  url: 'https://www.nyckel.com/v1/functions/edx2ml1gbri4n34d/invoke',
  headers: { 
  //  ...data.getHeaders()
	  "Content-Type": "application/json"
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify("response is"+response.data));
})
.catch(function (error) {
  console.log(error);
});*/

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

	

	getZiva = (props) => {
	

		var Ajax = require('react-ajax');
		
		var connectBtn = document.getElementById('connect-health-data-btn');
connectBtn.addEventListener('click', function (e) {
    var opts = {
        // Grab this from the app settings page.
        clientId: 'UNIQUE_CLIENT_ID_FOR_THE_APPLICATION',
        // Can be e-mail (any other internal ID of the user, from your system).
        clientUserId: 'UNIQUE_USER_ID_IN_YOUR_APPLICATION',
        finish: function(err, responseObject) {
            // When the user finishes the health data connection to your app, the `finish` function will be called.
            // `responseObject` object will have a specialToken field in it.
            // You need to pass this `specialToken` back to us, along with `CLIENT_SECRET`
            // Send a `POST` request to the `https://developer.zivacare.com/oauth/v2/get-access-token` endpoint.
            // In return you will get `accessToken` for your user, which can be used to query ZivaCare API.
            
            // Sending POST request with jQuery might look like this.
            // NOTE: it's not necessary to use jQuery.            
            var data = {
                // Grab this from the app settings page.
                clientSecret: 'CLIENT_SECRET',
                specialToken: responseObject.specialToken
            };

            Ajax({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                url: 'https://developer.zivacare.com/oauth/v2/get-access-token',
                data: data,
                success: function(data) {
                    // The response is a JSON with this structure:
                    /*
                    {
                      "ziva_user_code": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                      "name": "xxxxxxxxxxxxxxx...",
                      "email": "xxxxxxxxxxxxxxx...",
                      "access_token": "xxxxxxxxxxxxxxx..."
                    }
                    */

                    window.console && console.log(data);
                    alert('The aceess token for your user is: ' + data.access_token);
                },
                error: function() {
                    window.console && console.log('Error getting the access token.');
                }
            });
        },
        close: function() {
            // Do something when the user closed popup.
            // The `close` callback function is optional.
        }
    };
  //  ZivaConnect.open(opts);
});

	}






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

						
						{ this.state.showMe ?
						 
						
						
						
							<SkinRecognition />
							:
							null
					
						}

						<HealthScoreForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}
						onInputChange1={this.onInputChange} onHSButtonSubmit={this.onHSButtonSubmit} hsSelectedHandler={this.hsSelectedHandler}
							hshandleFormSubmit={this.hshandleFormSubmit}	
								
						
						/>

						

						
					
						
						{ this.state.showMe ?

							<ScoreRecognition />
							
							: 
							null
							
						}

						
						
								
						{ this.state.showMe ?

								<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
							
							: 
							null
							
						}


						

						

						

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
