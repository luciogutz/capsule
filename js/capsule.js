import React from 'react'
import { Link } from 'react-router'
import Landing from  './Landing'
import Footer from './Footer'

export default React.createClass({

  getInitialState() {
    return {
      provider: () => {},
      user: {
        authed: false,
        currentName: "",
        name: "",
        picture: "",
        lastLogin: undefined,
        uid: ""
      }
    }
  },
  componentDidMount() {
   this.setState({provider: new firebase.auth.GoogleAuthProvider()});

   firebase.auth().onAuthStateChanged((authUser) => {
     if(authUser) {
       window.location = `#/home/${authUser.uid}` //After successful login, user will be redirected to home.
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

     firebase.database().ref("/users/" + authUser.uid).once("value").then((snapshot) => {
       var snapshotReturn = snapshot.val()
       this.setState({
         currentUser: {
           authed: true,
           email: snapshotReturn.email,
           name: snapshotReturn.Name,
           picture: snapshotReturn.picture,
           lastLogin: snapshotReturn.lastLogin,
           uid: authUser.uid
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
 signUserOut() {
   firebase.auth().signOut().then(() => {
     this.setState({
       user: {
         authed: false,
         name: '',
         email: '',
         picture: '',
         lastLogin: undefined,
         uid: ''
       }
     })
     window.location = '#/'
   })
 },
 onDragStart(e){
   e.dataTransfer.setData("text", e.target.id)
 },
  render() {

    return (
      <section>
        {React.cloneElement(this.props.children, {
        onDragStart: this.onDragStart,
        signUserInFunc: this.signUserIn,
        signUserOutFunc: this.signUserOut,
        user: this.state.user})}
      <Footer />
      </section>
    )
  }
})
