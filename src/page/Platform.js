import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import SongCardContainer from '../component/SongCardContainer'
import { useAuth } from '../contexts/AuthContext'
import { songRef } from '../firebase/myfirebase'


export default function Platform() {
  const { currentUser } = useAuth()
  const history = useHistory()
  const mounted = useRef(false)
  const manager = [
    'lrlrlrpercussion@gmail.com',
    'whwang104@gmail.com',
    'okwap000093@gmail.com',
    's110415009@stu.ntue.edu.tw'
  ]

  const [allSongs, setAllSongs] = useState([])

  const getData = () => {
    if (sessionStorage.getItem('platform-songs')) {
      setAllSongs(JSON.parse(sessionStorage.getItem('platform-songs')))
    } else {

      songRef.orderBy("title").get()
        .then(querySnapshot => {
          let tempAllSongs = []
          querySnapshot.forEach(doc => {
            tempAllSongs = [...tempAllSongs, doc.data()]
          })
          if (mounted.current) { setAllSongs(tempAllSongs) }
          return tempAllSongs
        })
        .then(tempAllSongs => {
          sessionStorage.setItem('platform-songs', JSON.stringify(tempAllSongs))
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
      <Link to="#">
        <input className="r-btn-blue" type="submit" value="樂曲審核" />
      </Link>
      {/* <Link to="/platform-verify">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="推薦樂曲審核" />
      </Link> */}
      <Link to="/platform-verify-concert">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="音樂會宣傳審核" />
      </Link>
      <Link to="/platform-control">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="主控台" />
      </Link>
      <SongCardContainer songs={allSongs} />
    </div>
  )
}
