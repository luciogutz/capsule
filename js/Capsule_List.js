import Rreact from 'react'
import {browserHistory} from 'react-router'
import Reactfire from 'reactfire'
import Firebase from 'firebase'

export default React.createClass({
  getInitailState() {
    return {
      capsuleData: {
          capsuleName: "",
          capsuleEvent: "",
          capsuleDate: "",
          capsuleID: "",
      }
    }
  },
  componentWillMount() {
    
  },




//
//   var userId = firebase.auth().currentUser.uid;
//   return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = snapshot.val().username;
// });
  render() {
    return (
      <section>

      </section>
    )
  }
})
