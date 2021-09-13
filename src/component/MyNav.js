import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { userRef } from '../firebase/myfirebase'


const manager = ['lrlrlrpercussion@gmail.com', 'whwang104@gmail.com', 'okwap000093@gmail.com', 's110415009@stu.ntue.edu.tw']
export default function MyNav() {

  const [loginOut, setLoginOut] = useState('登入/註冊')
  const [username, setUsername] = useState('')
  const history = useHistory()
  const { currentUser, logout } = useAuth()
  const handleLoginOut = () => {
    logout().then(() => {
      history.push('/userpage/login')
      sessionStorage.removeItem('user-nickname')
    })
  }

  const storeUserInfo = () => {
    userRef.doc(currentUser.email).get()
      .then((doc) => {
        // console.log(doc.data().nickname)
        sessionStorage.setItem('user-nickname', doc.data().nickname)
      })
      .catch((e) => {
        // console.log('error', e)
        sessionStorage.setItem('user-nickname', currentUser.email.split('@')[0])
      })
      .then(() => {
        getUsername()
      })
  }
  const getUsername = () => {
    if (sessionStorage.getItem('user-nickname')) {
      setUsername(sessionStorage.getItem('user-nickname'))
    } else {
      setUsername(currentUser.email.split('@')[0])
    }
  }

  useEffect(() => {
    if (!currentUser) {
      setLoginOut('註冊/登入')
    } else {
      setLoginOut('登出')
      storeUserInfo()
    }
  }, [currentUser])

  return (
    <Navbar variant="dark" className="r-nav">
      <Container>
        <Navbar.Brand href="/">bB Major</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home"></Nav.Link>
            {currentUser && manager.indexOf(currentUser.email) !== -1 ?
              <Nav.Link href="/platform">後台</Nav.Link> : ''
            }
            {/* <Nav.Link href="/userpage">{currentUser && currentUser.email.split('@')[0]}</Nav.Link> */}
            <Nav.Link href="/userpage">{currentUser && username}</Nav.Link>
            <Nav.Link onClick={handleLoginOut}>{loginOut}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
