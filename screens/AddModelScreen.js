import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    AsyncStorage,
    Picker,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import Card from '../components/Card';
import Block from '../components/Block';
import localIpAddress from '../constants/localIpAddress';
//import AsyncStorage from '@react-native-community/async-storage';
import configuration from '../constants/configuration';
const language = configuration.language;

const AddModelScreen = (props) => {
    const [modelNumber, setModelNumber] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [currPrice, setCurrPrice] = useState('');
    const [stock, setStock] = useState('');
    const localIp = localIpAddress.localIp;

    const dismissHandler = () => {
        props.navigation.goBack();
    };

    const submitHandler = () => {
        pushModel(companyId);
        props.navigation.goBack();
    };

    var companyId = props.navigation.getParam('companyId');

    async function pushModel(companyId) {
        const data = {
            modelData: {
                number: modelNumber,
                currentStock: stock,
                primeCost: minPrice,
                guidedPrice: currPrice,
            },
        };
        try {
            if (data.modelData.number) {
                //make sure it has been entered
                const response = await fetch(
                    `http://${localIp}:3000/Company/${companyId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    }
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Card>
                    <View style={styles.cardContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.model[language]}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            value={modelNumber}
                            onChangeText={(text) => {
                                setModelNumber(text);
                            }}
                            placeholder={languageSet.enter_model[language]}
                            autoCapitalize='characters'
                            autoCompleteType='off'
                            autoCorrect={false}
                            autoFocus={true}
                            clearTextOnFocus={true}
                            keyboardType='default'
                        />
                    </View>
                    <View style={styles.cardContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.lowest_price[language]}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            value={minPrice}
                            onChangeText={(text) => {
                                setMinPrice(text);
                            }}
                            placeholder={
                                languageSet.enter_lowest_price[language]
                            }
                            clearTextOnFocus={true}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.cardContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.highest_price[language]}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            value={currPrice}
                            onChangeText={(text) => {
                                setCurrPrice(text);
                            }}
                            placeholder={languageSet.enter_rec_price[language]}
                            clearTextOnFocus={true}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.stockContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.remaining_stock[language]}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={styles.stockInputContainer}
                                value={stock}
                                onChangeText={(text) => {
                                    setStock(text);
                                }}
                                placeholder={languageSet.enter_stock[language]}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                            />
                        </View>
                        {/* <Picker
                        onValueChange={color => {
                            setSelectedColor(color);
                        }}
                        selectedValue={selectedColor}
                        stlye={{
                            width: 200,
                            height: 200,
                            backgroundColor: 'black'
                        }}
                        >
                        <Picker.Item color='blue' label='蓝' value='blue' />
                        <Picker.Item color='red' label='红' value='red' />
                        <Picker.Item label='白' value='white' />
                        <Picker.Item label='黑' value='black' />
                    </Picker> */}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={languageSet.confirm[language]}
                            onPress={submitHandler}
                        />
                        <Button
                            title={languageSet.cancel[language]}
                            onPress={dismissHandler}
                        />
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    );
};

const languageSet = {
    cancel: ['Cancel', '取消'],
    confirm: ['Confirm', '确认'],
    model: ['Model: ', '型号：'],
    enter_model: ['Enter Model', '请输入型号'],
    remaining_stock: ['Remaining', '库存'],
    enter_stock: ['Enter stock', '请输入库存'],
    delete: ['Delete', '删除'],
    complete: ['Done', '完成'],
    lowest_price: ['Floor price', '最低价'],
    enter_lowest_price: ['Enter floor price', '请输入最低价'],
    highest_price: ['Highest price', '最高价'],
    enter_rec_price: ['Enter recommended price', '请输入指导价'],
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        marginHorizontal: 20,
        paddingTop: 20,
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        minWidth: 250,
        fontSize: 30,
        maxWidth: 250,
    },
    stockInputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        minWidth: 100,
        fontSize: 15,
        maxWidth: 100,
        maxHeight: 35,
    },
    stockContainer: {
        marginVertical: 30,
        marginHorizontal: 20,
        paddingTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },
    fontStyle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default AddModelScreen;
