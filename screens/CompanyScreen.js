import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native';

import Card from '../components/Card';
import { useFocusEffect } from 'expo-next-react-navigation';

import Company from '../Data/Company';
import TextBar from '../components/TextBar';
import Color from '../constants/Color';

const CompanyScreen = props => {
    const [addItem, setAddItem] = useState(0);
    const [companyModel, setCompanyModel] = useState(
        props.navigation.getParam('companyData', {})[0].model
    );

    const pressHandler = item => {
        console.log(item);
        props.navigation.navigate('Model', { modelNumber: item });
    };

    const handleAddItem = () => {
        props.navigation.navigate('Modal', { companyId: companyData._id });
    };
    //TODO: use usefocus hook to update company state
    //      will need to also add a get request route to companyRoutes.js

    async function getData() {
        try {
            const response = await fetch(
                `http://localhost:3000/Company/${companyData._id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = await response.json();
            setCompanyModel(data[0].model);
        } catch (error) {
            console.error(error);
        }
        // console.log(companyData._id);
    }

    useFocusEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );

    var companyData = props.navigation.getParam('companyData', {})[0];
    //console.log(companyData);
    return (
        <View style={styles.container}>
            <View style={styles.textBar}>
                {companyData.contact != '' && (
                    <TextBar text={'联系方式：' + companyData.contact} />
                )}
            </View>
            <View style={styles.listStyle}>
                <FlatList
                    data={companyModel}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => pressHandler(item.number)}
                        >
                            <Card style={styles.entry}>
                                <View style={styles.topText}>
                                    <Text style={styles.textStyle}>
                                        型号：{item.number}
                                    </Text>
                                </View>
                                <View style={styles.bottomText}>
                                    <Text
                                        style={{
                                            ...styles.textStyle,
                                            ...(item.currentStock == 0
                                                ? { color: 'red' }
                                                : { color: 'black' })
                                        }}
                                    >
                                        剩余库存：{item.currentStock}
                                    </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.number}
                    numColumns={2}
                    windowSize={21}
                />
            </View>
            <Button
                title='Add Item'
                onPress={() => {
                    companyData.model.push({
                        number: 'ac123',
                        currentStockTotal: 111
                    });
                    setAddItem(addItem + 1);
                    console.log('Trying to push this in ' + addItem.toString);
                }}
            />
            <Button title='Add Item(Real)' onPress={handleAddItem} />
        </View>
    );
};

CompanyScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name', 'Error'),
    headerBackTitle: ' '
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor
    },
    textBar: {
        justifyContent: 'flex-start',
        width: '100%'
    },
    listStyle: {
        paddingTop: 40,
        height: '80%'
    },
    entry: {
        marginBottom: 20,
        marginHorizontal: 10,
        width: 160,
        height: 80
    },
    topText: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    textStyle: {
        fontSize: 18
    }
});

export default CompanyScreen;
