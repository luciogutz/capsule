import React from 'react'
import {browserHistory} from 'react-router'

export default React.createClass({
  // componentDidMount(){
  //   firebase.auth().onAuthStateChanged((user) => {
  //   currentUser["/home/" + user.uid] = {
  //     email: user.email,
  //     name: user.displayName,
  //     picture: user.photoURL
  //    }
  //  })
  // },
  signUserOut() {
    firebase.auth().signOut().then(() => {
      this.setState({
        currentName: "",
        picture: "",
        name: ""
      })
      window.location = '#/'
    })
  },
  onCreateNewCapsule(){
    this.refs.newCapsule.className = "newCapsuleForm"
  },
  getInitialState() {
    return {
      newCapsules: [{
        name: "",
        event: "",
        date: ""
     }]
    }
  },
  onCapsuleFormChange(e) {
    var newCapsuleInput = e.target.value
    this.setState({
      newCapsule: newCapsuleInput
    })
  },

  onNewCapsuleSubmit(e) {
    e.preventDefault()
    var currentNewCapsule = this.state.newCapsule
    console.log(currentNewCapsule)
  },
  render() {
    return(
      <section>
        <header className="header">

            <div className="header__Right">
              <img className="header__UserImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShk3fQJKc47O7qWr-YT41FJzAiUhKMaTXmLBeWdeybwG6a6VslVQ" />
              <p className="header__UserName"> User name </p>
              <button className="signOut" onClick={this.signUserOut}> Sign Out </button>
            </div>
        </header>
        <h1 className="header__Title"> Capsule </h1>
          <button onClick={this.onCreateNewCapsule} className="newCapsule"> + new capsule </button>
          <form onChange={this.onCapsuleFormChange} ref="newCapsule" className="hidden">
            <input className="inputs" type="text" placeholder="Who is this capsule for?"/>
            <input className="inputs" type="text" placeholder="event" />
            <input className="inputs" type="date"/>
            <button onClick={this.onNewCapsuleSubmit} ref="newCapsuleInfo" className="formSubmit"> Submit </button>
          </form>
          </section>
          // <div>
          //   {
          //       this.state.newCapsule.map((capsule, i)=>{
          //         return (
          //           <section key={i}>
          //           <h2>{capsule.name}</h2>
          //           <h4>{capsule.event}</h4>
          //           <h4>{capsule.date}</h4>
          //           </section>
          //         )
          //       })
          //     }
          // </div>


    )
  }
})
