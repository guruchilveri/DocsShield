// In App.js in a new project

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigators/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './navigators/MainStack';
import AuthStack from './navigators/AuthStack';


const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {true
          ? (
            <RootStack.Screen name='Main' component={MainStack} />
          )
          : (
            <RootStack.Screen
              name='Auth'
              component={AuthStack}
              options={{
                animationTypeForReplace: false ? 'pop' : 'push'
              }}
            />
          )}
      </RootStack.Navigator>

    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Poppins-Light',
  },
});