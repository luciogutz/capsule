import React from 'react'
import {browserHistory} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'

export default React.createClass({
  getDefaultProps() {
    return {
      user: {}
    }
  },
  getInitailState() {
    return {
      capsules: []
    }
  },

  componentWillMount() {
    var component = this
    console.log("!!!" + this.props.params.userID)
    firebase.database().ref("/capsules/" + this.props.params.userID).once("value").then((snapshot) => {
      const currentCapsules = snapshot.val()

    })
  },


  render() {
    return (
      <section>
      
        <section className="capsule__Unit">
            <h2 className="newCapTitle" ></h2>
            <h3 className="newCapEvent"></h3>
            <h3 className="newCapDate"></h3>
            <div className="div__Capsule--Top">
              <i className="fa-mine-top fa-bars lines" aria-hidden="true"></i>
            </div>
            <div className="div__Capsule--Bottom">
              <i className="fa-mine-bottom fa-bars lines" aria-hidden="true"></i>
            </div>
        </section>
      </section>
    )
  }
})
