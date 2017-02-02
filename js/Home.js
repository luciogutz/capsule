import React from 'react'
import {browserHistory} from 'react-router'

export default React.createClass({
  // componentDidMount(){
  //   firebase.auth().onAuthStateChanged((user) => {
  //   currentUser["/home/" + user.uid] = {
  //     email: user.email,
  //     name: user.displayName,
  //     picture: user.photoURL
  //    }
  //  })
  // },
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
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
  },
  getInitialState() {
    return {
        capsuleName: "",
        capsuleEvent: "",
        capsuleDate: ""
    }
  },
  onCapsuleFormChange(e) {
    var newCapsuleInput = e.target.value
    this.setState({
      capsuleName: newCapsuleInput.capsuleName,
      capsuleEvent: newCapsuleInput.capsuleEvent,
      capsuleDate: newCapsuleInput.capsuleDate
    })
    console.log(capsuleName)
  },

  onNewCapsuleSubmit(e) {
    e.preventDefault()
    var currentNewCapsule = this.state.newCapsuleInput
    console.log(currentNewCapsule);
  },
  render() {
    return(
      <section>
          <img className="header__Image" src="http://www.theldsfamilyfellowship.org/wp-content/uploads/2016/06/9807-family-bg.jpg" />
          <h1 className="header__Title"> Capsule </h1>
        <header className="header">
            <div className="header__Right">
              <img className="header__UserImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShk3fQJKc47O7qWr-YT41FJzAiUhKMaTXmLBeWdeybwG6a6VslVQ" />
              <p className="header__UserName"> User name </p>
              <button className="signOut" onClick={this.signUserOut}> Sign Out </button>
            </div>
        </header>
          <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new capsule </button>
          <form onChange={this.onCapsuleFormChange} ref="newCapsule" className="hidden">
            <input className="inputs" type="text" placeholder="Who is this capsule for?"/>
            <input className="inputs" type="text" placeholder="event" />
            <input className="inputs" type="date"/>
            <button onClick={this.onNewCapsuleSubmit} ref="newCapsuleInfo" className="formSubmit"> Submit </button>
          </form>
          <section className="capsule__Unit">
              <div className="div__Capsule--Top">
                  <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
              </div>
              <div
                className="div__Capsule--Bottom">
                <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i>
              </div>
          </section>
          </section>
    )
  }
})
