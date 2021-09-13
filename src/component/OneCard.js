import React from 'react'
import { Card } from 'react-bootstrap'

export default function OneCard({ cardStates }) {
  return (
    <Card>
      <iframe style={{ opacity: '0.9' }} src={'https://www.youtube.com/embed/' + cardStates.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="iframe-block"></div>
      <Card.Body>
        <div className="fs-4 p-1 comment-counts">
          <i className="far fa-comment-alt"></i>
          {cardStates.commentCount ? cardStates.commentCount : 0}
        </div>
        <Card.Title>{cardStates.title}</Card.Title>
        <div>
          {cardStates.composer}
        </div>
        <div>
          {cardStates.arranger ? <span>(arr. {cardStates.arranger})</span> : <span style={{ opacity: '0' }}>1</span>}
        </div>
      </Card.Body>
    </Card>
  )
}
