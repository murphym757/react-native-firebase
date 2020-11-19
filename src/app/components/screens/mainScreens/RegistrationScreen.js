import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../../server/config/config';

//Loader
import LottieView from 'lottie-react-native';

// App Styling
import {
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FooterView,
    FooterFont,
    FooterLink
  } from '../../../../../assets/styles/authScreensStyling';

export default function RegistrationScreen({navigation}) {
    const [ isLoading, setIsLoading] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const baseLink = "../../../../../assets/images/";
    const dayImage = baseLink + "lottieLoadingDay.json";
    const nightImage = baseLink + "lottieLoadingNight.json";
    const appIcon = '../../../../../assets/images/icon.png';

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    function manualColorSet() {
        const day = {
          fontColor: 'rgb(31, 37, 41)',
          backgroundColor: 'rgb(224, 218, 214)'
        }
        const night = {
          fontColor: 'rgb(224, 218, 214)',
          backgroundColor: 'rgb(31, 37, 41)'
        }
        let currentTime = new Date();
        let time = currentTime.getHours();
        if (time >= 17 || time < 7) {
          return night;
        } else {
          return day;
        }
      }

      function loadingIcon() {
        let currentTime = new Date();
        let time = currentTime.getHours();
        if (time >= 17 || time < 7) {
          return <LottieView 
            source={require(nightImage)}
            style={{ width: 200, height: 200, }}
            autoPlay 
            loop
          />;
        } else {
          return <LottieView 
            source={require(dayImage)}
            style={{ width: 200, height: 200, }}
            autoPlay 
            loop
          />;
        }
      }
    
      function pageLoader() {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    
      useEffect(() => {
        pageLoader()
      });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor }}>
        <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always"
            >
            <CustomInputField
                placeholder='Full Name'
                placeholderTextColor={manualColorSet().backgroundColor}
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                color={manualColorSet().backgroundColor}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
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
            <CustomInputField
                placeholderTextColor={manualColorSet().backgroundColor}
                secureTextEntry
                placeholder='Confirm Password'
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                color={manualColorSet().backgroundColor}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableButton
                onPress={() => onRegisterPress()}>
                <TouchableButtonFont>Create account</TouchableButtonFont>
            </TouchableButton>
            <FooterView>
                <FooterFont>Already got an account? <FooterLink onPress={onFooterLinkPress}>Log In</FooterLink></FooterFont>
            </FooterView>
            </KeyboardAwareScrollView>
        </View>
    </SafeAreaView>
    )
}