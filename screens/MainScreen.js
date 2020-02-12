import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

import Card from '../components/Card';
import Color from '../constants/Color';
import Company from '../Data/Company';

const MainScreen = props => {
    const [thisState, setThisState] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const pressHandler = name => {
        props.navigation.navigate('Company', { name: name });
        console.log(name);
    };

    // async function getData() {
    //     try {
    //         const response = await fetch(
    //             'http://10.0.42.169:19000/Data/Company'
    //         );
    //         const data = await response.json();
    //         setCompanyData(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, []);
    // console.log(companyData);
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <FlatList
                    data={Company.companyData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => pressHandler(item.name)}
                        >
                            <Card style={styles.entry}>
                                <View>
                                    <Text>{item.name}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor
    },
    cardContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '80%',
        paddingTop: 50
    },
    entry: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        height: 60
    }
});

MainScreen.navigationOptions = ({ navigation }) => ({
    title: 'LianGao'
});

export default MainScreen;
