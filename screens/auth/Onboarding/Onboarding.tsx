import React from 'react'
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,

  TouchableOpacity,
  View,
} from 'react-native'
import { CommonStyles } from '../../../comman/components'
import AppText from '../../../comman/components/AppText'
import { useNavigation } from '@react-navigation/native'
import colors from '../../../comman/colors'
import SubmitButton from '../../../comman/components/Submitbtn'

function Onboarding({ navigation }: any) {


  const navigator: any = useNavigation()
  const handlePress = () => {
    // Alert.alert("hello") // Define what happens when the button is pressed
    navigation.navigate('Login')
  };

  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <ImageBackground
        source={require('../../../assets/images/background-image.jpg')} // Replace with your image path
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Logo Section */}
          <AppText style={styles.logoText}>Document Shield</AppText>

          <SubmitButton title="Get Started!" onPress={handlePress} />

        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: colors.themeColor,
  },
  button: {
    backgroundColor: colors.themeColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'poppins-Medium',
  },
});

export default Onboarding
