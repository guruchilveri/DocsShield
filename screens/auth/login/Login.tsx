import React from 'react'
import {
  StyleSheet,

  TouchableOpacity,
  View,
} from 'react-native'
import { CommonStyles } from '../../../comman/components'
import AppText from '../../../comman/components/AppText'
import { useNavigation } from '@react-navigation/native'

function Login({ navigation }: any) {


  const Navigator: any = useNavigation()

  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => { Navigator.navigate('Signup') }}>
          <AppText style={styles.customText}>Click to go Signup</AppText>
        </TouchableOpacity>
      </View>
    </View>
  )
}
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

export default Login
