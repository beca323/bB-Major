import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Pass, NotPass } from './MySvg'
import { Link } from 'react-router-dom'

export default function SongCardContainer({ songs }) {
  return (
    <div className="mt-5">
      {songs.map((song, index) => {
        return (<SongCard song={song} key={index} />)
      })}
    </div>
  )
}

export function SongCard({ song }) {
  const [statusClass, setStatusClass] = useState('')
  const getStatusClass = () => {
    if (song.status === '待審核') {
      setStatusClass('r-btn-second')
    } else if (song.status === '通過') {
      setStatusClass('r-btn-main')
    } else {
      setStatusClass('r-btn-delete')
    }
  }
  useEffect(() => {
    getStatusClass()
  }, [])
  return (
    <Link to={"/verify-" + song.title.replaceAll(' ', '_')}>
      <Card className="p-4 my-2 d-flex justify-content-center" style={{ height: '5rem', cursor: 'pointer' }}>
        <Card.Title>{song.title}</Card.Title>
        <Card.Subtitle>{song.composer}</Card.Subtitle>
        {/* <input className={statusClass} value={song.status} type="submit" style={{ position: 'absolute', right: '0' }} /> */}
        <div style={{ position: 'absolute', right: '20px', top: '20px' }}>
          {song.status === '待審核' ? "待審核" :
            song.status === '通過' ? <Pass /> : <NotPass />
          }
        </div>
      </Card>
    </Link>
  )
}