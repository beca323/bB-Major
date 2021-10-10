import React, { useEffect, useState, useRef } from 'react'
import { Navbar, Container, Nav, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory, Link } from 'react-router-dom'
import { userRef, songRef, commentRef } from '../firebase/myfirebase'
import useToggle from '../customHooks/useToggle'

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

  const [noti, toggleNoti] = useToggle(false)

  return (
    <Navbar variant="dark" className="r-nav">
      <Container>
        <Navbar.Brand href="/">bB Major</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home"></Nav.Link>
            {currentUser && manager.indexOf(currentUser.email) !== -1 ?
              <div className="d-flex"><i onClick={toggleNoti} className="far fa-bell" style={{ cursor: 'pointer', color: 'white', margin: 'auto 1rem' }}></i><Nav.Link href="/platform">後台</Nav.Link></div> : ''
            }
            {noti ? <Notification /> : ''}
            {/* <Nav.Link href="/userpage">{currentUser && currentUser.email.split('@')[0]}</Nav.Link> */}
            <Nav.Link href="/userpage">{currentUser && username}</Nav.Link>
            <Nav.Link onClick={handleLoginOut}>{loginOut}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export function Notification() {
  const mounted = useRef(false)
  const [comments, setComments] = useState([])
  const getComments = () => {
    if (sessionStorage.getItem('new-comments')) {
      setComments(JSON.parse(sessionStorage.getItem('new-comments')))
    } else {
      commentRef.orderBy('timestamp', 'desc').get()
        .then(querySnapshot => {
          let tempCommentData = []
          querySnapshot.forEach(doc => {
            tempCommentData = [...tempCommentData, doc.data()]
          })
          if (mounted.current) {
            setComments(tempCommentData)
          }
          console.log(tempCommentData)
          return tempCommentData
        })
        .then((tempCommentData) => {
          sessionStorage.setItem('new-comments', JSON.stringify(tempCommentData))
        })
        .catch(error => {
          console.log("Error getting documents: ", error)
        })
    }
  }
  const transformSecond = (sec) => {
    let t = new Date(1970, 0, 1)
    t.setSeconds(sec + 28800) // 時差？
    return String(t).split(' GMT')[0]
  }
  useEffect(() => {
    mounted.current = true
    getComments()
    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <div className="notification" style={{ zIndex: '20' }}>
      <div className="fs-4 text-center">Notification</div>
      {comments.map((item, index) => {
        return (
          <Link to={'/wind' + item.title.replaceAll(' ', '_')} key={index} >
            <Card className="p-2 m-1">
              <div className="d-flex">
                <div style={{
                  margin: 'auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  <i className="far fa-comment-alt" ></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem' }}>{item.title}</div>
                  <div>{item.comment}</div>
                  <div style={{ fontSize: '0.5rem', color: '#aaa' }}> {item.nickname} - {transformSecond(item.timestamp.seconds)}</div>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}