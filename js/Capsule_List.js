import React from 'react'
import {browserHistory} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'

export default React.createClass({
  getDefaultProps() {
    return {
      user: {},
      userID: ''
    }
  },
  getInitialState() {
    return {
      capsules: [],
      images: [],
      capsuleArray: []
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
    console.log(uniqueImageID)
    var imageRef = firebase.storage().ref()
    var imageID = newImageElement.id
    var targetImage = imageRef.child('images/' + imageID + uniqueImageID + '.png')
    var newBase64 = newImageElement.src.replace(/^data:image\/(png|jpeg);base64,/, "")
    targetImage.putString(newBase64, 'base64', {contentType:'image/png'}).then(function(){
      var imageData = {
        storagePath: 'images/' + imageID + uniqueImageID + '.png',
        capsuleID: capsuleID
      }
      console.log(imageData)

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

      Object.keys(currentCapsules).map((capsuleID, i)=> {
        firebase.database().ref("images/" + capsuleID).once("value").then((snapshot)=> {
          const currentCapsuleImages = snapshot.val()

            // console.log(currentCapsuleImages)
          var imgSrc = ""
          Object.keys(currentCapsuleImages).map((imgSrc, i)=> {
              firebase.database().ref("images/" + capsuleID).once("value").then((snapshot)=> {
                const currentImgSrc = snapshot.val()
                console.log(currentImgSrc)
              })
            Object.keys(currentImgSrc).map((ImageRef, i)=> {
              
            })

          })
          // map through currentCapsuleImages
          // imgSrc = image.storagePath
        })
        // .once("value").then...
        //   that will give you each image
        //   then you can go to firebase.storage().ref(<path to image>)
        this.setState({
          capsules: currentCapsules
        })
      })

      // Get images for that capsule from firebase database
      //   2) fire.basebase().ref()
      // })
      // 3) firebase.storage().ref(<path>) to get the image, and then get the download URL (.download_url - check docs)
      //   cap.imgURL = <download url from fb storage ref()>

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

                onClick={this.showImages}
                className="capsule__default--Image"
                data-capsuleID = {i}
                id={"capsuleImage" + i}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}> Add A Photo
                <img src={this.state.capsules[i].imgURL}/>
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
      </section>
    )
  }
})
