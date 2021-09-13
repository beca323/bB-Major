import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('與確認密碼不符')
    }

    setError("")
    setLoading(true)
    signup(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // const user = userCredential.user
        setMessage('註冊成功！')
        setLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        setError(errorMessage)
      })
    // setLoading(false)
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">註冊</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>電子郵件</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>密碼</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>確認密碼</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-secondary" type="submit">Sign up</Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2" style={{ color: '#3e3e3e' }}>已有帳號？點此 <Link to="login"> 登入！</Link></div>
      </Card>
    </div>)
}
