import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native';

import Card from '../components/Card';

import Company from '../Data/Company';
import TextBar from '../components/TextBar';

const CompanyScreen = props => {
    const [addItem, setAddItem] = useState(0);

    const pressHandler = item => {
        console.log(item);
        props.navigation.navigate('Model', { modelNumber: item });
    };

    var companyData = Company.companyData.filter(
        item => item.name == props.navigation.getParam('name', 'default')
    )[0];

    return (
        <View style={styles.container}>
            <View style={styles.textBar}>
                {companyData.contact != '' && (
                    <TextBar text={'联系方式：' + companyData.contact} />
                )}
            </View>
            <View style={styles.listStyle}>
                <FlatList
                    data={companyData.model}
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
                                            ...(item.currentStockTotal == 0
                                                ? { color: 'red' }
                                                : { color: 'black' })
                                        }}
                                    >
                                        剩余库存：{item.currentStockTotal}
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
        </View>
    );
};

CompanyScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name', 'Error')
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
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
        fontSize: 18,
        fontFamily: 'Times New Roman'
    }
});

export default CompanyScreen;
