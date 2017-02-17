import React from 'react'
import {browserHistory} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'
import Modal from './Modal'

export default React.createClass({
  getDefaultProps() {
    return {
      user: {},
      userID: ''
    }
  },
  getInitialState() {
    return {
      capsules: {},
      images: {},
      currentImages: [] // keys: capsuleID, values: imageURL
//    capsuleArray: []
    }
  },
  onDrop(e) {
    e.preventDefault()
    var data = e.dataTransfer.getData("text")
    var imageElement = document.getElementById(data)
    var newImageElement = imageElement.cloneNode(true)
    newImageElement.id = e.currentTarget.id
    var capsuleID = e.currentTarget.dataset.capsuleid
    while (e.currentTarget.firstChild) {
      e.currentTarget.removeChild(e.currentTarget.firstChild)
    }
    e.currentTarget.appendChild(newImageElement)
    newImageElement.className = "capsule__default--Image"
    e.dataTransfer.clearData()

    var uniqueImageID = new Date().getTime() + Math.random();
    var imageRef = firebase.storage().ref()
    var imageID = newImageElement.id
    var targetImage = imageRef.child('images/' + imageID + uniqueImageID + '.png')
    var newBase64 = newImageElement.src.replace(/^data:image\/(png|jpeg);base64,/, "")
    targetImage.putString(newBase64, 'base64', {contentType:'image/png'}).then(function(){
      var imageData = {
        storagePath: 'images/' + imageID + uniqueImageID + '.png',
        capsuleID: capsuleID
      }

      firebase.database().ref('images/' + capsuleID).push().update(imageData)
    })
  },
  onDragOver(e){
    e.preventDefault()
  },
  componentDidMount() {
    var component = this
    var userID
    if (component.props.params) {
      userID = component.props.params.userID
    }
    else {
      userID = component.props.userID
    }

    firebase.database().ref("/capsules/" + userID).once("value").then((snapshot) => {
      const currentCapsules = snapshot.val()
      var parent = this

      this.setState({capsules: currentCapsules})

      Object.keys(currentCapsules).map((capsuleID, i)=> {

        firebase.database().ref("images/" + capsuleID).once("value").then((snapshot)=> {
          var currentCapsuleImages = snapshot.val()
          currentCapsuleImages = currentCapsuleImages || {}
            // console.log(currentCapsuleImages)

          var imgSrc = ""
          Object.keys(currentCapsuleImages).map((imageId, i)=> {

            var storagePath = currentCapsuleImages[imageId].storagePath
            //console.log(currentCapsuleImages[imageId].storagePath)
            firebase.storage().ref(storagePath).getDownloadURL().then((url) => {
              var tmpImages = this.state.images
              tmpImages[capsuleID] = url
              this.setState({images: tmpImages})
           })
         })
       })
     })
   })
  },
  onCapsuleClick(e) {
    this.setState({
      currentImages: []
    })
    var capsuleID = e.currentTarget.dataset.capsuleid
    firebase.database().ref("images/" + capsuleID).once("value").then((snapshot)=> {
      var currentCapsuleImages = snapshot.val()
      currentCapsuleImages = currentCapsuleImages || {}
      console.log(currentCapsuleImages)

      Object.keys(currentCapsuleImages).map((imageId, i)=> {
        var storagePath = currentCapsuleImages[imageId].storagePath
        console.log("!!!!", storagePath)
        firebase.storage().ref(storagePath).getDownloadURL().then((url) => {
          var Images = this.state.currentImages
          Images.push(url)
          //tmpImages[capsuleID] = url
          this.setState({currentImages: Images})
       })
     })
   })
  },
  render() {
    return (
      <section className="capsule__Container">
        {
          Object.keys(this.state.capsules).map((i)=>
          {
          return(
            <section key={i}
              className="capsule__Unit">
              <div

                onClick={this.onCapsuleClick}
                className="capsule__default--Image"
                data-capsuleID = {i}
                id={"capsuleImage" + i}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}>
                <img className="loadedImage" src={this.state.images[i]}/>
              </div>
              <article className="capsule__Info">
                <h2 className="newCapTitle">{this.state.capsules[i].capsuleName}</h2>
                <h3 className="newCapEvent">{this.state.capsules[i].capsuleEvent}</h3>
                <h3 className="newCapDate">{this.state.capsules[i].capsuleDate}</h3>
              </article>
            </section>
           )
         })
        }
      <section className="modalWrapper">
        {
          this.state.currentImages.map((image, i)=>
          {
            return (
              <section key={i}>
                <div className="imageModal"><img className= "imageModalThumbnail" src={image}/>
                </div>
              </section>
            )
          })
        }
      </section>
      </section>
    )
  }
})
