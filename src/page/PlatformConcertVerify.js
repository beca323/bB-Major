import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { concertRef } from '../firebase/myfirebase'
import ConcertsCardContainer from '../component/ConcertsCardContainer'


export default function PlatformConcertVerify() {
  const { currentUser } = useAuth()
  const history = useHistory()
  const mounted = useRef(false)
  const manager = [
    'lrlrlrpercussion@gmail.com',
    'whwang104@gmail.com',
    'okwap000093@gmail.com',
    's110415009@stu.ntue.edu.tw'
  ]

  const [allConcerts, setAllConcerts] = useState([])

  const getData = () => {
    if (sessionStorage.getItem('platform-concerts')) {
      setAllConcerts(JSON.parse(sessionStorage.getItem('platform-concerts')))
    } else {

      concertRef.orderBy("date", "desc").get()
        .then(querySnapshot => {
          let tempAllConcerts = []
          querySnapshot.forEach(doc => {
            tempAllConcerts = [...tempAllConcerts, doc.data()]
          })
          if (mounted.current) { setAllConcerts(tempAllConcerts) }
          return tempAllConcerts
        })
        .then(tempAllConcerts => {
          sessionStorage.setItem('platform-concerts', JSON.stringify(tempAllConcerts))
          console.log(tempAllConcerts)
        })
        .catch(error => { console.log("Error getting documents: ", error) })
    }
  }

  useEffect(() => {
    if (!currentUser) {
      history.push('/userpage/login')
    } else if (manager.indexOf(currentUser.email) == -1) {
      history.push('/')
    } else {
      mounted.current = true
      getData()
    }
    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <div>
      <div className="fw-bold my-4">網站後台</div>
      <Link to="/platform">
        <input className="r-btn-second" type="submit" value="樂曲審核" />
      </Link>
      <Link to="#">
        <input className="r-btn-blue" type="submit" style={{ width: 'fit-content' }} value="音樂會宣傳審核" />
      </Link>
      <Link to="/platform-control">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="主控台" />
      </Link>
      <ConcertsCardContainer allConcerts={allConcerts} />
    </div>
  )
}


