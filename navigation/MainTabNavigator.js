import React, { Component } from 'react'
import { Platform, Props, Navigation } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MatchScreen from '../screens/MatchScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ProfileScreen from '../screens/ProfileScreen';



const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};


const MatchStack = createStackNavigator({
  Match: {screen: MatchScreen},
});

MatchStack.navigationOptions = {
  tabBarLabel: 'Matches',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contacts${focused ? '' : '-outline'}`
          : 'md-contacts'
      }
    />
  ),
};

const SwipeStack = createStackNavigator({
  Swipes: SwipeScreen,

});

SwipeStack.navigationOptions = {
  tabBarLabel: 'Swipe',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paw' : 'md-paw'}

    />
  ),

};





export default createBottomTabNavigator({
  ProfileStack,
  SwipeStack,
  MatchStack,
});
