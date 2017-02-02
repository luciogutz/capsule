import React from 'react'
import { Link } from 'react-router'
import Landing from  './Landing'


export default React.createClass({
  
  getInitialState() {
    return {
      provider: () => {},
      user: {
        authed: false,
        currentName: "",
        name: "",
        picture: "",
        lastLogin: undefined
      }
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
  //  browserHistory.push("/")
 },
  render() {
    return (
      <section>
        { this.props.children }
      </section>
    )
  }
})
