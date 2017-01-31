import React from 'react'
import ajax from 'jquery'
import Reactfire from 'reactfire'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

export default React.createClass({
  componentDidMount() {
   this.setState({provider: new firebase.auth.GoogleAuthProvider()});

   firebase.auth().onAuthStateChanged((user) => {

       var currentUser = {};

       currentUser["/users/" + user.uid] = {
         email: user.email,
         name: user.displayName,
         picture: user.photoURL
       }

       //FIXME: Don't do this until we get data back from DB
       this.setState({
         currentName: user.email,
         name: user.displayName,
         picture: user.photoURL
       })

//      firebase.database().ref().update(currentUser)
//      firebase.database().ref("/users/" + user.uid).once("value").then((snapshot) => {
//        var snapshotReturn = snapshot.val()
     //   this.setState({
     //     currentName: snapshotReturn.email,
     //     name: user.displayName,
     //     picture: user.photoURL
     //   })
     // })

  })
 },
 getInitialState() {
   return {
     provider: () => {},
     currentName: "Not Logged In",
     name: "",
     picture: ""
   }
 },
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
   browserHistory.push("/")
 },
  render() {
    return(
      <section className="welcome">
        <p>{this.state.currentName}</p>
        <img className="nav__currentUserImage" src={this.state.picture} />
        <h1 className="capsule"> CAPSULE </h1>
        <h4 className="subTitle"> Dont let time get away from you. </h4>
        <p className="started"> Let's get started </p>
        <button onClick={this.signUserIn} className="googleSignIn"> Sign in with your Google Account </button>
        <p>{this.state.currentName}</p>
        <button className="googleSignIn" onClick={this.signUserOut}>Sign Out</button>
      </section>
    )
  }
})
