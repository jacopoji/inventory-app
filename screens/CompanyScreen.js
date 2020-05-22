import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button,
    Alert
} from 'react-native';

import Card from '../components/Card';
import { useFocusEffect } from 'expo-next-react-navigation';

import Company from '../Data/Company';
import TextBar from '../components/TextBar';
import Color from '../constants/Color';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';

const CompanyScreen = props => {
    const [addItem, setAddItem] = useState(0);
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [companyModel, setCompanyModel] = useState(
        props.navigation.getParam('companyData', {})[0].model
    );

    const pressHandler = item => {
        console.log(item);
        props.navigation.navigate('Model', { modelNumber: item });
    };

    const longPressHandler = item => {
        // console.log(item);
        // Alert.alert(`确认删除 ${item.number} 吗？`, '', [
        //     {
        //         text: '取消',
        //         onPress: () => console.log(item._id),
        //         style: 'cancel'
        //     },
        //     {
        //         text: '确认',
        //         onPress: () => {
        //             deleteModel(item._id);
        //         },
        //         style: 'destructive'
        //     }
        // ]);
        setMultiSelectMode(true);
    };

    // const handleAddItem = () => {
    //     props.navigation.navigate('Modal', { companyId: companyData._id });
    // };
    //TODO:
    //      PATCH request and modify button for models

    async function deleteModel(modelId) {
        try {
            const response = await fetch(
                `http://localhost:3000/Company/${companyData._id}/${modelId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = await response.json();
            getData();
        } catch (error) {
            console.error(error);
        }
    }

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
                            onLongPress={() => longPressHandler(item)}
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
            {/* <Button
                title='Add Item'
                onPress={() => {
                    companyData.model.push({
                        number: 'ac123',
                        currentStockTotal: 111
                    });
                    setAddItem(addItem + 1);
                    console.log('Trying to push this in ' + addItem.toString);
                }}
            /> */}
            {/* <Button title='Add Item' onPress={handleAddItem} /> */}

            {multiSelectMode && (
                <Footer>
                    <Text
                        style={{
                            color: Color.red,
                            fontSize: 28
                        }}
                    >
                        Delete
                    </Text>
                </Footer>
            )}
        </View>
    );
};

CompanyScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name', 'Error'),
    headerBackTitle: ' ',
    headerRight: () => (
        <Ionicons
            style={{ paddingRight: 20 }}
            name='ios-add'
            size={32}
            color='white'
            onPress={() =>
                navigation.navigate('Modal', {
                    companyId: navigation.getParam('companyData', {})[0]._id
                })
            }
        />
    )
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor
    },
    textBar: {
        width: '100%'
    },
    listStyle: {
        paddingTop: 40,
        flex: 1
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
