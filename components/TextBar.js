import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/Color';

const TextBar = props => {
    return (
        <View style={styles.textBarStyle}>
            <Text style={{ ...styles.fontStyle, ...props.style }}>
                {props.text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textBarStyle: {
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: Color.shallowBlue
    },
    fontStyle: {
        fontSize: 18,
        textAlign: 'center',
        color: Color.white
    }
});

export default TextBar;
