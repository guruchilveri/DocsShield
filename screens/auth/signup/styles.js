import { Dimensions, Platform, StyleSheet } from 'react-native'
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
    marginTop: 5,
    borderColor: colors.alabaster,
    borderWidth: 1,
    borderRadius: 2,
    width: 24,
    height: 24,
    alignSelf: "flex-start"

  },
  activeView: {
    marginTop: 5,
    backgroundColor: colors.orangeThemeColor,
    borderRadius: 2,
    width: 24,
    height: 24,
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 35,
    marginBottom: 20
  },
  fieldSeperator: {
    height: 30,
    width: 20
  },

  spacer: {
    height: 25
  },
  loginViaText: {
    marginTop: 40,
    alignSelf: 'center'
  },
  signUpLink: {
    color: colors.greenThemeColor,
    // fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    textDecorationLine: 'underline'
  },
  errorText: {
    fontSize: 12,
    paddingTop: 2,
    color: colors.error
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
    fontWeight: '500',
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
    // fontWeight: '700',
    marginTop: 10,
    textAlign: "center",
    fontFamily: 'Phudu-Black',
    marginTop: 20
  },
  lgBtn: {
    // height: 45,
    width: width * 0.8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: '4%',
    ...CommonStyles.elevation
  },
})
export default styles
