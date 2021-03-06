import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CurrentThemeContext} from '../../../../../assets/styles/globalTheme';
import { useAuth } from './authContext'
import { firebase } from '../../../../server/config/config';
import { manualColorSet, loadingScreen } from './loadingScreen' //Loader
// App Styling
import {
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FooterView,
    FooterFont,
    FooterLink
  } from '../../../../../assets/styles/authScreensStyling';
  
//FontAwesome
import { FontAwesomeIcon, faTimes } from '../index'

export default function LoginScreen({navigation}) {
    const { logIn, successAlert, failureAlert } = useAuth()
    const db = firebase.firestore()
    const [ isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const appIcon = '../../../../../assets/images/icon.png'

    function onFooterRegsLinkPress() {
        navigation.navigate('Registration')
    }

    function onFooterResLinkPress() {
      navigation.navigate('Reset Password')
  }

    async function onLoginPress() {
      try {
        setError('')
        setIsLoading(true)
        await logIn(email, password)
          .then((res) => {
            const uid = res.user.uid
            db.collection('users')
            .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    navigation.navigate('Home')
                })
                .catch(err => {
                    alert(err)
                });
          })
        .catch((err) => {
          setError(""+ err +"")
        })
      } catch {
        setError('Failed to log in')
      }
      setIsLoading(false)
    }

    function failureAlertMessage(error) {
      return failureAlert(error)
    }

    function pageLoader() {
      setTimeout(() => {
        setIsLoading(false)
      }, 2500)
    }
  
    useEffect(() => {
      pageLoader()
    })

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor }}> 
        {isLoading == true 
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loadingScreen()}
          </View>
          : <View style={{ flex: 1 }}>
              <View style={{ paddingLeft: 20 }}>
                <FontAwesomeIcon 
                  icon={ faTimes } color={manualColorSet().fontColor} size={50} 
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
              <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
              >
              <View>
                {error !== ''
                  ? failureAlertMessage(error)
                  : <View></View>
                }
              </View>
              <CustomInputField
                  placeholder='E-mail'
                  placeholderTextColor={manualColorSet().backgroundColor}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  color={manualColorSet().backgroundColor}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <CustomInputField
                  placeholderTextColor={manualColorSet().backgroundColor}
                  secureTextEntry
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  color={manualColorSet().backgroundColor}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableButton
                  onPress={() => onLoginPress()}>
                  <TouchableButtonFont>Log in</TouchableButtonFont>
              </TouchableButton>
              <FooterView>
                  <FooterFont>Forgot Password? <FooterLink onPress={onFooterResLinkPress}>Reset Password</FooterLink></FooterFont>
              </FooterView>
              <FooterView>
                  <FooterFont>Don't have an account? <FooterLink onPress={onFooterRegsLinkPress}>Sign up</FooterLink></FooterFont>
              </FooterView>
            </KeyboardAwareScrollView>
          </View>
        }
      </SafeAreaView>
    )
}