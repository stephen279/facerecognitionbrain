import React from 'react';
import { Background } from 'tsparticles/Options/Classes/Background/Background';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import './About.css';

class About extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      signInEmail: "",
      signInPassword: ""
    }
  }

    onEmailChange = (event) => {
      
        this.setState({signInEmail: event.target.value})
      
    }


    onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
    }
   
   
   
   
   

    /*onSubmitChange = () => {
      console.log(this.state);
      
      this.props.onRouteChange('home');
    }*/
  
  //https://protected-gorge-67490.herokuapp.com
  //http://localhost:3000/signin
  
    /*  onSubmitSignIn = () => {

        fetch('https://protected-gorge-67490.herokuapp.com/signin', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              email: this.state.signInEmail,
              password: this.state.signInPassword
            }
          )
        }).then(response => response.json())
            .then(user => {
              if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
              } else {

                document.getElementById("error").innerHTML = "User Not Registered !!!!";
              //  alert("User not Registered!")
            }
          })

          
      
    }
  */
  

  
  render() {
    
    
  
     return (

        
     
        
       
    
        <div>
        
          
               <Logo />
          
           
        {/* Hello world */}
        <title>W3.CSS Template</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
           <style>



           </style>
        <style dangerouslySetInnerHTML={{__html: "\nbody,h1,h2,h3,h4,h5,h6 {font-family: \"Lato\", sans-serif}\n.w3-bar,h1,button {font-family: \"Montserrat\", sans-serif}\n.fa-heart,.fa-user-circle-o {color:black;font-size:200px; color:blue}\n" }} />
           {/* Navbar 
           
           
           <div className="w3-top">
            
          <div className="w3-bar w3-red w3-card w3-left-align w3-large">
            <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i className="fa fa-bars" /></a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large w3-white">Home</a>
            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 1</a>
            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 2</a>
            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 3</a>
            <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 4</a>
          </div>
          {/* Navbar on small screens 
          <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 4</a>
          </div>
        </div>
        {/* Header */}
           <header className="w3-row-padding w3-violet w3-padding-64 w3-container" style={{ padding: '128px 16px'}}>
          <h1 className="w3-margin w3-jumbo">Welcome</h1>
          <p className="w3-xlarge">OneVitals.ai is a new innocative way to use ai to diagnose your common symptoms and skin diseases.</p>
          <button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button>
        </header>
        {/* First Grid */}
        <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1>Symptoms Checking</h1>
              <h5 className="w3-padding-32">Get a diagnose of your Symptoms easily.</h5>
              <p className="w3-text-grey">By selecting your Symptoms you can easily get a diagnoses of the most popular response from our AI symptoms checker letting you know what your illness may be.</p>
            </div>
            <div className="w3-third w3-center">
              <i className="fa fa-heart w3-padding-64 w3-text-red" />
            </div>
          </div>
        </div>
        {/* Second Grid */}
        <div className="w3-row-padding w3- w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-third w3-center ">
              <i className="fa fa-user-circle-o  w3-padding-64 w3-text-cyan w3-margin-right" />
            </div>
            <div className="w3-twothird">
              <h1>Skin Disease</h1>
              <h5 className="w3-padding-32">Get a diagnose of your Skin Disease Symptoms easily.</h5>
              <p className="w3-text-grey">By Uploading an image of your Skin you can easily get a diagnoses of the most popular skin disease from our AI Skin checker letting you know what your Skin Disease may be.</p>
            </div>
          </div>
        </div>
        <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
          <h1 className="w3-margin w3-xlarge">Health tip of the day: Excercise for 15 minites a day helps overall mental health</h1>
        </div>
        {/* Footer */}
        <footer className="w3-container w3-padding-64 w3-center w3-opacity">  
          <div className="w3-xlarge w3-padding-32">
            <i className="fa fa-facebook-official w3-hover-opacity" />
            <i className="fa fa-instagram w3-hover-opacity" />
            <i className="fa fa-snapchat w3-hover-opacity" />
            <i className="fa fa-pinterest-p w3-hover-opacity" />
            <i className="fa fa-twitter w3-hover-opacity" />
            <i className="fa fa-linkedin w3-hover-opacity" />
          </div>
          <p>Powered by <a href="https://www.onevitals.com/accounts/landing.html" target="_blank">OneVitals health Applications</a></p>
        </footer>
      </div>
    
    
     
  );
}

}

export default About;