import React, { Component } from 'react'
// import { Text, View } from 'react-native'
import {NavigationContainer,DefaultTheme} from '@react-navigation/native'
import { createStackNavigator , } from '@react-navigation/stack';

import {Home} from './Screens'
const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    border:'transparent'
  },
};

const Stack =createStackNavigator()

export default class App extends Component {
  render() {
    return (
      <NavigationContainer theme={theme}>
      <Stack.Navigator
      screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
       >
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
