import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/auth/login/Login'
import Signup from '../screens/auth/signup/Signup'


const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} /> */}
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      {/* <Stack.Screen name='ForgotPassword' component={ForgotPassword} /> */}
    </Stack.Navigator>
  )
}

export default AuthStack
