import React from 'react'
import { Link } from 'react-router-dom'
import SongCardContainer from '../component/SongCardContainer'

export default function PlatformVerify() {
  const verifySongs = [{
    title: 'The Lion King',
    subtitle: 'Hans Zimmer',
    status: '待審核'
  },
  ]

  return (
    <div>
      <div className="fw-bold my-4">網站後台</div>
      <Link to="/platform">
        <input className="r-btn-second" type="submit" value="所有樂曲" />
      </Link>
      <Link to="#">
        <input className="r-btn-blue" type="submit" style={{ width: 'fit-content' }} value="推薦樂曲審核" />
      </Link>
      <Link to="/platform-verify-concert">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="音樂會宣傳審核" />
      </Link>

      <SongCardContainer songs={verifySongs} />

    </div>
  )
}


