
import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../authScreens/authContext'
import { // App Styling
    TouchableButton,
    TouchableButtonFont
  } from '../../../../../assets/styles/authScreensStyling'
import { manualColorSet, loadingScreen } from '../authScreens/loadingScreen' //Loader

export default function UpdateUserScreen() {
    const { currentUser } = useAuth()

    function onHandleLogout() {

    }

    function onHandleLogout() {

    }

    return (
        <View style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    )
}