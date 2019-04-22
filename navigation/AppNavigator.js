import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MainTabNavigator from './MainTabNavigator';



export default createAppContainer(createSwitchNavigator({

  Login: {screen:LoginScreen},
  SignUp: {screen:SignUpScreen},
  EditProfile: {screen:EditProfileScreen},
  Main: MainTabNavigator,
}));
