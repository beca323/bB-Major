import React, { useEffect, useState, useRef } from 'react'
import { songRef, commentRef } from '../firebase/myfirebase'
import { Card, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Loading } from '../component/MySvg'
import { useAuth } from '../contexts/AuthContext'

export default function Wind() {
  const mounted = useRef(false)

  const songName = decodeURIComponent(window.location.pathname.split('wind')[1].replaceAll('_', ' '))
  const [songData, setSongData] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [songFirestoreDocID, setSongFirestoreDocID] = useState('')
  const [comments, setComments] = useState([])
  const [sendBtnDisable, setSendBtnDisable] = useState(false)


  const { currentUser } = useAuth()
  const history = useHistory()
  const getData = () => {
    let tempDocID = ''
    songRef.where('title', '==', songName).limit(1).get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length === 0) { history.push('/') }
        querySnapShot.forEach(doc => {
          setSongFirestoreDocID(doc.id)
          tempDocID = doc.id
          if (mounted.current) { setSongData(doc.data()) }
        })
        setLoading(false)
      })
      .catch(e => { console.log(e) })
      .then(() => {
        getComments(tempDocID)
      })
  }
  const handleSendComment = (e) => {
    e.preventDefault()
    if (!(commentText.replaceAll(' ', ''))) return
    setSendBtnDisable(true)
    const addcomment = {
      comment: commentText,
      timestamp: new Date,
      username: currentUser.email,
      nickname: sessionStorage.getItem('user-nickname')
    }
    setCommentText('')
    songRef.doc(songFirestoreDocID).collection('comments').doc()
      .set(addcomment)
      .then(() => {
        // console.log("Document successfully written!")
        setSendBtnDisable(false)
        getComments(songFirestoreDocID)
      })
      .catch((error) => {
        console.error("Error writing document: ", error)
      })

    const newComment = {
      title: songData.title,
      comment: commentText,
      timestamp: new Date,
      username: currentUser.email,
      nickname: sessionStorage.getItem('user-nickname')
    }
    commentRef.doc().set(newComment)
  }
  const getComments = (docID) => {
    let tempComment = []
    songRef.doc(docID).collection('comments').orderBy('timestamp').get()
      .then((querySnapShot) => {
        querySnapShot.forEach(doc => {
          // console.log(doc.data())
          tempComment = [doc.data(), ...tempComment]
        })
        setComments([...tempComment])
        return tempComment.length
      }).then(commentCounts => {
        songRef.doc(docID).set({ commentCount: commentCounts }, { merge: true })
      })
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getData()
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <div className="Wind">
      {loading ? <Loading /> :
        <div>
          <div className="fw-bold fs-3 mt-3">{songData.title}</div>
          <div className="fs-5 my-2">
            {songData.composer}
            {songData.arranger ? ' (arr. ' + songData.arranger + ')' : ''}
          </div>
          <Setting songData={songData} />
          <iframe className="my-3" src={'https://www.youtube.com/embed/' + songData.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div className="fw-bold fs-4 my-3">心得分享區</div>
          <div className="r-hr"></div>
          <CommentArea
            currentUser={currentUser}
            handleSendComment={handleSendComment}
            commentText={commentText}
            setCommentText={setCommentText}
            sendBtnDisable={sendBtnDisable} />
          <div className="text-center">分享時請尊重他人，並遵守《<a href="#">社群規範</a>》</div>
          <div className="previous-comments">
            <CommentCard comments={comments} />
          </div>
        </div>
      }
    </div>
  )
}

export function Setting({ songData }) {
  return (
    <div className="d-flex my-2">
      <div className="pe-5">編制：</div>
      <div className="instruments">
        {songData.setting && songData.setting.map((item, index) => {
          return item.count > 1 ?
            <div key={index}>{item.part + ' (x' + item.count + ')'}</div>
            : item.count > 0 ? (
              <div key={index}>{item.part}</div>
            ) : ''
        })}
      </div>
    </div>
  )
}
export function CommentArea({ currentUser, handleSendComment, commentText, setCommentText, sendBtnDisable }) {
  return (
    <div className="comment-area my-3">
      <div className="m-3">
        <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
          <circle cx="30" cy="24" r="11" fill="#C4C4C4" />
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
            <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
          </mask>
          <g mask="url(#mask0)">
            <rect x="12" y="35" width="36" height="36" rx="16" fill="#C4C4C4" />
          </g>
        </svg>
      </div>
      {currentUser ?
        <form onSubmit={handleSendComment} className="comment-area-form">
          <div>
            <div>{sessionStorage.getItem('user-nickname')}</div>
            <textarea className="p-2 w-100" style={{ outline: 'none', border: 'none', borderBottom: '1px solid' }} type="text" placeholder="分享對此樂曲心得" onChange={e => { setCommentText(e.target.value) }} value={commentText} />
          </div>
          <div>
            <div style={{ opacity: '0' }}>a</div>
            <input type="submit" value="留言" disabled={sendBtnDisable} />
          </div>
        </form>
        : <div className="h-100 d-flex align-items-center">留言請先登入</div>
      }
    </div>
  )
}

export function CommentCard({ comments }) {
  const transformSecond = (sec) => {
    let t = new Date(1970, 0, 1)
    t.setSeconds(sec + 28800) // 時差？
    return String(t).split(' GMT')[0]
  }

  return (
    <div>
      {comments && comments.map((comment, i) => {
        return (
          <Card key={i} className="m-1 pe-4 showcomments-card">
            <div className="m-3">
              <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                <circle cx="30" cy="24" r="11" fill="#C4C4C4" />
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
                  <circle cx="30" cy="30" r="30" fill="#E8E8E8" />
                </mask>
                <g mask="url(#mask0)">
                  <rect x="12" y="35" width="36" height="36" rx="16" fill="#C4C4C4" />
                </g>
              </svg>
            </div>
            <div className="px-2 py-3">
              <div>{comment.nickname}</div>
              <div style={{ fontSize: '0.8rem', opacity: '0.5' }}>
                {transformSecond(comment.timestamp.seconds)}
              </div>
              <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{comment.comment}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}