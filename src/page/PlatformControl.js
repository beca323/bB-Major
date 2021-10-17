import React from 'react'
import { Link } from 'react-router-dom'
import SwitchButton from '../component/SwitchButton'
import { Card } from 'react-bootstrap'
import { useControl } from '../contexts/ControlContext'

export default function PlatformControl() {
  return (
    <div>
      <div className="fw-bold my-4">網站後台</div>
      <Link to="/platform">
        <input className="r-btn-second" type="submit" value="樂曲審核" />
      </Link>
      <Link to="/platform-verify-concert">
        <input className="r-btn-second" type="submit" style={{ width: 'fit-content' }} value="音樂會宣傳審核" />
      </Link>
      <Link to="#">
        <input className="r-btn-blue" type="submit" style={{ width: 'fit-content' }} value="主控台" />
      </Link>
      <ControlArea />
    </div>)
}

export function ControlArea() {
  const { toggleFirebase } = useControl()
  const handleSwitchButton = () => {
    toggleFirebase()
    alert('Firebase 資料庫 開/關 ')
  }
  return (
    <div>
      <Card className="p-3 m-3">
        <div className="d-flex justify-content-between">
          <div>允許存取 Firebase 資料庫？</div>
          <SwitchButton handleSwitchButton={handleSwitchButton} />
        </div>
      </Card>
    </div>
  )
}