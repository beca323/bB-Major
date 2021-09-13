import React, { useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'
import { userRef } from '../firebase/myfirebase'
import { Loading } from './MySvg'

export default function Dashboard() {
  const [error, setError] = useState('')
  // const [userInstrument, setUserInstrument] = useState('出一張嘴')
  const [editmode, setEditmode] = useState(false)
  const [nickName, setNickName] = useState('')
  const [major, setMajor] = useState('')
  const [preNickName, setPreNickName] = useState('')
  const [preMajor, setPreMajor] = useState('')
  const { currentUser } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleSubmitEditBtn = (e) => {
    // console.log('確認按鈕')
    e.preventDefault()
    const mask = document.getElementById('mask')
    mask.classList += ' mask'
    if (editmode === true) {
      // console.log(nickName, major)
      userRef.doc(currentUser.email).set({
        nickname: nickName ? nickName : preNickName,
        major: major
      }).then(() => {
        localStorage.setItem("nickName", nickName ? nickName : preNickName)
        mask.classList = ''
        // setEditmode(false)
        window.location.reload()
      })
    }
  }
  const handleEditBtn = (e) => {
    // console.log('取消按鈕')
    e.preventDefault()
    setEditmode(currentmode => !currentmode)
  }

  const getUserInfo = () => {
    setLoading(true)
    userRef.doc(currentUser.email).get()
      .then((doc) => {
        setPreMajor(doc.data().major ? doc.data().major : '你混哪裡der?')
        setPreNickName(doc.data().nickname ? doc.data().nickname : currentUser.email.split('@')[0])
        setLoading(false)
      }).catch((e) => {
        // console.log(e)
        setPreMajor('你混哪裡der?')
        setPreNickName(currentUser.email.split('@')[0])
        setLoading(false)
      })
  }
  useEffect(() => {
    if (!currentUser) {
      // console.log('未登入')
      history.push('/userpage/login')
    } else {
      getUserInfo()
    }
  }, [])
  return (
    <div>
      {loading ? <Loading /> :
        <Card className="px-4">
          <Card.Title className="text-center my-4">個人資訊</Card.Title>
          {/* <div className="d-flex justify-content-center"> */}
          <div className="r-hr" style={{ opacity: '0.4' }}></div>
          {/* </div> */}
          <Card.Body>
            <form>

              <div className="my-2">
                <strong>電子郵件： </strong>{currentUser && currentUser.email}
              </div>
              <div className="my-2">
                <strong>主修： </strong>{editmode ?
                  <select name="major"
                    value={!major ? preMajor : major}
                    onChange={e => setMajor(e.target.value)}
                    style={{ padding: '2px 20px', border: 'lightgray 1px solid', outline: 'none' }}>
                    <option value="你混哪裡der?">你混哪裡der?</option>
                    <option value="木管">木管</option>
                    <option value="打擊">打擊</option>
                    <option value="銅管">銅管</option>
                    <option value="弦樂">弦樂</option>
                  </select>
                  : preMajor}
              </div>
              <div className="my-2">
                <strong>暱稱： </strong>{editmode ? <input
                  onChange={e => setNickName(e.target.value)}
                  placeholder={preNickName} /> : preNickName}
              </div>
              <div className="justify-content-center d-flex mt-5">
                {/* <input
                onClick={handleEditBtn}
                className="r-btn-second" value={editmode ? "取消" : "編輯個人資訊"} type="submit" /> */}
                {editmode ?
                  <div>
                    <input type="submit" className="r-btn-second"
                      value="確認"
                      onClick={handleSubmitEditBtn} />
                    <input type="submit" className="r-btn-second"
                      value="取消"
                      onClick={handleEditBtn} />
                  </div>
                  :
                  <div>
                    <input type="submit" className="r-btn-second"
                      value="編輯個人資訊"
                      onClick={handleEditBtn} />
                  </div>
                }
              </div>
            </form>

          </Card.Body>
        </Card>
      }

      {/* <div className="w-100 text-center mt-2">
        <Button className="btn-secondary" onClick={handleLogout}>登出</Button>
      </div> */}
    </div>
  )
}
