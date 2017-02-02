import React from 'react'
import {browserHistory} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'

export default React.createClass({
  getDefaultProps() {
    return {
      user: { authed: false }
    }
  },
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
  },
  getInitialState() {
    return {
      Capsule:
      {
        capsuleName: "",
        capsuleEvent: "",
        capsuleDate: "",
        capsules: []
      }
    }
  },
  onCapsuleNameChange(e) {
    var currentCapsuleName = e.target.value
    this.setState({
      capsuleName: currentCapsuleName
    })
  },
  onCapsuleEventChange(e) {
    var currentCapsuleEvent = e.target.value
    this.setState({
      capsuleEvent: currentCapsuleEvent
    })
  },
  onCapsuleDateChange(e) {
    var currentCapsuleDate = e.target.value
    this.setState({
      capsuleDate: currentCapsuleDate
    })
  },

  onNewCapsuleSubmit(e) {
    e.preventDefault()
    var newCapsule = this.state.capsuleDate
    this.refs.selectionArea.insertAdjacentHTML("afterbegin",` <section className="capsule__Unit">
        <div className="div__Capsule--Top">
            <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
        </div>
        <div
          className="div__Capsule--Bottom">
          <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i>
        </div>
      </section>` )
  },

  signUserOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: {
          authed: false,
          name: '',
          email: '',
          picture: '',
          lastLogin: undefined
        }
      })
      window.location = '#/'
    })
  },
  // componentWillMount() {
  //   firebase.database().ref("/leagueData/champions").once("value").then((snapshot) => {
  //     const champListDB = snapshot.val().lolData
  //     this.setState({
  //       champList: champListDB
  //     })
  //   })
  // },
  render() {
    return(
      <section>
          <img className="header__Image" src="http://www.theldsfamilyfellowship.org/wp-content/uploads/2016/06/9807-family-bg.jpg" />
          <h1 className="header__Title"> Capsule </h1>
        <header className="header">
            <div className="header__Right">
              <img className="header__UserImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShk3fQJKc47O7qWr-YT41FJzAiUhKMaTXmLBeWdeybwG6a6VslVQ" />
              <p className="header__UserName"> {this.props.user.email} </p>
              <button className="signOut" onClick={this.signUserOut}> Sign Out </button>
            </div>
        </header>
          <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new capsule </button>
          <form ref="newCapsule" className="hidden">
            <input
              onChange={this.onCapsuleFormChange}
              className="inputs"
              type="text"
              placeholder="Who is this capsule for?"/>
            <input onChange={this.onCapsuleEventChange} className="inputs" type="text" placeholder="event" />
            <input className="inputs" type="date"/>
            <button onClick={this.fireBaseData} ref="newCapsuleInfo" className="formSubmit"> Submit </button>
          </form>
          // <h2>{this.state.capsuleName}</h2>
          // <h4>{this.state.capsuleEvent}</h4>
          // <h4>{this.state.capsuleDate}</h4>
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
