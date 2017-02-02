import React from 'react'
import Reactfire from 'reactfire'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

export default React.createClass({
  getDefaultProps() {
    return {
      user: { authed: false }
    }
  },

  componentDidMount() {
   this.setState({provider: new firebase.auth.GoogleAuthProvider()});

   firebase.auth().onAuthStateChanged((authUser) => {
     if(authUser) {
       window.location = '#/home/' //After successful login, user will be redirected to home.
      }
       var today = new Date()
       var currentUser = {};

       currentUser["/users/" + authUser.uid] = {
          name: authUser.displayName,
          email: authUser.email,
          picture: authUser.photoURL,
          lastLogin: today
        }

     firebase.database().ref().update(currentUser)

     firebase.database().ref("/users/" + user.uid).once("value").then((snapshot) => {
       var snapshotReturn = snapshot.val()
       this.setState({
         currentUser: {
           authed: true,
           email: snapshotReturn.email,
           name: snapshotReturn.Name,
           picture: snapshotreturn.picture,
           lastLogin: snapshotReturn.lastLogin
        }
       })
     })
   })
 },
  signUserIn() {
    firebase.auth().signInWithRedirect(this.state.provider);
    firebase.auth().getRedirectResult().then((result) => {
      if(result.credential) {
        var token = result.credential.accessToken;
      }
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("ERROR authenticating with firebase: " + errorMessage);
      //FIXME: Better logging/error handling
    })
  },
  render() {
    return(
      <section className="welcome">
        <h1 className="capsule"> CAPSULE </h1>
        <h4 className="subTitle"> Dont let time get away from you. </h4>
        <p className="started"> Let's get started </p>
        <button onClick={this.signUserIn} className="googleSignIn"> Sign in with your Google Account </button>
      </section>
    )
  }
})
