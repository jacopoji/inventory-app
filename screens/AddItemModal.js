import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import Block from '../components/Block';

const AddItemModal = props => {
    const [modelNumber, setModelNumber] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [currPrice, setCurrPrice] = useState('');
    const [stock, setStock] = useState('');

    const dismissHandler = () => {
        props.navigation.goBack();
    };

    const submitHandler = () => {
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.cardContainer}>
                    <Text style={styles.fontStyle}>型号</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={modelNumber}
                        onChangeText={text => {
                            setModelNumber(text);
                        }}
                        placeholder='请输入型号'
                        autoCapitalize='characters'
                        autoCompleteType='off'
                        autoCorrect={false}
                        autoFocus={true}
                        clearTextOnFocus={true}
                        keyboardType='default'
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.fontStyle}>最低价</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={minPrice}
                        onChangeText={text => {
                            setMinPrice(text);
                        }}
                        placeholder='请输入最低价'
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.fontStyle}>最高价</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={currPrice}
                        onChangeText={text => {
                            setCurrPrice(text);
                        }}
                        placeholder='请输入指导价'
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.stockContainer}>
                    <Text style={styles.fontStyle}>库存</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={stock}
                        onChangeText={text => {
                            setStock(text);
                        }}
                        placeholder='请输入库存'
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='确认' onPress={submitHandler} />
                    <Button title='取消' onPress={dismissHandler} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        marginHorizontal: 20,
        paddingTop: 20
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        minWidth: 250,
        fontSize: 30,
        maxWidth: 250
    },
    stockContainer: {
        marginVertical: 30,
        marginHorizontal: 20,
        paddingTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    fontStyle: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default AddItemModal;
