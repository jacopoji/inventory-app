import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    connectActionSheet,
    useActionSheet,
} from '@expo/react-native-action-sheet';

const ActionSheet = (props) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const _openActionSheet = () => {
        const options = ['Choose from library', 'Take Photo', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options: options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    props.pickImage();
                }
                if (buttonIndex == 1) {
                    props.takeImage();
                }
                //console.log(buttonIndex);
            }
        );
        //console.log(options);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={_openActionSheet}>
                {props.children}
            </TouchableWithoutFeedback>
            {/* <Button title='Combined' onPress={_openActionSheet} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const ConnectedApp = connectActionSheet(ActionSheet);
export default ConnectedApp;
