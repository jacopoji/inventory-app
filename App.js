import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ActivityIndicator,
    Button
} from 'react-native';

import Header from './components/Header';

import Color from './constants/Color';
import MainScreen from './screens/MainScreen';
import CompanyScreen from './screens/CompanyScreen';
import ModelScreen from './screens/ModelScreen';

export default function App() {
    const [isHomePage, setIsHomePage] = useState(true);
    const [isModelPage, setIsModelPage] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const pressCompanyHandler = companyName => {
        console.log('The company that has been pressed is ', companyName);
        setSelectedCompany(companyName);
        setIsHomePage(false);
    };

    const pressModelHandler = modelNumber => {
        setSelectedModel(modelNumber);
        setIsModelPage(true);
    };

    let title = '';
    let screen = <View></View>;
    if (isHomePage) {
        title = 'LianGao';
        screen = <MainScreen handlePress={pressCompanyHandler /* bind?? */} />;
    } else {
        if (isModelPage) {
            title = selectedModel;
            screen = <ModelScreen modelNumber={selectedModel} />;
        } else {
            title = selectedCompany;
            screen = (
                <CompanyScreen
                    name={selectedCompany}
                    handlePress={pressModelHandler}
                />
            );
        }
    }
    // let title = isHomePage ? 'LianGao' : selectedCompany;
    // let screen = isHomePage ? (
    //     <MainScreen handlePress={pressCompanyHandler /* bind?? */} />
    // ) : (
    //     <CompanyScreen name={selectedCompany} />
    // );
    return (
        <View style={styles.container}>
            <Header title={title} />
            {screen}
            {/* {<ActivityIndicator size='large' color='#ff00ff' />} */}
            <Button
                title='Reset'
                onPress={() => {
                    setIsHomePage(true);
                    setIsModelPage(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor
    }
});
