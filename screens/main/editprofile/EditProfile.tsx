import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { CommonStyles } from '../../../comman/components'
import { useNavigation } from '@react-navigation/native'
import AppText from '../../../comman/components/AppText'


function EditProfile() {
  const Navigator: any = useNavigation()
  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <TouchableOpacity onPress={() => { Navigator.navigate('Profile') }}>
          <AppText style={styles.customText}>Click to go Profile</AppText>
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
    fontFamily: 'Poppins-Regular'
  },
});
