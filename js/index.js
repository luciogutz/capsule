import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Capsule from './Capsule'
import Landing from './Landing'
import Home from './Home'

render(
  (
    <Router history={ hashHistory }>
      <Route component={ Capsule }>
        <Route path="/" component={ Landing }/>
        <Route path="/home/" component={ Home }/>
      </Route>
    </Router>
  ),
  document.getElementById("app")
)
