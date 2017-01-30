import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

render(
  (
    <Router history={ hashHistory }>
      <Route component={ Capsule }>
        <Route path="/" component={ Landing }/>
        <Route path="/Home" component={ Home }/>
      </Route>
    </Router>
  ),
  document.getElementById("app")
)
