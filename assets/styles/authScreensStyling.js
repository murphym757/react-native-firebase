import styled from 'styled-components';
import { View, Text, TextInput, Button, Image, ScrollView, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
    currentTheme
} from './globalTheme';

/* Login Screen */
/*---------------------------------------*/
export const CustomInputField = styled(TextInput) `
    height: 48px;
    borderRadius: 5px;
    overflow: hidden;
    fontFamily: 'SpartanRegular';
    backgroundColor: ${currentTheme.primaryColorAlt};
    marginTop: 10px;
    marginBottom: 10px;
    marginLeft: 30px;
    marginRight: 30px;
    paddingLeft: 16px;
`;

export const TouchableButton = styled(TouchableOpacity) `
    backgroundColor: ${currentTheme.secondaryColor};
    marginLeft: 30px;
    marginRight: 30px;
    marginTop: 20px;
    height: 48px;
    borderRadius: 5px;
    alignItems: center;
    justifyContent: center;
`;

export const TouchableButtonFont = styled(Text) `
    color: ${currentTheme.primaryFontColor};
    fontSize: 15px;
    fontFamily: 'SpartanMedium';
`;

export const FooterView = styled(View) `
    flex: 1;
    alignItems: center;
    marginTop: 20px;
`;
export const FooterFont = styled(Text) `
    fontSize: 15px;
    fontFamily: 'SpartanRegular';
    color: ${currentTheme.primaryFontColor};
`;
export const FooterLink = styled(Text) `
    color: ${currentTheme.secondaryColor};
    fontFamily: 'SpartanMedium';
    fontSize: 15px;
`;

/*---------------------------------------*/
