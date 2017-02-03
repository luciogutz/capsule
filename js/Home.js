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
        capsuleName: "",
        capsuleEvent: "",
        capsuleDate: "",
        capsules: []
    }
  },
  onNameChange(e) {
    this.setState({
        capsuleName: e.target.value
    })
  },
  onEventChange(e) {
    this.setState({
      capsuleEvent: e.target.value
    })
  },
  onDateChange(e) {
    this.setState({
      capsuleDate: e.target.value
    })
  },

  onNewCapsuleSubmit(e) {
    e.preventDefault()
    console.log(e);
    this.refs.newCapsule.className = "hidden"
    var newCapsuleName = this.state.capsuleName
    var newCapsuleEvent = this.state.capsuleEvent
    var newCapsuleDate = this.state.capsuleDate
    this.refs.capsuleArea.insertAdjacentHTML("beforebegin", `<section class="capsule__Unit"><h2 class="newCapTitle" >${newCapsuleName}</h2><h3 class="newCapEvent">${newCapsuleEvent}</h3><h3 class="newCapDate">${newCapsuleDate}</h3><div class="div__Capsule--Top"><i class="fa-mine-top fa-bars lines" aria-hidden="true"></i></div><div class="div__Capsule--Bottom">
    <i class="fa-mine-bottom fa-bars lines" aria-hidden="true"></i></div></section>`)
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
          </form>
          <section className="newCapsules__Container">
            <section ref="capsuleArea" className="capsule__Unit">
              <h2 className="newCapTitle" > Lucio's capsule </h2><h3 className="newCapEvent">  football games</h3><h3 className="newCapDate">04/05/2017</h3><div className="div__Capsule--Top"><i className="fa-mine-top fa-bars lines" aria-hidden="true"></i></div><div className="div__Capsule--Bottom">
              <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i></div>
            </section>
          </section>
      </section>
    )
  }
})
