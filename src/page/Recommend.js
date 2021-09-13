import React, { useEffect, useState, useRef } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Tags from '../component/Tags'
import { ensembleRef, songRef } from '../firebase/myfirebase'
import Ensemble from '../component/Ensemble'
import { notnull } from '../others/rrcheck'



export default function Recommend({ setShowRecommend }) {
  const [tags, setTags] = useState([
    { tag: '練了八百遍', select: false },
    { tag: '電影配樂', select: false },
    { tag: '動畫配樂', select: false },
    { tag: '管弦改編', select: false },
    { tag: '協奏曲', select: false },
  ])
  const tagArray = tags.map(item => item.tag)

  const [ensembleSettings, setEnsembleSettings] = useState([])
  const [ensembleSetting, setEnsembleSetting] = useState([])
  const [recommendTitle, setRecommendTitle] = useState('')
  const [recommendComposer, setRecommendComposer] = useState('')
  const [recommendArranger, setRecommendArranger] = useState('')
  const [recommendYoutube, setRecommendYoutube] = useState('')
  const [recommendTags, setRecommendTags] = useState([])
  // const [recommendSettings, setRecommendSettings] = useState([])
  const [suggestTags, setSuggestTags] = useState([])
  const mounted = useRef(false)


  const handleSelectChange = (e) => {
    const ensemble = e.target.value
    setEnsembleSetting(ensembleSettings[ensemble])
  }
  const getEnsemble = () => {
    ensembleRef.get()
      .then((querySnapshot) => {
        let tempSettings = []
        querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          tempSettings = doc.data()
        })

        setEnsembleSettings(tempSettings)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }
  const handleSend = () => {
    console.log(settingArray)
    document.getElementsByClassName('send-recommend-btn')[0].disabled = true
    console.log(settingArray)
    if (notnull(recommendTitle) && notnull(recommendComposer) && notnull(recommendYoutube)) {
      console.log(recommendTitle, recommendComposer, recommendYoutube)
      const tagsOfTheSong = tags.filter(tag => tag.select === true).map(tag => tag.tag)
      const songData = {
        title: recommendTitle,
        composer: recommendComposer,
        arranger: recommendArranger,
        youtube: recommendYoutube,
        status: '待審核',
        timestamp: new Date(),
        tags: tagsOfTheSong,
        setting: settingArray
      }
      // 來存資料庫囉！
      document.getElementsByClassName('Recommend')[0].style.zIndex = '9'
      songRef.doc().set(songData)
        .then(() => {
          console.log("Document successfully written!")
          alert('謝謝推薦！等我們小編審核哦！')
          setShowRecommend(false)
        })
        .catch((error) => {
          console.error("Error writing document: ", error)
        })

    } else {
      alert('欄位不要留白哦 跟你的人生一樣')
    }
  }
  const handleChangeTags = (e) => {
    setRecommendTags(e.target.value)
    let matches = []
    const inputTag = e.target.value
    if (inputTag.length > 0) {
      matches = tagArray.filter((item) => {
        return item.includes(inputTag)
      })
    }
    setSuggestTags([...matches])
  }

  const handleSubmitTags = (e) => {
    e.preventDefault()
    if (tagArray.includes(recommendTags)) return
    setTags(preTags => [{ tag: recommendTags, select: true }, ...preTags])
    setRecommendTags('')
  }

  const handleSelectSuggestTag = (e) => {
    addTag(e.target.innerHTML)
    setRecommendTags('')
  }

  const handleSelect = (e) => {
    addTag(e.target.parentElement.getAttribute('name'))
  }

  const addTag = (tagName) => {
    let tempTags = []
    tags.forEach(tag => {
      if (tag.tag === tagName) {
        tempTags = [...tempTags, { tag: tagName, select: !(tag.select) }]
      } else {
        tempTags = [...tempTags, tag]
      }
    })
    setTags([...tempTags])
  }


  // from ensemble ------
  const [settingArray, setSettingArray] = useState([])
  const [newPart, setNewPart] = useState('')

  const handleAdd = (e) => {
    const nowSetting = settingArray
    nowSetting.reduce((pre, cur) => {
      if (cur.part === e.target.getAttribute('name')) { cur.count += 1 }
      return [...pre, cur]
    }, [])
    setSettingArray([...nowSetting])
  }
  const handleMinus = (e) => {
    const nowSetting = settingArray
    nowSetting.reduce((pre, cur) => {
      if (cur.part === e.target.getAttribute('name')) { cur.count -= 1 }
      cur.count = Math.max(0, cur.count)
      return [...pre, cur]
    }, [])
    setSettingArray([...nowSetting])
  }

  const handleAddPart = (e) => {
    e.preventDefault()
    const checkDuplicate = settingArray.filter(item => item.part === newPart).length > 0
    if (newPart.replaceAll(' ', '') === '') {
      return
    } else if (checkDuplicate) {
      alert('重複了哦')
      return
    }
    setSettingArray(preArray => [...preArray, { part: newPart, count: 1 }])
    setNewPart('')
  }
  // --- from ensemble 
  useEffect(() => {
    getEnsemble()
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return (
    // <Container fluid style={{ padding: '0', position: 'absolute', left: '0', zIndex: '200' }}>
    <div className="Recommend">
      <div className="title text-center">推薦樂曲</div>
      <Container>
        <Row xs="1" md="2">
          <Col>
            <div className="mt-5 fw-bold"> 曲名：</div>
            <input type="text" className="w-100" placeholder="Title" onChange={e => setRecommendTitle(e.target.value)} />

            <div className="mt-5 fw-bold"> 作曲家：</div>
            <input type="text" className="w-100" placeholder="Composer" onChange={e => setRecommendComposer(e.target.value)} />

            <div className="mt-5 fw-bold"> 編曲家：</div>
            <input type="text" className="w-100" placeholder="Composer" onChange={e => setRecommendArranger(e.target.value)} />

            <div className="mt-5 fw-bold"> YouTube Link：</div>
            <input type="text" className="w-100" placeholder="https://youtu.be/..." onChange={e => setRecommendYoutube(e.target.value)} />

            <div className="mt-5 fw-bold"> 風格/關鍵字：</div>
            <form onSubmit={handleSubmitTags}>
              <div className="d-flex align-items-center">
                #
                <input type="text"
                  style={{ width: '100%' }}
                  placeholder="tags"
                  onChange={handleChangeTags}
                  value={recommendTags}
                />
              </div>
              <div className="suggest-area">
                {suggestTags && suggestTags.map((tag, index) => {
                  return (
                    <div key={index}
                      className="suggest-tags p-1 ps-4"
                      onClick={handleSelectSuggestTag}
                    >{tag}</div>
                  )
                })}
              </div>
            </form>
            <br />
            <Tags tags={tags} handleSelect={handleSelect} />
          </Col>
          <Col>
            <div className="mt-5 fw-bold"> 編制：</div>
            <select name="ensemble" id="ensemble" style={{ outline: 'none' }} onChange={handleSelectChange}>
              <option value="-">自訂</option>
              <option value="wind">管樂團</option>
              <option value="strings">弦樂團</option>
              <option value="chamber">室內樂</option>
              <option value="percussion">打擊樂團</option>
              <option value="choir">合唱團</option>
            </select>
            <Ensemble ensembleSetting={ensembleSetting}
              handleAdd={handleAdd}
              handleMinus={handleMinus}
              settingArray={settingArray} setSettingArray={setSettingArray}
              newPart={newPart} setNewPart={setNewPart}
              handleAddPart={handleAddPart} />
          </Col>
        </Row>
        <div className="my-5 d-flex justify-content-center" >
          <input onClick={handleSend} className="r-btn-blue send-recommend-btn" type="submit" value="送出" style={{ width: '150px' }} />
        </div>
      </Container>
    </div>
    // </Container>
  )
}
