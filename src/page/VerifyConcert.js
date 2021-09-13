import React, { useState, useRef, useEffect } from 'react'
import { concertRef } from '../firebase/myfirebase'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { Loading } from '../component/MySvg'
import { Card } from 'react-bootstrap'

export default function VerifyConcert() {
  const mounted = useRef(false)
  const manager = [
    'lrlrlrpercussion@gmail.com',
    'whwang104@gmail.com',
    'okwap000093@gmail.com',
    's110415009@stu.ntue.edu.tw'
  ]
  const concertName = decodeURIComponent(window.location.pathname.split('verifyconcert-')[1].replaceAll('_', ' '))
  const { currentUser } = useAuth()
  const history = useHistory()
  const [concertData, setConcertData] = useState([])
  const [loading, setLoading] = useState(true)
  const [firestoreDocID, setFirestoreDocID] = useState('')


  const handleCancel = () => { history.push('/platform') }

  const handlePass = () => {
    concertRef.doc(firestoreDocID)
      .set({
        status: '通過'
      }, { merge: true })
      .then(() => {
        sessionStorage.removeItem('platform-concerts')
        history.push('/platform')
      })
  }
  const handleNotPass = () => {
    concertRef.doc(firestoreDocID)
      .set({
        status: '不給過'
      }, { merge: true })
      .then(() => {
        sessionStorage.removeItem('platform-concerts')
        history.push('/platform')
      })
  }
  const getData = () => {
    concertRef.where('title', '==', concertName).limit(1).get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length === 0) { history.push('/') }
        querySnapShot.forEach(doc => {
          setFirestoreDocID(doc.id)
          // tempDocID = doc.id
          if (mounted.current) { setConcertData(doc.data()) }
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
    <div>
      {loading ? <Loading /> :
        <Card className="my-4 ConcertCardsContainer">
          <div className="img-container-bg" >
          </div>
          <div className="img-container" style={{ backgroundImage: 'url(' + concertData.image + ')' }}>
            <img src={concertData.image} alt={concertData.name} style={{ zIndex: '10' }} />
          </div>
          <Card.Body>
            <div>
              <strong>{concertData.date} </strong>
              {concertData.time} {concertData.place}
              <a target="_blank" href={'https://www.google.com/maps/search/?api=1&query=' + concertData.address}>
                <button className="r-btn-second">
                  <i className="fas fa-map-marker-alt" style={{ color: '#2270a9' }}></i> 地圖
                  </button>
              </a>
            </div>
            <a href={concertData.eventlink} style={{ color: '#555' }} target="_blank" className="fw-bold fs-4 my-2">{concertData.title}</a>
            <div>
              <div>
                {concertData.name}
              </div>
              <div style={{ position: 'absolute', right: '10px', bottom: '70px' }}>
                {/* <a href={e.ticketlink}><button className="r-btn-second">更多資訊 </button> </a> */}
                <a href={concertData.ticketlink} target="_blank" style={{ color: '#2270a9' }}> 票價：{concertData.price}</a>
              </div>
            </div>
            <div className="d-flex justify-content-between w-100 mt-4">
              <input className="r-btn-second" value="取消" type="submit" onClick={handleCancel} />
              <div className="d-flex">
                <input className="r-btn-delete" value="不給過" type="submit" onClick={handleNotPass} />
                <input className="r-btn-main" value="通過" type="submit" onClick={handlePass} />
              </div>
            </div>
          </Card.Body>
        </Card>
      }
    </div>
  )
}
