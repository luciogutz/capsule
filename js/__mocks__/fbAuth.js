const provider = {}


export function fbOnAuthStateChanged(cb) {
  return cb()
}

export function fbUpdateUser(user) {
  //FIXME: Do we need to mock out database?
}

export function fbWhenUserUpdated(uid, cb) {
  cb()
}
