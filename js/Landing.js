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
       window.location = '#/home/:userID' //After successful login, user will be redirected to home.
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
       console.log("UID" + authUser.uid)
       this.setState({
         currentUser: {
           authed: true,
           email: snapshotReturn.email,
           name: snapshotReturn.Name,
           picture: snapshotReturn.picture,
           lastLogin: snapshotReturn.lastLogin,
           uid:authUser.uid
        }
       })
     })
   })
 },
  render() {
    return(
      <section className="welcome">
        <div className="user__Login">
          <h4 className="subTitle"> Sign In </h4>
          <button onClick={this.props.signUserInFunc} className="googleSignIn"> Sign in with Google </button>
          <button onClick={this.props.signUserInFunc} className="facebookSignIn"> Sign with Facebook </button>
        </div>
        <img className="header__Image" src="https://github.com/luciogutz/capsule/blob/master/photos/PicsArt_02-03-05.56.45.jpg?raw=true" />
      </section>
    )
  }
})
