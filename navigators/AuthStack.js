import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/auth/login/Login'
import Signup from '../screens/auth/signup/Signup'
import Onboarding from '../screens/auth/Onboarding/Onboarding'


const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      {/* <Stack.Screen name='ForgotPassword' component={ForgotPassword} /> */}
    </Stack.Navigator>
  )
}

export default AuthStack
