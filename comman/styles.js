import { StyleSheet } from 'react-native'
import colors from './colors'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hvcenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bgwhite: {
    backgroundColor: colors.white
  },
  row: {
    flexDirection: 'row'
  },
  submitBtnWrapper: {
    width: '100%'
  },
  selfCenter: {
    alignSelf: 'center'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  elevation: {
    // ...
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  alignItems: {
    alignItems: 'center'
  }
})

export default styles
