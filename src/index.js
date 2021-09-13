import './style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './component/MyNav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext'

import HomePage from './page/HomePage'
import NotFound from './page/NotFound'
import Wind from './page/Wind'
import Recommend from './page/Recommend'
import MySubNav from './component/MySubNav'
import Concerts from './page/Concerts'
import MessageBoard from './page/MessageBoard'
import UserPage from './page/UserPage'
import Signup from './component/Signup'

import Platform from './page/Platform'
import PlatformVerify from './page/PlatformVerify'
import PlatformConcertVerify from './page/PlatformConcertVerify'
import Verify from './page/Verify'
import VerifyConcert from './page/VerifyConcert'

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>

          <MyNav />
          <MySubNav />
          <div id="mask"></div>

          <Container style={{ minHeight: 'calc(100vh - 230px)' }}>
            <Switch>
              <Route path="/" exact> <HomePage /> </Route>
              <Route path="/wind*"><Wind /></Route>
              <Route path="/verify-*"><Verify /></Route>
              <Route path="/verifyconcert-*"><VerifyConcert /></Route>
              <Route path="/concerts"><Concerts /></Route>
              <Route path="/message-board"><MessageBoard /></Route>
              <Route path="/recommend"><Recommend /></Route>
              <Route path="/userpage"><UserPage /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/platform"><Platform /></Route>
              {/* <Route path="/platform-verify"><PlatformVerify /></Route> */}
              <Route path="/platform-verify-concert"><PlatformConcertVerify /></Route>
              <Route path="*"><NotFound /></Route>
            </Switch>
          </Container>
          <footer> COPYRIGHT © 2021 LR Perussion</footer>
        </AuthProvider>
      </Router>
    </div>
  )
}
ReactDOM.render(<App />, document.querySelector('#root'))