import React, { useEffect, useState, useRef } from 'react'
import { LittleSquare, Loading } from '../component/MySvg'
import { getCultureData } from '../others/culturedata'
import { Card } from 'react-bootstrap'
import RecommendConcert from '../component/RecommendConcert'
import { concertRef } from '../firebase/myfirebase'


// const today = new Date()
// const todayDate = Number(today.getFullYear() + ''
//   + (today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + ''
//   + (today.getDate() < 9 ? '0' + today.getDate() : today.getDate()))


export default function Concerts() {
  const mounted = useRef(false)
  const [myCultureData, setMyCultureData] = useState([])
  const [showRecommend, setShowRecommend] = useState()
  const [loading, setLoading] = useState(true)

  const handleRecommendBtn = () => {
    document.getElementById('mask').classList += ' mask'
    setShowRecommend(true)
    const mask = document.getElementsByClassName('mask')[0]
    mask.addEventListener('click', function hideMask() {
      setShowRecommend(false)
      mask.removeEventListener('click', hideMask)
      mask.classList.remove('mask')
    })
  }

  const getConcertData = () => {
    concertRef.where("status", "==", "通過").orderBy("date", "asc").limit(3).get()
      .then((querySnapShot) => {
        let tempConcertData = []
        querySnapShot.forEach(doc => {
          tempConcertData = [...tempConcertData, doc.data()]
        })
        if (mounted.current) { setMyCultureData(tempConcertData) }
        setLoading(false)
      })
      .catch(e => { console.log(e) })
  }
  useEffect(() => {
    getConcertData()
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <div>
      {showRecommend ? <RecommendConcert /> : ''}
      <div className="py-5">
        <div className="head d-flex justify-content-between" style={{ width: '100%' }}>
          <div className="fs-3">
            <LittleSquare />
            音樂會
            <span className="fs-1"> 大 </span>
            資訊
          </div>
          <div><input onClick={handleRecommendBtn} className="r-btn-blue" type="submit" value="我要宣傳" /></div>
        </div>
      </div>
      <ConcertCardsContainer myCultureData={myCultureData} loading={loading} />
    </div>
  )
}


export function ConcertCardsContainer({ myCultureData, loading }) {
  return (
    <div>
      {loading ? <Loading /> :
        <div className="ConcertCardsContainer">
          {myCultureData.map((e, index) => {
            return (
              <Card key={index} className="mb-5">
                <div className="img-container-bg" >
                </div>
                <div className="img-container" style={{ backgroundImage: 'url(' + e.image + ')' }}>
                  <img src={e.image} alt={e.name} style={{ zIndex: '8' }} />
                </div>
                <Card.Body>
                  <div>
                    <strong>{e.date} </strong>
                    {e.time} {e.place}
                    <a target="_blank" href={'https://www.google.com/maps/search/?api=1&query=' + e.address}>
                      <button className="r-btn-second">
                        <i className="fas fa-map-marker-alt" style={{ color: '#2270a9' }}></i> 地圖
                      </button>
                    </a>
                  </div>
                  <a href={e.eventlink} style={{ color: '#555' }} target="_blank" className="fw-bold fs-4 my-2">{e.title}</a>
                  <div>
                    <div>
                      {e.name}
                    </div>
                    <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                      {/* <a href={e.ticketlink}><button className="r-btn-second">更多資訊 </button> </a> */}
                      <a href={e.ticketlink} target="_blank" style={{ color: '#2270a9' }}> 票價：{e.price}</a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </div>}
    </div>
  )
}