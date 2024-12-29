import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CommonStyles } from '../../../comman/components'
import { useNavigation } from '@react-navigation/native'


function EditProfile() {
  const Navigator: any = useNavigation()
  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => { Navigator.navigate('Profile') }}>
          <Text style={styles.customText}>Click to go Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditProfile
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
