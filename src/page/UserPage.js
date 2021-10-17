import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, useRouteMatch } from 'react-router-dom'
// component
import Signup from '../component/Signup'
import Login from '../component/Login'
import Dashboard from '../component/Dashboard'

export default function UserPage() {
  let { path } = useRouteMatch()
  return (
    <div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Route path={path} exact><Dashboard /></Route>
          <Route path={`${path}/signup`}><Signup /></Route>
          <Route path={`${path}/login`}><Login /></Route>
        </div>
      </Container>
    </div>
  )
}
