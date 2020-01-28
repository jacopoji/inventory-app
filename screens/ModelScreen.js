import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Card from '../components/Card';
import Block from '../components/Block';
import Color from '../constants/Color';

const ModelScreen = props => {
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                <View style={styles.leftColumnContainer}>
                    <Block></Block>
                    <Block></Block>
                </View>
                <View style={styles.rightColumnContainer}>
                    <Block></Block>
                    <Block></Block>
                    <Block></Block>
                </View>
            </Card>
        </View>
    );
};

ModelScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('modelNumber', 'Error'),
    headerBackTitle: ' '
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor
    },
    cardContainer: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    },
    leftColumnContainer: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
        width: '50%',
        flexDirection: 'column'
    },
    rightColumnContainer: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
        flexDirection: 'column'
    }
});

export default ModelScreen;
