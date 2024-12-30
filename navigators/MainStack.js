import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditProfile from '../screens/main/editprofile/EditProfile'
import Profile from '../screens/main/profile/Profile'
import Home from '../screens/main/Home/Home'
import Onboarding from '../screens/auth/Onboarding/Onboarding'
// import EditProfile from '../'



const Stack = createStackNavigator()

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    // initialRouteName="UploadPhotos"
    >
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}

export default MainStack
