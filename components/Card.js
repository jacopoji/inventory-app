import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/Color';

const Card = props => {
    return (
        <View style={{ ...props.style, ...styles.Card }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    Card: {
        shadowColor: Color.shadowColor,
        shadowOffset: { height: 6, width: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 13,
        backgroundColor: 'white',
        borderRadius: 6
    }
});

export default Card;
