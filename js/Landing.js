import React from 'react'
import ajax from 'jquery'
import Reactfire from 'reactfire'



export default React.createClass({
  getInitialState() {
    return {
      user: "",
      password: ""
    }
  },
  render() {
    return(
      <section className="welcome">
        <h1 className="capsule"> CAPSULE </h1>
        <h4 className="subTitle"> Dont let time get away from you. </h4>
        <p className="started"> Let's get started </p>
        <button className="googleSignIn"> Sign in with your Google Account </button>
        <form className="signInForm">
          <input className="gmail" placeholder="gmail" type="email"/>
          <input className="gmail" placeholder="password" type="password"/>
        </form>
      </section>
    )
  }
})
