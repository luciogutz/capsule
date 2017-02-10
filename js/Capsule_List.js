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
      capsules: []
    }
  },
  onDrop(e) {
    e.preventDefault()
    var data = e.dataTransfer.getData("text")
    var imageElement = document.getElementById(data)
    var newImageElement = imageElement.cloneNode(true)
    newImageElement.id = e.currentTarget.id
    while (e.currentTarget.firstChild) {
      e.currentTarget.removeChild(e.currentTarget.firstChild)
    }
    e.currentTarget.appendChild(newImageElement)
    newImageElement.className = "capsule__default--Image"
    e.dataTransfer.clearData()

    var imageRef = firebase.storage().ref()
    var imageID = newImageElement.id
    console.log(imageID)
    var targetImage = imageRef.child('images/' + imageID + '.png')
    var newBase64 = newImageElement.src.replace(/^data:image\/(png|jpeg);base64,/, "")
    targetImage.putString(newBase64, 'base64', {contentType:'image/png'}).then(function(){
      console.log('it worked?')
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
      this.setState({
        capsules: currentCapsules
      })
    })
  },
  render() {
    return (
      <section>
        {
          Object.keys(this.state.capsules).map((i)=>
          {
          return(
            <section key={i}
              className="capsule__Unit">
              <h2 className="newCapTitle">{this.state.capsules[i].capsuleName}</h2>
              <h3 className="newCapEvent">{this.state.capsules[i].capsuleEvent}</h3>
              <h3 className="newCapDate">{this.state.capsules[i].capsuleDate}</h3>
              <div
                onClick={this.showImages}
                className="capsule__default--Image"
                id={"capsuleImage" + i}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}>
              </div>
            </section>
           )
         })
        }
      </section>
    )
  }
})
