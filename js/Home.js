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
    var video = this.refs.video
    var photo = this.refs.photo
    // var context = canvas.getContext('2d')

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

    context.drawImage(video, 0, 0)
    photo.setAttribute('src', canvas.toDataURL("image/png"))
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
    e.preventDefault()
    // sending data to firebase
    var capsule = this.state.capsuleData

    firebase.database().ref("/capsules/" + this.props.params.userID ).push().update(capsule)
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
          <div ref="cameraContainer" className="hidden">
            <video ref="video" className="video" width="600" height="475"></video>
            <canvas className="canvas" ref="canvas" width="600" height="475"></canvas>
            <img className="photoSnap" ref="photo"/>
            <button onClick={this.onPhotoSnap}>Snap</button>
          </div>
          <section ref="capsuleArea" className="newCapsules__Container">
          <Capsule_List />
          </section>

          <Link to={"/capsule_list/" + this.props.params.userID}> See your capsules here </Link>
      </section>
    )
  }
})
