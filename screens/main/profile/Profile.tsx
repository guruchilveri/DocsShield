import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonStyles } from '../../../comman/components'
import { useNavigation } from '@react-navigation/native'


function Profile() {
  const Navigator: any = useNavigation()
  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => { Navigator.navigate('EditProfile') }}>
          <Text style={styles.customText}>Click to go Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile
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
