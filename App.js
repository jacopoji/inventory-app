import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Header from './components/Header';

import Color from './constants/Color';
import MainScreen from './screens/MainScreen';
import CompanyScreen from './screens/CompanyScreen';
import ModelScreen from './screens/ModelScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// export default function App() {
//     const [isHomePage, setIsHomePage] = useState(true);
//     const [isModelPage, setIsModelPage] = useState(false);
//     const [selectedCompany, setSelectedCompany] = useState('');
//     const [selectedModel, setSelectedModel] = useState('');

//     const pressCompanyHandler = companyName => {
//         console.log('The company that has been pressed is ', companyName);
//         setSelectedCompany(companyName);
//         setIsHomePage(false);
//     };

//     const pressModelHandler = modelNumber => {
//         setSelectedModel(modelNumber);
//         setIsModelPage(true);
//     };

//     let title = '';
//     let screen = <View></View>;
//     if (isHomePage) {
//         title = 'LianGao';
//         screen = <MainScreen handlePress={pressCompanyHandler /* bind?? */} />;
//     } else {
//         if (isModelPage) {
//             title = selectedModel;
//             screen = <ModelScreen modelNumber={selectedModel} />;
//         } else {
//             title = selectedCompany;
//             screen = (
//                 <CompanyScreen
//                     name={selectedCompany}
//                     handlePress={pressModelHandler}
//                 />
//             );
//         }
//     }
//     // let title = isHomePage ? 'LianGao' : selectedCompany;
//     // let screen = isHomePage ? (
//     //     <MainScreen handlePress={pressCompanyHandler /* bind?? */} />
//     // ) : (
//     //     <CompanyScreen name={selectedCompany} />
//     // );
//     return (
//         <View style={styles.container}>
//             <Header title={title} />
//             {screen}
//             <Button
//                 title='Reset'
//                 onPress={() => {
//                     setIsHomePage(true);
//                     setIsModelPage(false);
//                 }}
//             />
//         </View>
//     );
// }

const RootStack = createStackNavigator(
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
            }
        }
    }
);

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         flex: 1,
//         backgroundColor: Color.secondaryColor
//     }
// });

export default createAppContainer(RootStack);
// import React from 'react';
// import { Button, View, Text } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Home'
//     };

//     render() {
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <Text>Home Screen</Text>
//                 <Button
//                     title='Go to Details'
//                     onPress={() => {
//                         /* 1. Navigate to the Details route with params */
//                         this.props.navigation.navigate('Details', {
//                             itemId: 86,
//                             otherParam: 'anything you want here'
//                         });
//                     }}
//                 />
//             </View>
//         );
//     }
// }

// class DetailsScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Details'
//     };

//     render() {
//         /* 2. Get the param, provide a fallback value if not available */
//         const { navigation } = this.props;
//         const itemId = navigation.getParam('itemId', 'NO-ID');
//         const otherParam = navigation.getParam(
//             'otherParam',
//             'some default value'
//         );

//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                 }}
//             >
//                 <Text>Details Screen</Text>
//                 <Text>itemId: {JSON.stringify(itemId)}</Text>
//                 <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//                 <Button
//                     title='Go to Details... again'
//                     onPress={() =>
//                         this.props.navigation.push('Details', {
//                             itemId: Math.floor(Math.random() * 100)
//                         })
//                     }
//                 />
//                 <Button
//                     title='Go to Home'
//                     onPress={() => this.props.navigation.navigate('Home')}
//                 />
//                 <Button
//                     title='Go back'
//                     onPress={() => this.props.navigation.goBack()}
//                 />
//             </View>
//         );
//     }
// }

// const RootStack = createStackNavigator(
//     {
//         Home: HomeScreen,
//         Details: DetailsScreen
//     },
//     {
//         initialRouteName: 'Home'
//     }
// );

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//     render() {
//         return <AppContainer />;
//     }
// }
