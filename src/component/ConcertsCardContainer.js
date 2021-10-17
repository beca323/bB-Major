import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Pass, NotPass } from './MySvg'

export default function ConcertsCardContainer({ allConcerts }) {
  return (
    <div>
      <div className="mt-5">
        {allConcerts.map((concert, index) => {
          return (<ConcertCard concert={concert} key={index} />)
        })}
      </div>
    </div>
  )
}

export function ConcertCard({ concert }) {
  return (
    <Link to={"/verifyconcert-" + concert.title.replaceAll(' ', '_')}>
      <Card className="p-4 my-2 d-flex justify-content-center" style={{ height: '5rem', cursor: 'pointer' }}>
        <Card.Title>{concert.title}</Card.Title>
        <div style={{ position: 'absolute', right: '20px', top: '20px' }}>
          {concert.status === '待審核' ? "待審核" :
            concert.status === '通過' ? <Pass /> : <NotPass />
          }
        </div>
      </Card>
    </Link>
  )
}