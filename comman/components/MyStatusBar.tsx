import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'


const STATUSBAR_HEIGHT = StatusBar.currentHeight

function MyStatusBar({ backgroundColor, ...props }: any) {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})

export default MyStatusBar
