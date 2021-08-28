
import React from 'react';
import { Background } from 'tsparticles/Options/Classes/Background/Background';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import './Footer.css';

class Footer extends React.Component {

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
    
    const { onRouteChange } = this.props;
  
     return (
     
        
        <div>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
             <style dangerouslySetInnerHTML={{__html: "\nbody,h1,h2,h3,h4,h5,h6 {font-family: \"Lato\", sans-serif}\n.w3-bar,h1,button {font-family: \"Montserrat\", sans-serif}\n.fa-heart,.fa-user-circle-o{font-size:200px; color:blue}\n" }} />
     
        <footer classname="w3-container w3-padding-64 w3-center w3-opacity">  
          <div classname="w3-xlarge w3-padding-32">
            <i classname="fa fa-facebook-official w3-hover-opacity">
              <i classname="fa fa-instagram w3-hover-opacity">
                <i classname="fa fa-snapchat w3-hover-opacity">
                  <i classname="fa fa-pinterest-p w3-hover-opacity">
                    <i classname="fa fa-twitter w3-hover-opacity">
                      <i classname="fa fa-linkedin w3-hover-opacity">
                      </i></i></i></i></i></i></div><i classname="fa fa-facebook-official w3-hover-opacity"><i classname="fa fa-instagram w3-hover-opacity"><i classname="fa fa-snapchat w3-hover-opacity"><i classname="fa fa-pinterest-p w3-hover-opacity"><i classname="fa fa-twitter w3-hover-opacity"><i classname="fa fa-linkedin w3-hover-opacity">
                      <p>Powered by <a href="https://www.onevitals.com/accounts/landing.html" target="_blank">OneVitals health Applications</a></p>
                    </i></i></i></i></i></i></footer><i classname="fa fa-facebook-official w3-hover-opacity"><i classname="fa fa-instagram w3-hover-opacity"><i classname="fa fa-snapchat w3-hover-opacity"><i classname="fa fa-pinterest-p w3-hover-opacity"><i classname="fa fa-twitter w3-hover-opacity"><i classname="fa fa-linkedin w3-hover-opacity">
                  </i></i></i></i></i></i></div>
     
  );
}

}

export default Footer;










