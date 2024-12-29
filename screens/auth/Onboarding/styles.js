import { Platform, StyleSheet, Dimensions } from 'react-native'
import { colors, CommonStyles } from '@common'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  formContainer: {
    width: '100%'
  },
  inactiveView: {
    borderColor: colors.alabaster,
    borderWidth: 1,
    borderRadius: 2,
    width: 24,
    height: 24,
    alignSelf: "center"

  },
  activeView: {
    backgroundColor: colors.orangeThemeColor,
    borderRadius: 2,
    width: 24,
    height: 24,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 45,
    marginBottom: 20
  },
  fieldSeperator: {
    height: 30,
    width: 20
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rememberText: {
    marginLeft: 15,
    fontFamily: 'Poppins-Bold'
  },
  spacer: {
    height: 35
  },
  loginViaText: {
    paddingVertical: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
    fontFamily: 'Poppins-Light'
  },
  signUpLink: {
    color: colors.greenThemeColor,
    fontFamily: Platform.OS === 'ios' ? '800' : 'Poppins-SemiBold'
  },
  errorText: {
    fontSize: 12,
    color: colors.error
  },
  loginAuth: {
    justifyContent: 'center'
  },
  signInBtn: {
    marginHorizontal: 16,
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...CommonStyles.elevation
  },
  googleBtn: {
    marginVertical: 18,
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue
  },
  appleBtn: {
    height: 45,
    width: 230,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    // ...CommonStyles.elevation
  },
  lgBtn: {
    height: 45,
    width: width * 0.8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...CommonStyles.elevation
  },
  indicator: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 100
  },
  forServiceTxt: {
    padding: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    borderColor: colors.themeColorLight,
    height: 30
  },
  titleTxt: {
    padding: 5,
    fontSize: 30,
    fontFamily: 'Phudu-Black',
    marginTop: 10,
    textAlign: "center",
    marginTop: 20
  }
})
export default styles
