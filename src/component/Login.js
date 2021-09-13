import React, { useState, useRef, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()

  const history = useHistory()
  const { login, currentUser } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    login(emailRef.current.value, passwordRef.current.value)
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        setError(errorMessage)
      })
    setLoading(false)
  }
  useEffect(() => {
    if (currentUser) {
      history.push('/userpage')
    }
  }, [currentUser])
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">登入</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>密碼</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-secondary" type="submit">登入</Button>
          </Form>
          {/* <div className="w-100 text-center mt-3" style={{ color: '#3e3e3e' }}><Link to="forgot-password">忘記密碼？</Link></div> */}
        </Card.Body>
        <div className="w-100 text-center mt-2" style={{ color: '#3e3e3e' }}>還沒有帳號？點此 <Link to="signup"> 註冊！</Link></div>
      </Card>
    </div>
  )
}
