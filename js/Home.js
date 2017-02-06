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
  getCamera() {
    var video = this.refs.video
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d')

    navigator.getMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia ||
                         navigator.oGetUserMedia
    if(navigator.getUserMedia){
      navigator.getUserMedia({video: true}, streamWebCam, throwError)
    }
    function streamWebCam (stream){
      video.src = window.URL.createObjectURL(stream)
      video.play()
    }
    function throwError (e) {
      alert(e.name)
    }
    function snap (){
      canvas.width = video.clientWidth
      canvas.height = video.clientHeight
      context.drawImage(video, 0, 0)
    }
  },
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
  },
  getInitialState() {
    var d = new Date()
    const currentDate = d.toDateString()
    let id = Date.now()
    return {
        userName: "",
        userEmail: "",
        userPicture: "",
        capsuleData: {
          0:{
              capsuleName: "",
              capsuleEvent: "",
              capsuleDate: "",
              capsuleID: "",
              capsuleUID: id
            },

        }
      }
    },
  onFormChange() {
    var UID = this.state.capsuleData[0].capsuleUID;

    this.setState({
      capsuleData: {
        0: {
          capsuleName: this.refs.capsuleName.value,
          capsuleEvent: this.refs.capsuleEvent.value,
          capsuleDate: this.refs.capsuleDate.value,
          caspuleID: this.props.params.userID,
          capsuleUID: UID
        }
      }
    })
  },
  onNewCapsuleSubmit(e) {
    e.preventDefault()
    // sending data to firebase
    var capsuleUserDatabase = {}
    var capsule = this.state.capsuleData
    capsuleUserDatabase["/capsules/" + this.state.capsuleData[0].capsuleUID] = {
      capsule
    }
    firebase.database().ref().update(capsuleUserDatabase)
    this.refs.newCapsule.className = "hidden"
    this.refs.capsuleName.value = ""
    this.refs.capsuleEvent.value = ""
    this.refs.capsuleDate.value = ""
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
      var capsules = capsuleUser.capsules.userInfo
      this.setState({
        userName: updatedUserName,
        userEmail: updatedUserEmail,
        userPicture: updatedUserPicture,
        capsuleData: capsules
      })
    })
  },
  render() {

    return(
      <section>
        <div>
          <h1 className="header__Title"> Capsule </h1>
          <img className="header__Image" src="http://www.theldsfamilyfellowship.org/wp-content/uploads/2016/06/9807-family-bg.jpg" />
          <header className="header">
              <div className="header__Right">
                <img className="header__UserImage" src={this.state.userPicture}/>
                <p className="header__UserName"> {this.state.userName} </p>
                <button className="signOut" onClick={this.props.signUserOutFunc}> Sign Out </button>
              </div>
          </header>
        </div>
          <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new capsule </button>
          <form onChange={this.onFormChange}ref="newCapsule" className="hidden">
            <input
              ref="capsuleName"
              className="inputs"
              type="text"
              placeholder="Who is this capsule for?"/>
            <input
              ref="capsuleEvent"
              className="inputs"
              type="text"
              placeholder="event"/>
            <input
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
          <button onClick={this.getCamera}>Take a Picture</button>
          <video ref="video" className="video"></video>
          <canvas ref="canvas"></canvas>
          <button onClick={this.snap}>Snap</button>
          <section ref="capsuleArea" className="newCapsules__Container">
            {
              Object.keys(this.state.capsuleData).map((i, capsule) => {
                var newCapsule = this.state.capsuleData
                if( newCapsule[i].capsuleName === ""){

                  return <h2> Create your new Capsule above </h2>
                } else {
                  console.log(this.state.capsuleData);
                return <section className="capsule__Unit" key={i}>
                          <h2 className="newCapTitle" >{newCapsule[i].capsuleName}</h2>
                          <h3 className="newCapEvent">{newCapsule[i].capsuleEvent}</h3>
                          <h3 className="newCapDate">{newCapsule[i].capsuleDate}</h3>
                          <div className="div__Capsule--Top">
                            <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
                          </div>
                          <div className="div__Capsule--Bottom">
                            <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i>
                          </div>
                        </section>
                 }
              })
            }
          </section>
      </section>
    )
  }
})
