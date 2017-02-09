import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Capsule from './Capsule'
import Landing from './Landing'
import Home from './Home'
import Capsule_List from './Capsule_List'

render(
  (
  <Router history={ hashHistory }>
    <Route component={ Capsule }>
      <Route path="/" component={ Landing }/>
      <Route path="/home/:userID" component={ Home }/>
      <Route path="/capsule_list/:userID" component={ Capsule_List }/>
    </Route>
  </Router>
  ),
  document.getElementById("app")
)
