import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Color from './constants/Color';
import MainScreen from './screens/MainScreen';
import CompanyScreen from './screens/CompanyScreen';
import ModelScreen from './screens/ModelScreen';
import AddItemModal from './screens/AddItemModal';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
/*
TODO:
1.Provide color and number option in Modal screen, sample data regarding colors (deprecated)
2.Implement Asynchronous approach with Promises
3.Implement Image uploading via Camera or Library
4.Implement search and filter function in MainScreen and CompanyScreen
5.Implement sorting function by last edit date, remaining stock in CompanyScreen.
6.Implement sorting function by Alphabet in MainScreen
7.Database
*/
const MainStack = createStackNavigator(
    {
        Home: MainScreen,
        Company: CompanyScreen,
        Model: ModelScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Color.mediumBlue
            },
            headerTintColor: Color.white,
            headerTitleStyle: {
                fontSize: 30,
                textAlign: 'center'
            },
            title: ' '
        }
    }
);

const RootStack = createStackNavigator(
    {
        Main: { screen: MainStack },
        Modal: { screen: AddItemModal }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
    return <AppContainer />;
}
