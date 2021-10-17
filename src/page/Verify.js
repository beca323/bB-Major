import React, { useEffect, useState, useRef } from 'react'
import { songRef } from '../firebase/myfirebase'
import { Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Loading } from '../component/MySvg'
import { useAuth } from '../contexts/AuthContext'

export default function Verify() {
  const mounted = useRef(false)
  const manager = [
    'lrlrlrpercussion@gmail.com',
    'whwang104@gmail.com',
    'okwap000093@gmail.com',
    's110415009@stu.ntue.edu.tw'
  ]
  const songName = decodeURIComponent(window.location.pathname.split('verify-')[1].replaceAll('_', ' '))
  const [songData, setSongData] = useState([])
  const [verifiedTitle, setVerifiedTitle] = useState('')
  const [verifiedComposer, setVerifiedComposer] = useState('')
  const [verifiedArr, setVerifiedArr] = useState('')
  const [verifiedYoutube, setVerifiedYoutube] = useState('')
  const [loading, setLoading] = useState(true)
  // const [commentText, setCommentText] = useState('')
  const [songFirestoreDocID, setSongFirestoreDocID] = useState('')
  // const [comments, setComments] = useState([])
  // const [sendBtnDisable, setSendBtnDisable] = useState(false)
  const [settingArray, setSettingArray] = useState([])
  const [newPart, setNewPart] = useState('')

  const { currentUser } = useAuth()
  const history = useHistory()


  const handleNotPass = () => {
    songRef.doc(songFirestoreDocID).set({
      status: '不給過'
    }, { merge: true })
      .then(() => {
        sessionStorage.removeItem('platform-songs')
        history.push('/platform')
      })
  }

  const handleCancel = () => { history.push('/platform') }

  const handlePass = () => {
    const verifiedSongData = {
      title: verifiedTitle ? verifiedTitle : songData.title,
      composer: verifiedComposer ? verifiedComposer : songData.composer,
      arranger: verifiedArr ? verifiedArr : songData.arranger ? songData.arranger : '',
      setting: songData.setting,
      status: '通過'
    }
    console.log('verifiedSongData: ', verifiedSongData)

    songRef.doc(songFirestoreDocID)
      .set(verifiedSongData, { merge: true })
    sessionStorage.removeItem('platform-songs')
    history.push('/platform')
  }

  const handleMinus = (e) => {
    // const nowSetting = (settingArray ? songData.setting : settingArray)
    const nowSetting = songData.setting
    nowSetting.reduce((pre, cur) => {
      if (cur.part === e.target.getAttribute('name')) { cur.count -= 1 }
      cur.count = Math.max(0, cur.count)
      return [...pre, cur]
    }, [])
    setSettingArray([...nowSetting])
  }
  const handleAdd = (e) => {
    // const nowSetting = (settingArray ? songData.setting : settingArray)
    const nowSetting = songData.setting
    nowSetting.reduce((pre, cur) => {
      if (cur.part === e.target.getAttribute('name')) { cur.count += 1 }
      // cur.count = Math.max(0, cur.count)
      return [...pre, cur]
    }, [])
    setSettingArray([...nowSetting])
  }

  const handleAddPart = (e) => {
    e.preventDefault()
    const nowSetting = songData.setting
    const checkDuplicate = nowSetting.filter(item => item.part === newPart).length > 0
    if (newPart.replaceAll(' ', '') === '') {
      return
    } else if (checkDuplicate) {
      alert('重複了哦')
      return
    }
    // setSettingArray(preArray => [...preArray, { part: newPart, count: 1 }])
    songData.setting = [...songData.setting, { part: newPart, count: 1 }]
    setNewPart('')
  }

  const getData = () => {
    songRef.where('title', '==', songName).limit(1).get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length === 0) { history.push('/') }
        querySnapShot.forEach(doc => {
          setSongFirestoreDocID(doc.id)
          // tempDocID = doc.id
          if (mounted.current) { setSongData(doc.data()) }
        })
        setLoading(false)
      })
      .catch(e => { console.log(e) })
  }
  useEffect(() => {
    if (manager.indexOf(currentUser.email) == -1) {
      history.push('/')
    } else {
      getData()
      mounted.current = true
    }
    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <div className="Wind">
      {loading ? <Loading /> :
        <Card className="p-5">
          <input value={verifiedTitle ? verifiedTitle : songData.title}
            className="fw-bold fs-3"
            onChange={e => setVerifiedTitle(e.target.value)} />
          <div className="fs-5 my-2">
            作曲 - <input value={verifiedComposer ? verifiedComposer : songData.composer}
              onChange={e => setVerifiedComposer(e.target.value)} />
          </div>
          <div className="fs-5 my-2">
            改編 - <input value={verifiedArr ? verifiedArr : songData.arranger}
              onChange={e => setVerifiedArr(e.target.value)} />
          </div>
          <div className="fs-5 my-2">
            YT Link -
          <a href={'https://www.youtube.com/watch?v=' + (verifiedYoutube ? verifiedYoutube : songData.youtube)} target="_blank">youtube/watch?v=</a>
            <input value={verifiedYoutube ? verifiedYoutube : songData.youtube} onChange={e => setVerifiedYoutube(e.target.value)} />
          </div>
          <iframe className="my-3" src={'https://www.youtube.com/embed/' + (verifiedYoutube ? verifiedYoutube : songData.youtube)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          {songData.setting && songData.setting.map((item, index) => {
            return (
              <VerifyEnsemble item={item} key={index} handleMinus={handleMinus} handleAdd={handleAdd} />
            )
          })}
          <form onSubmit={handleAddPart} className="d-grid p-2 mb-5">
            <Row>
              <Col style={{ padding: '0' }}>
                <span>
                  <input onChange={e => setNewPart(e.target.value)}
                    type="text" placeholder="樂器名稱"
                    style={{ height: '1.8rem', width: 'calc(100% - 72px)' }} value={newPart}
                  />
                </span>
              </Col>
              <Col xs="auto" className="d-flex justify-content-center align-items-center p-0">
                <input type="submit" value="新增" className="r-btn-second" style={{ height: '1.6rem', position: 'absolute', right: '0' }} />
              </Col>
            </Row>
          </form>
          <div className="d-flex justify-content-between w-100">
            <input className="r-btn-second" value="取消" type="submit" onClick={handleCancel} />
            <div className="d-flex">
              <input className="r-btn-delete" value="不給過" type="submit" onClick={handleNotPass} />
              <input className="r-btn-main" value="通過" type="submit" onClick={handlePass} />
            </div>
          </div>
        </Card>
      }
    </div>
  )
}


export function VerifyEnsemble({ item, handleMinus, handleAdd }) {
  return (
    <div className="d-grid p-2">
      <Row>
        <Col>
          {item.part}
        </Col>
        <Col>
          <span
            name={item.part}
            onClick={handleMinus}
            style={{ cursor: 'pointer' }}>
            <svg name={item.part} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path name={item.part} d="M19.6177 13H5.61768V11H19.6177V13Z" fill="black" />
            </svg>
          </span>
          <span className="px-2"> {item.count} </span>
          <span
            name={item.part}
            onClick={handleAdd}
            style={{ cursor: 'pointer' }}>
            <svg name={item.part} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path name={item.part} d="M19.7451 13H13.7451V19H11.7451V13H5.74512V11H11.7451V5H13.7451V11H19.7451V13Z" fill="black" />
            </svg>
          </span>
        </Col>
      </Row>
    </div>
  )
}