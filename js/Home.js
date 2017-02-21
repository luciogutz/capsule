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
  componentDidMount() {
    this.refs.cameraContainer.className = "cameraScreen"
    this.refs.snap.className = "snap"
    this.refs.photoModal.className = "hidden"

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
    this.refs.photoModal.className = "photoModal"
  },
  onRetakeSubmit() {
    this.refs.photoModal.className = "hidden"
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
  onUploadPhotoChange(e) {
    var fileUpload = e.target
    var files = fileUpload.files
    var fr = new FileReader()
    var comp = this
    fr.onload = function () {
      comp.refs.photo.src = fr.result
    }
    fr.readAsDataURL(files[0])

    this.refs.photoModal.className = "photoModal"
    this.refs.uploadPhoto.value = ""
  },
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
  },
  onCancelSubmit(e) {
    e.preventDefault()
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
            <img
               className="logo__Image"
               src="https://github.com/luciogutz/capsule/blob/master/photos/Screen%20Shot%202017-02-11%20at%2011.55.48%20PM.png?raw=true" />
             <aside className="aside__Wrapper">
                 <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new cAPPsule </button>
                 <form onChange={this.onFormChange}ref="newCapsule" className="hidden">
                   <input
                     ref="capsuleName"
                     className="inputs hvr-border-fade"
                     type="text"
                     placeholder="Who is this capsule for?"/>
                   <input
                     ref="capsuleEvent"
                     className="inputs hvr-border-fade"
                     type="text"
                     placeholder="event"/>
                   <input
                     ref="capsuleDate"
                     className="inputs hvr-border-fade"
                     type="date"/>
                   <button
                     onClick={this.onNewCapsuleSubmit}
                     ref="newCapsuleInfo"
                     className="formSubmit hvr-border-fade">
                     Submit
                   </button>
                   <button
                     onClick={this.onCancelSubmit}
                     className="formSubmit hvr-border-fade">
                     Cancel
                   </button>
                 </form>
               </aside>
            <div className="upload__Div"> Upload your own photo </div>
            <input onChange={this.onUploadPhotoChange} ref="uploadPhoto" className="upload__Photo" type="file" placeholder="upload your photo"/>
            <div className="header__Right">
              <img className="header__UserImage" src={this.state.userPicture}/>
              <p className="header__UserName"> {this.state.userName} </p>
              <button className="signOut hvr-grow" onClick={this.props.signUserOutFunc}> Sign Out </button>
            </div>
        </header>

        <section className="capsule__display">
          <Capsule_List userID={this.props.params.userID}/>
        </section>
          <div ref="cameraContainer" className="cameraScreen">
            <button className="snap" ref="snap" onClick={this.onPhotoSnap}>Snap</button>
            <video ref="video" className="video" width="90%" height="auto"></video>
            <canvas className="canvas" ref="canvas" width="700" height="575"></canvas>
          </div>
          <section ref="photoModal" className="photoModal">
            <article className="photoDisplay">
            <div className="imageSnapDiv">
              <h3 ref="dragNdrop" className="dragNdrop"> Just Drag n Drop </h3>
              <p className="or"> OR </p>
              <button onClick={this.onRetakeSubmit} ref="retake" className="retake hvr-grow"> Retake Pic </button>
              <button onClick={this.onRetakeSubmit} className="close__Image--snap hvr-border-fade">X</button>
            </div>
              <img
                id="drag1"
                draggable="true"
                onDragStart={this.props.onDragStart}
                className="photoSnap hvr-grow"
                ref="photo"/>
            </article>
          </section>
      </section>
    )
  }
})
