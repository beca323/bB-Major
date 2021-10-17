import React, { useState, useEffect } from 'react'
import OneCard from './OneCard'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function RecentlyAdd({ text, cardStates, searchFn }) {
  const handleSearchContent = () => {
    if (text === '最近新增') {
      searchFn('')
    }
  }
  return (
    <div className="RecentlyAdd mb-5">
      <div className="fs-4 my-2" onClick={handleSearchContent} style={{ cursor: 'pointer' }}>
        {text + ' '} <i className="fs-6 fas fa-chevron-right"></i>
      </div>
      <Row xs={1} md={3}>
        {cardStates.map((cardStates, index) => {
          return (
            <Link to={'/wind' + cardStates.title.replaceAll(' ', '_')} key={index}>
              <Col className="mb-3">
                <OneCard cardStates={cardStates} />
              </Col>
            </Link>
          )
        })}
      </Row>
    </div>
  )
}
