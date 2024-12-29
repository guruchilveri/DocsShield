import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../colors'


function AppText(props) {
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Manrope-Medium',
    color: colors.black
  }
})

export default AppText
