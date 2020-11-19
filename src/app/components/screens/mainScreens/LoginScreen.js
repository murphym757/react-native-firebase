import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CurrentThemeContext} from '../../../../../assets/styles/globalTheme';

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
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const appIcon = '../../../../../assets/images/icon.png';

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: manualColorSet().backgroundColor }}>
      <View style={{ paddingLeft: 20 }}>
        <FontAwesomeIcon 
          icon={ faTimes } color={manualColorSet().fontColor} size={50} 
          onPress={() => route.params.setNotLoggingIn(true)}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
        >
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
              <FooterFont>Don't have an account? <FooterLink onPress={onFooterLinkPress}>Sign up</FooterLink></FooterFont>
          </FooterView>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
    )
}