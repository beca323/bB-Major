import React, { useContext, useState, useEffect, useRef } from "react"
import { controlRef } from "../firebase/myfirebase"

const ControlContext = React.createContext()

export function useControl() {
  return useContext(ControlContext)
}

export function ControlProvider({ children }) {
  const [firebaseOpen, setFirebaseOpen] = useState(false)

  function closeFirebase() {
    setFirebaseOpen(false)
  }
  function openFirebase() {
    setFirebaseOpen(true)
  }

  function toggleFirebase() {
    setFirebaseOpen(!firebaseOpen)
  }



  const getControlStatus = () => {
    controlRef.doc('control').get()
      .then((doc) => {
        // console.log(doc.data().all)
        setFirebaseOpen(doc.data().all)
      }).catch((error) => {
        console.log("Error getting document:", error)
      })
  }

  const closeWebsiteRef = useRef(false)
  const closeWebsite = () => {
    controlRef.doc('control').onSnapshot(doc => {
      closeWebsiteRef.current = doc.data().closeWebsite
      // console.log(closeWebsiteRef.current)
    })
  }

  useEffect(() => {
    closeWebsite()
    getControlStatus()
  }, [])

  const value = {
    firebaseOpen,
    openFirebase,
    closeFirebase,
    toggleFirebase,
    closeWebsiteRef
  }

  return (
    <ControlContext.Provider value={value}>
      {children}
    </ControlContext.Provider>
  )
}