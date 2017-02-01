import React from 'react'
import {browserHistory} from 'react-router'

export default React.createClass({
//   componentDidMount(){
//     currentUser["/home/" + user.uid] = {
//       email: user.email,
//       name: user.displayName,
//       picture: user.photoURL
//     }
//   },
  signUserOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        currentName: "",
        picture: "",
        name: ""
      })
      window.location = '#/'
    })
  },

  render() {
    return(
      <section>
        <header>
          <button onClick={this.signUserOut}> Sign Out </button>
        </header>
        <h1>hello</h1>
      </section>
    )
  }
})
