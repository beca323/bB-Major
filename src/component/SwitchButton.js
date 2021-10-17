import React, { useState } from 'react'
import './SwitchButton.css'

export default function SwitchButton({ handleSwitchButton }) {
  const [switchOn, setSwitchOn] = useState(true)
  const toggleSwitch = () => {
    handleSwitchButton()
    setSwitchOn(!switchOn)
  }
  return (
    <div
      className={!switchOn ? 'switch-default' : 'switch-default switch-on'}
      onClick={toggleSwitch} >
      <div></div>
    </div>
  )
}
