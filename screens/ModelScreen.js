import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Card from '../components/Card';

const ModelScreen = props => {
    return (
        <View style={styles.container}>
            <Card style={styles.cardContainer}>
                {/* <View style={styles.itemContainer}> */}
                <View style={styles.leftColumnContainer}>
                    <View style={styles.blocks}>
                        <Image></Image>
                    </View>
                    <View style={styles.blocks}></View>
                </View>
                <View style={styles.rightColumnContainer}>
                    <View style={styles.blocks}></View>
                    <View style={styles.blocks}></View>
                    <View style={styles.blocks}></View>
                </View>
                {/* </View> */}
            </Card>
        </View>
    );
};

ModelScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('modelNumber', 'Error')
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    cardContainer: {
        // width: '90%',
        // height: '60%'
        flex: 1,
        marginVertical: 80,
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
    blocks: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '50%',
        width: '100%'
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
