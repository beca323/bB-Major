import React, { useContext, useState, useEffect } from "react"
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

  const value = {
    firebaseOpen,
    openFirebase,
    closeFirebase,
    toggleFirebase
  }

  const getControlStatus = () => {
    controlRef.doc('control').get()
      .then((doc) => {
        console.log(doc.data().all)
        setFirebaseOpen(doc.data().all)
      }).catch((error) => {
        console.log("Error getting document:", error)
      })
  }

  useEffect(() => {
    getControlStatus()
  }, [])

  return (
    <ControlContext.Provider value={value}>
      {children}
    </ControlContext.Provider>
  )
}