import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ModelScreen = props => {
    return (
        <View>
            <Text> {props.modelNumber}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
});

export default ModelScreen;
