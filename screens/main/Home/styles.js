import { Dimensions, StyleSheet } from 'react-native'
import { colors } from '@common'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  profileContainer: {
    alignSelf: 'center',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 144,
    height: 144,
    borderRadius: 72
  },
  profilePicture: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: 'rgba(49, 49, 49, 0.5)',
    position: 'absolute'
  },
  camera: {
    position: 'absolute',
    width: 40,
    height: 40
  },
  errorText: {
    fontSize: 12,
    paddingTop: 2,
    color: colors.error
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 25
  },
  fieldContainer: {
    marginBottom: 35
  },
  submitContainer: {
    marginTop: 20
  },
  proof: {
    width: width - 60,
    alignSelf: 'center',
    height: 200,
    borderRadius: 10
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    marginBottom: 10
  },
  uploadSection: {
    borderStyle: 'dashed',
    borderColor: colors.headerborder,
    borderWidth: 2.1,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 20
  },
  proofImage: {
    width: 200,
    height: 200,
    marginBottom: 10
  }
})

export default styles
