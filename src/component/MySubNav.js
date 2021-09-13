import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const pathname = window.location.pathname
export default function MySubNav() {
  const handleActive = (e) => {
    for (let k = 0; k < 3; k++) {
      const subnavTitle = document.getElementsByClassName('subnav-title')
      if (subnavTitle[k].innerHTML === e.target.innerHTML) {
        subnavTitle[k].classList = subnavTitle[k].classList + ' subnav-active'
      } else {
        subnavTitle[k].classList = 'subnav-title me-4 '
      }
    }
  }
  const checkActive = () => {
    const subnavTitle = document.getElementsByClassName('subnav-title')
    if (pathname === '/') {
      subnavTitle[0].classList += ' subnav-active'
    } else if (pathname === '/concerts') {
      subnavTitle[1].classList += ' subnav-active'
    } else if (pathname === '/message-board') {
      subnavTitle[2].classList += ' subnav-active'
    }
  }
  useEffect(() => {
    checkActive()
  }, [])

  return (
    <div className="MySubNav">
      <Container className=" d-flex">
        <Link to="/" onClick={handleActive} className="subnav-title me-4 " style={{ color: '#3e3e3e' }}  >
          心得分享
        </Link>
        <Link to="/concerts" onClick={handleActive} className="subnav-title me-4 " style={{ color: '#3e3e3e' }}  >
          音樂會資訊
        </Link>
        <Link to="/message-board" onClick={handleActive} className="subnav-title me-4 " style={{ color: '#3e3e3e' }}  >
          留言板
        </Link>
      </Container>
    </div>
  )
}
