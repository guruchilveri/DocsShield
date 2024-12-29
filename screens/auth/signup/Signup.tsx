import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import AppText from '../../../comman/components/AppText'
import { CommonStyles } from '../../../comman/components'


function Signup() {
  const Navigator: any = useNavigation()

  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => { Navigator.navigate('Login') }}>
          <AppText style={styles.customText}>Click to go Login page</AppText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Briem Hand'
  },
});
