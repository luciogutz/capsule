const provider = new firebase.auth.GoogleAuthProvider()


export function fbOnAuthStateChanged(cb) {
  return firebase.auth().onAuthStateChanged(cb)
}

export function fbUpdateUser(user) {
  firebase.database().ref().update(user)
}

export function fbWhenUserUpdated(uid, cb) {
  firebase.database().ref("/users/" + uid).once("value").then(cb)
}
