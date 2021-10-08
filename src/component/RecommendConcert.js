import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function RecommendConcert() {
  const [concertDate, setConcertDate] = useState('')
  const [concertTitle, setConcertTitle] = useState('')
  const [concertTime, setConcertTime] = useState('')
  const [concertBand, setConcertBand] = useState('')
  const [concertWebsite, setConcertWebsite] = useState('')
  const [concertTicket, setConcertTicket] = useState('')
  const [concertBanner, setconcertBanner] = useState('')
  const [concertPrice, setConcertPrice] = useState('')



  const handleSend = () => {
    document.getElementsByClassName('RecommendConcert')[0].style.zIndex = '9'
    const concertData = {
      title: concertTitle,
      date: concertDate,
      time: concertTime,
      band: concertBand,
      website: concertWebsite,
      ticket: concertTicket,
      banner: concertBanner,
      price: concertPrice
    }
    console.log(concertData)
  }
  const handleClickAdd = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const fileUploader = document.getElementById("fileUploader")
    fileUploader.click()
  }
  const handleFiles = (e) => {
    // const file = files[0]
    const file = e.target.files[0]
    const imageType = /image.*/

    if (!file.type.match(imageType)) { return }
    let img
    if (!document.getElementsByClassName('img-preview')[0]) {
      img = document.createElement("img")
      img.classList.add("img-preview")
      document.getElementsByClassName('upload_zone_text')[0].style.display = 'none'
    } else {
      img = document.getElementsByClassName('img-preview')[0]
    }
    img.file = file
    const dropbox = document.getElementById("upload_zone")
    dropbox.appendChild(img)

    const reader = new FileReader()
    reader.onload = (e => img.src = e.target.result)
    reader.readAsDataURL(file)
  }
  return (
    <div className="RecommendConcert" >
      <div className="title text-center">我要宣傳</div>
      <Container>
        <Row xs="1" md="2">
          <Col>
            <div className="mt-5 fw-bold"> 日期：</div>
            <input onChange={e => { setConcertDate(e.target.value) }} type="date" className="w-100" placeholder="date" />

            <div className="mt-5 fw-bold"> 音樂會名稱：</div>
            <input onChange={e => { setConcertTitle(e.target.value) }} type="text" className="w-100" placeholder="title" />

            <div className="mt-5 fw-bold"> 時間：</div>
            <input onChange={e => { setConcertTime(e.target.value) }} type="time" className="w-100" placeholder="https://youtu.be/..." />

            <div className="mt-5 fw-bold"> 演出單位/演出者：</div>
            <input onChange={e => { setConcertBand(e.target.value) }} type="text" className="w-100" placeholder="" />

            <div className="mt-5 fw-bold"> 官方宣傳網站：</div>
            <input onChange={e => { setConcertWebsite(e.target.value) }} type="text" className="w-100" placeholder="" />
          </Col>
          <Col>
            <div className="mt-5 fw-bold"> 票價：</div>
            <input onChange={e => { setConcertPrice(e.target.value) }} type="text" className="w-100" placeholder="" />

            <div className="mt-5 fw-bold"> 售票網站：</div>
            <input onChange={e => { setConcertTicket(e.target.value) }} type="text" className="w-100" placeholder="" />

            <div className="mt-5 fw-bold"> Banner 上傳：</div>
            <input style={{ display: 'none' }} id="fileUploader" onChange={handleFiles} type="file" className="w-100" placeholder="" />
            <div id="upload_zone" className="upload_zone" onClick={handleClickAdd}>
              <div className="upload_zone_text">＋新增圖片</div>
            </div>
          </Col>
        </Row>
        <div className="my-5 d-flex justify-content-center" >
          <input onClick={handleSend} className="r-btn-blue" type="submit" value="送出" style={{ width: '150px' }} />
        </div>
      </Container>
    </div>
  )
}
