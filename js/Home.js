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
        userName: "",
        userEmail: "",
        userPicture: "",
        capsuleData: {
          capsuleName: "",
          capsuleEvent: "",
          capsuleDate: ""
        }
      }
    },
  onNameChange(e) {
    var currentCapsuleName = e.target.value
    this.setState({
      capsuleData: {
        capsuleName: currentCapsuleName
      }
    })
  },
  onEventChange(e) {
    var currentCapsuleEvent = e.target.value
    this.setState({
      capsuleData: {
        capsuleEvent: currentCapsuleEvent
      }
    })
  },
  onDateChange(e) {
    var currentCapsuleDate = e.target.value
    this.setState({
      capsuleData: {
        capsuleDate: currentCapsuleDate
      }
    })
  },
  onNewCapsuleSubmit(e) {
    e.preventDefault()
    console.log(e);
    this.refs.newCapsule.className = "hidden"
    this.refs.capsuleName.value = ""
    this.refs.capsuleEvent.value = ""
    this.refs.capsuleDate.value = ""
    var newCapsuleName = this.state.capsuleData.capsuleName
    var newCapsuleEvent = this.state.capsuleData.capsuleEvent
    var newCapsuleDate = this.state.capsuleData.capsuleDate
    this.refs.capsuleArea.insertAdjacentHTML("beforebegin", `<section class="capsule__Unit"><h2 class="newCapTitle" >${newCapsuleName}</h2><h3 class="newCapEvent">${newCapsuleEvent}</h3><h3 class="newCapDate">${newCapsuleDate}</h3><div class="div__Capsule--Top"><i class="fa-mine-top fa-bars lines" aria-hidden="true"></i></div><div class="div__Capsule--Bottom">
    <i class="fa-mine-bottom fa-bars lines" aria-hidden="true"></i></div></section>`)
    this.updateUsersCapsuleData()
  },

  // sending data to firebase
  updateUsersCapsuleData() {
    var capsuleUserDatabase = {}
    var userInfo = this.state.capsuleData
    capsuleUserDatabase["/users/" + this.props.params.userID + "/capsules/"] = {
      userInfo
    }
    firebase.database().ref().update(capsuleUserDatabase)
  },
  onCancelSubmit(e) {
    this.refs.newCapsule.className = "hidden"
  },
  componentWillMount() {
    firebase.database().ref("/users/" + this.props.params.userID).once("value").then((snapshot) => {
      const capsuleUser = snapshot.val()
      var updatedUserName = capsuleUser.name
      var updatedUserEmail = capsuleUser.email
      var updatedUserPicture = capsuleUser.picture
      this.setState({
        userName: updatedUserName,
        userEmail: updatedUserEmail,
        userPicture: updatedUserPicture
      })
    })
  },
  render() {
    return(
      <section>
          <img className="header__Image" src="http://www.theldsfamilyfellowship.org/wp-content/uploads/2016/06/9807-family-bg.jpg" />
          <h1 className="header__Title"> Capsule </h1>
        <header className="header">
            <div className="header__Right">
              <img className="header__UserImage" src={this.state.userPicture}/>
              <p className="header__UserName"> {this.state.userName} </p>
              <button className="signOut" onClick={this.props.signUserOutFunc}> Sign Out </button>
            </div>
        </header>
          <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new capsule </button>
          <form ref="newCapsule" className="hidden">
            <input
              onChange={this.onNameChange}
              ref="capsuleName"
              className="inputs"
              type="text"
              placeholder="Who is this capsule for?"/>
            <input
              onChange={this.onEventChange}
              ref="capsuleEvent"
              className="inputs"
              type="text"
              placeholder="event" />
            <input
              onChange={this.onDateChange}
              ref="capsuleDate"
              className="inputs"
              type="date"/>
            <button
              onClick={this.onNewCapsuleSubmit}
              ref="newCapsuleInfo"
              className="formSubmit">
              Submit
            </button>
            <button
              onClick={this.onCancelSubmit}
              className="formSubmit">
              Cancel
            </button>
          </form>
          <section className="newCapsules__Container">
            <section ref="capsuleArea" className="capsule__Unit">
              <h2 className="newCapTitle" > Lucio's capsule </h2>
              <h3 className="newCapEvent">  football games</h3>
              <h3 className="newCapDate">04/05/2017</h3>
              <div className="div__Capsule--Top">
                <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
                </div>
              <div className="div__Capsule--Bottom">
                <i className="fa-mine-bottom fa-bars lines" aria-hidden="true">
              </i>
              </div>
            </section>
          </section>
      </section>
    )
  }
})
