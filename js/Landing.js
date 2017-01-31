import React from 'react'
import ajax from 'jquery'
import Reactfire from 'reactfire'
import { Link } from 'react-router'


export default React.createClass({
  getInitialState() {
    return {
      provider: () => {},
      currentName: "Not logged in",
      name: "",
      picture: ""
    }
  },
  componentDidMount() {
    this.setState({provider: new firebase.auth.GoogleAuthProvider()})
  },
  signUserIn() {
    firebase.auth().signInWithRedirect(this.state.provider)
    firebase.auth().getRedirectResult().then((result) => {
      if(result.credential) {
        var token = result.credential.accessToken
      }
      var user = result.user
    }).catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      var email = error.email
      var credential = error.credential
      console.log("ERROR authenticating with firebase: " + errorMessage)
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
        <p>{this.state.currentName}</p>
      </section>
    )
  }
})
