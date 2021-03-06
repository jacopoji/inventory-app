import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Button,
    Alert,
} from 'react-native';

import Card from '../components/Card';
import { useFocusEffect } from 'expo-next-react-navigation';

import Company from '../Data/Company';
import TextBar from '../components/TextBar';
import Color from '../constants/Color';
import Footer from '../components/Footer';
import { Ionicons } from '@expo/vector-icons';
import localIpAddress from '../constants/localIpAddress';

import configuration from '../constants/configuration';
const language = configuration.language;

const CompanyScreen = (props) => {
    const [addItem, setAddItem] = useState(0);
    const [dummy, setDummy] = useState(false);
    const [multiSelectMode, setMultiSelectMode] = useState(false);
    const [elementSelected, setElementSelected] = useState([]);
    const [companyModel, setCompanyModel] = useState(
        props.navigation.getParam('companyData', {})[0].model
    );
    const localIp = localIpAddress.localIp;

    const pressHandler = (item) => {
        //console.log(item);
        props.navigation.navigate('Model', {
            modelNumber: item.number,
            modelData: item,
            companyId: companyData._id,
        });
        console.log('id is ' + companyData._id);
    };

    const longPressHandler = (item) => {
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
        var temp = elementSelected;
        temp.push(item._id);
        setElementSelected(temp);
        props.navigation.setParams({ multiSelectMode: true });
        setMultiSelectMode(true);
    };

    const selectPressHandler = (item) => {
        var temp = elementSelected;
        const index = temp.indexOf(item._id);
        if (index > -1) {
            //item already in array
            temp.splice(index, 1);
        } else {
            //item not in array
            temp.push(item._id);
        }
        setElementSelected(temp);
        setDummy(!dummy);
        // console.log(elementSelected);
    };

    const multiDeleteHandler = () => {
        if (elementSelected.length > 0) {
            Alert.alert(languageSet.confirm_multi_delete[language], '', [
                {
                    text: languageSet.cancel[language],
                    style: 'cancel',
                },
                {
                    text: languageSet.confirm[language],
                    onPress: () => {
                        deleteMultiModel(elementSelected);
                        setElementSelected([]);
                    },
                    style: 'destructive',
                },
            ]);
        } else {
            return;
        }
    };

    // const handleAddItem = () => {
    //     props.navigation.navigate('Modal', { companyId: companyData._id });
    // };
    //TODO:
    //      PATCH request and modify button for models

    async function deleteModel(modelId) {
        try {
            const response = await fetch(
                `http://${localIp}:3000/Company/${companyData._id}/${modelId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            getData();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteMultiModel(modelId) {
        try {
            const data = { modelIds: modelId };
            const response = await fetch(
                `http://${localIp}:3000/Company/${companyData._id}/multi`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            getData();
        } catch (error) {
            console.error(error);
        }
    }

    async function getData() {
        try {
            const response = await fetch(
                `http://${localIp}:3000/Company/${companyData._id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
            var temp = companyModel;
            getData();
            //console.log(companyModel);
        }, [])
    );

    var companyData = props.navigation.getParam('companyData', {})[0];
    const unselectedIcon = (
        <Ionicons
            style={{ paddingRight: 5 }}
            name='ios-checkmark-circle-outline'
            size={32}
            color={Color.gray}
        />
    );
    const selectedIcon = (
        <Ionicons
            style={{ paddingRight: 5 }}
            name='ios-checkmark-circle'
            size={32}
        />
    );
    function itemInArray(item, array) {
        const index = array.indexOf(item);
        if (index > -1) return true;
        return false;
    }
    //console.log(companyData);
    const defaultScreen = (
        <View style={styles.container}>
            <View style={styles.textBar}>
                {companyData.contact != '' && (
                    <TextBar
                        text={
                            languageSet.contact[language] + companyData.contact
                        }
                    />
                )}
            </View>
            <View style={styles.listStyle}>
                <FlatList
                    data={companyModel}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => pressHandler(item)}
                            onLongPress={() => longPressHandler(item)}
                        >
                            <Card style={styles.entry}>
                                <View style={styles.topText}>
                                    <Text style={styles.textStyle}>
                                        {languageSet.model[language]}
                                        {item.number}
                                    </Text>
                                </View>
                                <View style={styles.bottomText}>
                                    <Text
                                        style={{
                                            ...styles.textStyle,
                                            ...(item.currentStock == 0
                                                ? { color: 'red' }
                                                : { color: 'black' }),
                                        }}
                                    >
                                        {languageSet.remaining_stock[language]}
                                        {item.currentStock}
                                    </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.number}
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
        </View>
    );
    const editScreen = (
        <View style={styles.container}>
            <View style={styles.textBar}>
                {companyData.contact != '' && (
                    <TextBar
                        text={
                            languageSet.contact[language] + companyData.contact
                        }
                    />
                )}
            </View>
            <View style={styles.listStyle}>
                <FlatList
                    data={companyModel}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onLongPress={() => longPressHandler(item)}
                            onPress={() => selectPressHandler(item)}
                        >
                            <View>
                                <Card style={styles.entry}>
                                    <View style={styles.topText}>
                                        <Text style={styles.textStyle}>
                                            {languageSet.model[language]}
                                            {item.number}
                                        </Text>
                                        {itemInArray(item._id, elementSelected)
                                            ? selectedIcon
                                            : unselectedIcon}
                                    </View>

                                    <View style={styles.bottomText}>
                                        <Text
                                            style={{
                                                ...styles.textStyle,
                                                ...(item.currentStock == 0
                                                    ? { color: 'red' }
                                                    : { color: 'black' }),
                                            }}
                                        >
                                            {
                                                languageSet.remaining_stock[
                                                    language
                                                ]
                                            }
                                            {item.currentStock}
                                        </Text>
                                    </View>
                                </Card>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={(item) => item.number}
                    numColumns={2}
                    windowSize={21}
                />
            </View>
            <Footer>
                <View style={styles.footerStyle}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            //console.log('Delete all selected');
                            multiDeleteHandler();
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    elementSelected.length > 0
                                        ? Color.red
                                        : '#ffffff',
                                fontSize: 28,
                                width: '40%',
                            }}
                        >
                            {languageSet.delete[language]}
                            {elementSelected.length > 0
                                ? '(' + elementSelected.length + ')'
                                : ' '}
                        </Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setMultiSelectMode(false);
                            setElementSelected([]);
                            props.navigation.setParams({
                                multiSelectMode: false,
                            });
                        }}
                    >
                        <Text
                            style={{
                                color: '#ffffff',
                                fontSize: 28,
                            }}
                        >
                            {languageSet.complete[language]}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </Footer>
        </View>
    );
    return multiSelectMode ? editScreen : defaultScreen;
};

CompanyScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name', 'Error'),
    headerBackTitle: ' ',
    headerRight: () =>
        !navigation.getParam('multiSelectMode') && (
            <Ionicons
                style={{ paddingRight: 20 }}
                name='ios-add'
                size={32}
                color='white'
                onPress={() =>
                    navigation.navigate('Modal', {
                        companyId: navigation.getParam('companyData', {})[0]
                            ._id,
                    })
                }
            />
        ),
});

const languageSet = {
    confirm_multi_delete: ['Confirm Delete Selection?', '确认删除多个型号吗？'],
    cancel: ['Cancel', '取消'],
    confirm: ['Confirm', '确认'],
    contact: ['Contact: ', '联系方式：'],
    model: ['Model: ', '型号：'],
    remaining_stock: ['Remaining: ', '剩余库存：'],
    delete: ['Delete', '删除'],
    complete: ['Complete', '完成'],
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor,
    },
    textBar: {
        width: '100%',
    },
    listStyle: {
        paddingTop: 40,
        flex: 1,
    },

    entry: {
        marginBottom: 20,
        marginHorizontal: 10,
        width: 160,
        height: 80,
    },
    topText: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    bottomText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    textStyle: {
        fontSize: 18,
    },
    footerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default CompanyScreen;
