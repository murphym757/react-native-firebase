import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../../../../server/config/config'
import { auth } from '../../../../server/config/config'
import {
    CustomFailureAlert,
    CustomFailureAlertFont,
    CustomSuccessAlert,
    CustomSuccessAlertFont
  } from '../../../../../assets/styles/authScreensStyling';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [notLoggedInCurrentUser, setNotLoggedInCurrentUser ] = useState()
    console.log(currentUser)
    const [isLoading, setIsLoading] = useState(true)

    function signUp(email, password) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return firebase.auth().signOut()
    }

    function resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function successAlert(message) {
        return <CustomSuccessAlert>
        <CustomSuccessAlertFont>{message}</CustomSuccessAlertFont>
      </CustomSuccessAlert>
    }

    function failureAlert(error) {
        return <CustomFailureAlert>
        <CustomFailureAlertFont>{error}</CustomFailureAlertFont>
      </CustomFailureAlert>
    }

    useEffect(() => {
        const unsubcribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsubcribe
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
        successAlert,
        failureAlert
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}