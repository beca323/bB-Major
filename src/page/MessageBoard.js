import React, { useEffect } from 'react'
import { LittleSquare } from '../component/MySvg'

export default function MessageBoard() {

  return (
    <div>
      <div className="py-5 head d-flex justify-content-between" style={{ width: '100%' }}>
        <div className="fs-3">
          <LittleSquare />
          留言板
        </div>
      </div>
      <div className="text-center">
        COMING SOON
      </div>
    </div>
  )
}
