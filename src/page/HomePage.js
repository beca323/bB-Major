import React, { useState, useEffect, useRef } from 'react'
import { Container, InputGroup, Button } from 'react-bootstrap'
import RecentlyAdd from '../component/RecentlyAdd'
import { Link } from 'react-router-dom'
import { songRef } from '../firebase/myfirebase'
import Recommend from './Recommend'
import HomePageTitleandSearch from '../component/HomePageTitleandSearch'

export default function HomePage() {
  const [searchNull, setSearchNull] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [cardStatesRecent, setCardStatesRecent] = useState([])
  const [cardStatesPopular, setCardStatesPopular] = useState([])
  const [cardStatesSearchResult, setCardStatesSearchResult] = useState([])
  const [showSearchResult, setShowSearchResult] = useState(false)
  const [disableSearch, setDisableSearch] = useState(false)
  const [showRecommend, setShowRecommend] = useState()
  const [tags, setTags] = useState([
    { tag: '動漫配樂', select: false },
    { tag: '協奏曲', select: false },
    { tag: '管弦改編', select: false }
  ])

  const mounted = useRef(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (disableSearch == true || searchInput.replaceAll(' ', '') == '') return
    searchFn(searchInput.toUpperCase())
    // setDisableSearch(true)
    // setShowSearchResult(true)
    // setCardStatesSearchResult([])
    // setSearchNull(false)
    // let tempCardStatesSearchResult = []
    // songRef.where("status", "==", "通過").orderBy("title", "asc").get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const firebaseSongTitle = doc.data().title.toUpperCase()
    //       if (firebaseSongTitle.includes(searchInput.toUpperCase())) {
    //         tempCardStatesSearchResult = [...tempCardStatesSearchResult, doc.data()]
    //       }
    //     })
    //     setCardStatesSearchResult(tempCardStatesSearchResult)
    //     setDisableSearch(false)
    //   }).then(() => {
    //     if (tempCardStatesSearchResult.length === 0) {
    //       setSearchNull(true)
    //     }
    //   })
  }
  const searchFn = (searchInput) => {
    setDisableSearch(true)
    setShowSearchResult(true)
    setCardStatesSearchResult([])
    setSearchNull(false)
    console.log(searchInput)
    let tempCardStatesSearchResult = []
    songRef.where("status", "==", "通過").orderBy("title", "asc").get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const firebaseSongTitle = doc.data().title.toUpperCase()
          if (firebaseSongTitle.includes(searchInput)) {
            tempCardStatesSearchResult = [...tempCardStatesSearchResult, doc.data()]
          }
        })
        setCardStatesSearchResult(tempCardStatesSearchResult)
        setDisableSearch(false)
      }).then(() => {
        if (tempCardStatesSearchResult.length === 0) {
          setSearchNull(true)
        }
      })
  }

  const handleSelect = (e) => {
    const tagName = e.target.parentElement.getAttribute('name')
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

  const getSongsData = () => {
    if (sessionStorage.getItem('home-songs')) {
      setCardStatesRecent(JSON.parse(sessionStorage.getItem('home-songs')))
    } else {
      songRef.where("status", "==", "通過").orderBy("timestamp", "desc").limit(3).get()
        .then(querySnapshot => {
          let tempCardStatesRecent = []
          querySnapshot.forEach(doc => {
            tempCardStatesRecent = [...tempCardStatesRecent, doc.data()]
          })
          if (mounted.current) {
            setCardStatesRecent(tempCardStatesRecent)
          }
          return tempCardStatesRecent
        })
        .then((tempCardStatesRecent) => {
          sessionStorage.setItem('home-songs', JSON.stringify(tempCardStatesRecent))
          // console.log('set item', tempCardStatesRecent)
        })
        .catch(error => {
          console.log("Error getting documents: ", error)
        })

    }
  }

  const handleRecommendBtn = () => {
    // if (true) { return }
    if (sessionStorage.getItem('user-nickname') == null) {
      alert('請先登入')
      return
    }
    document.getElementById('mask').classList += ' mask'
    setShowRecommend(true)
    const mask = document.getElementsByClassName('mask')[0]
    mask.addEventListener('click', function hideMask() {
      setShowRecommend(false)
      mask.removeEventListener('click', hideMask)
      mask.classList.remove('mask')
    })
  }

  useEffect(() => {
    mounted.current = true
    getSongsData()
    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <div className="HomePage">
      {showRecommend ? <Recommend setShowRecommend={setShowRecommend} /> : ''}
      <HomePageTitleandSearch tags={tags} setSearchInput={setSearchInput}
        handleSelect={handleSelect} handleSearch={handleSearch}
        handleRecommendBtn={handleRecommendBtn} />
      {showSearchResult ?
        searchNull ?
          <SearchNull handleRecommendBtn={handleRecommendBtn} /> :
          <RecentlyAdd text={'搜尋結果'} cardStates={cardStatesSearchResult} /> :
        <div>
          <RecentlyAdd text={'最近新增'} cardStates={cardStatesRecent} searchFn={searchFn} />
          {/* <RecentlyAdd text={'最多留言'} cardStates={cardStatesPopular} /> */}
        </div>
      }
    </div>
  )
}


export function SearchNull({ handleRecommendBtn }) {
  return (
    <Container className="text-center my-5">
      找不到樂曲？
      <input className="r-btn-blue" type="submit" onClick={handleRecommendBtn} value="我要推薦樂曲" />
    </Container>
  )
}