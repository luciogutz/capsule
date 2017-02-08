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

  componentDidMount() {
    var component = this
    var userID
    if (component.props.params) {
      userID = component.props.params.userID
    }
    else {
      userID = component.props.userID
    }

    console.log("USERID: " + userID)
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
            <section key={i} className="capsule__Unit">
                <h2 className="newCapTitle">{this.state.capsules[i].capsuleName}</h2>
                <h3 className="newCapEvent">{this.state.capsules[i].capsuleEvent}</h3>
                <h3 className="newCapDate">{this.state.capsules[i].capsuleDate}</h3>
                <div className="div__Capsule--Top">
                  <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
                </div>
                <div className="div__Capsule--Bottom">
                  <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i>
                </div>
            </section>
           )
         })
        }
      </section>
    )
  }
})
