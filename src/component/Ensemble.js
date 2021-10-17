import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function Ensemble({ handleAddPart, handleMinus, handleAdd, ensembleSetting, settingArray, setSettingArray, newPart, setNewPart }) {

  useEffect(() => {
    let tempMergeArray = new Array()
    for (let i = 0; i < ensembleSetting.length; i++) {
      tempMergeArray.push({
        part: ensembleSetting[i],
        count: 1
      })
    }
    setSettingArray(tempMergeArray)
  }, [ensembleSetting])
  return (
    <div className="EnsembleSettings" >
      {settingArray.map((instrument) => {
        return (
          <Instrument
            key={instrument.part}
            handleAdd={handleAdd} handleMinus={handleMinus}
            instrument={instrument}
          />
        )
      })}
      <Card className="d-grid ps-3 py-3 m-1">
        <form onSubmit={handleAddPart}>
          <Row>
            <Col style={{ padding: '0' }}>
              <span>
                <input onChange={e => setNewPart(e.target.value)}
                  type="text" placeholder="樂器名稱"
                  style={{ height: '1.8rem', width: 'calc(100% - 72px)' }} value={newPart}
                />
              </span>
            </Col>
            <Col xs="auto" className="d-flex justify-content-center align-items-center p-0">
              <input type="submit" value="新增" className="r-btn-second" style={{ height: '1.6rem', position: 'absolute', right: '0' }} />
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  )
}

export function Instrument({ instrument, handleAdd, handleMinus }) {
  return (
    <Card className="d-grid p-3 m-1">
      <Row>
        <Col className="d-flex align-items-center">
          <span>{instrument.part}</span>
        </Col>
        <Col xs="auto" className="d-flex justify-content-center align-items-center ">
          <span
            onClick={handleMinus}
            name={instrument.part}
            style={{ cursor: 'pointer' }}>
            <svg name={instrument.part} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path name={instrument.part} d="M19.6177 13H5.61768V11H19.6177V13Z" fill="black" />
            </svg>
          </span>
          <span className="px-2"> {instrument.count} </span>
          <span
            name={instrument.part}
            onClick={handleAdd}
            style={{ cursor: 'pointer' }}>
            <svg name={instrument.part} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path name={instrument.part} d="M19.7451 13H13.7451V19H11.7451V13H5.74512V11H11.7451V5H13.7451V11H19.7451V13Z" fill="black" />
            </svg>
          </span>

        </Col>
      </Row>
    </Card>
  )
}