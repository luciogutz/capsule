import React from 'react'
import ajax from 'jquery'
import Reactfire from 'reactfire'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

export default React.createClass({
  getInitialState() {
    return {
      provider: () => {},
      currentName: "",
      name: "",
      picture: ""
    }
  },
  componentDidMount() {
   this.setState({provider: new firebase.auth.GoogleAuthProvider()});

   firebase.auth().onAuthStateChanged((user) => {
     if(user) {
       window.location = '#/home/' //After successful login, user will be redirected to home.
        }
       var today = new Date()
       var currentUser = {};
       currentUser["/users/" + user.uid] = {
         email: user.email,
         name: user.displayName,
         picture: user.photoURL
       }

       this.setState({
         currentName: user.email,
         name: user.displayName,
         picture: user.photoURL,
         lastLogin: today
       })

     firebase.database().ref().update(currentUser)
     firebase.database().ref("/users/" + user.uid).once("value").then((snapshot) => {
       var snapshotReturn = snapshot.val()
       this.setState({
         currentName: snapshotReturn.email,
         name: user.displayName,
         picture: user.photoURL,
         lastLogin: snapshotReturn.lastLogin
       })
     })
   })
 },

//  signUserOut() {
//    firebase.auth().signOut().then(() => {
//      this.setState({
//        currentName: "",
//        picture: "",
//        name: ""
//      })
//      // browserHistory.push('/')
//    })
// },

 signUserIn() {
   firebase.auth().signInWithRedirect(this.state.provider);
   firebase.auth().getRedirectResult().then((result) => {
     if(result.credential) {
       var token = result.credential.accessToken;
     }
     var user = result.user;
   }).catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     var email = error.email;
     var credential = error.credential;
     console.log("ERROR authenticating with firebase: " + errorMessage);
     //FIXME: Better logging/error handling
   })
  //  browserHistory.push("/")
 },
  render() {
    return(
      <section className="welcome">
        <p>{this.state.currentName}</p>
        <h1 className="capsule"> CAPSULE </h1>
        <h4 className="subTitle"> Dont let time get away from you. </h4>
        <p className="started"> Let's get started </p>
        <button onClick={this.signUserIn} className="googleSignIn"> Sign in with your Google Account </button>
      </section>
    )
  }
})
