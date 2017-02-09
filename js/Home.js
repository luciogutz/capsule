import React from 'react'
import {browserHistory, Link} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'
import Capsule_List from './Capsule_List'

export default React.createClass({
  getDefaultProps() {
    return {
      user: { authed: false,
      uid: 'xx' }
    }
  },
  getCamera() {
    this.refs.cameraContainer.className = "cameraScreen"
    this.refs.snap.className = "snap"
    var video = this.refs.video
    var photo = this.refs.photo

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
  },
  onPhotoSnap (){
    var video = this.refs.video
    var photo = this.refs.photo
    var canvas = this.refs.canvas
    var context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, 640, 480, 0, 0, 700, 575)
    photo.setAttribute('src', canvas.toDataURL("image/png"))

  },
  getInitialState() {
    return {
        userName: "",
        userEmail: "",
        userPicture: "",
        capsuleData: {
            capsuleName: "",
            capsuleEvent: "",
            capsuleDate: "",
            capsuleID: "",
          },
       }
    },
  onFormChange() {
    var UID = this.state.capsuleData.capsuleUID;
    this.setState({
      capsuleData: {
          capsuleName: this.refs.capsuleName.value,
          capsuleEvent: this.refs.capsuleEvent.value,
          capsuleDate: this.refs.capsuleDate.value,
          caspuleID: this.props.params.userID,
      }
    })
  },
  onNewCapsuleSubmit(e) {
    // e.preventDefault()
    // sending data to firebase
    var capsule = this.state.capsuleData
    firebase.database().ref("/capsules/" + this.props.params.userID ).push().update(capsule)
    this.refs.newCapsule.className = "hidden"
    this.refs.capsuleName.value = ""
    this.refs.capsuleEvent.value = ""
    this.refs.capsuleDate.value = ""
  },
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
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
      // FIXME: Need to get capsule data
      var capsules = this.state.capsuleData
//      console.log("CAPSULES: " + capsules)
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
        <header className="header">
            <div className="header__Right">
              <img className="header__UserImage" src={this.state.userPicture}/>
              <p className="header__UserName"> {this.state.userName} </p>
              <button className="signOut" onClick={this.props.signUserOutFunc}> Sign Out </button>
            </div>
        </header>
        <div>
          <h1 className="header__Title"></h1>
          <img className="header__Image" src="https://github.com/luciogutz/capsule/blob/master/photos/PicsArt_02-03-05.56.45.jpg?raw=true" />
        </div>
        <aside className="aside__Wrapper">
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
          <button className="picture__Button" onClick={this.getCamera}>Take a Picture</button>
          <Capsule_List userID={this.props.params.userID}/>
        </aside>
          <div ref="cameraContainer" className="hidden">
            <button className="snap" ref="snap" onClick={this.onPhotoSnap}>Snap</button>
            <video ref="video" className="video" width="700" height="575"></video>
            <canvas className="canvas" ref="canvas" width="700" height="575"></canvas>
            <img id="drag1"
              draggable="true"
              onDragStart={this.props.onDragStart}
              className="photoSnap" ref="photo"/>
          </div>
          <section ref="capsuleArea" className="newCapsules__Container">
          </section>
      </section>
    )
  }
})
