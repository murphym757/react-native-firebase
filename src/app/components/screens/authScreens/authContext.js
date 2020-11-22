import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../../../../server/config/config'
import { auth } from '../../../../server/config/config'

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
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}