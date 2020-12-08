import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import Styles from './styles';

export default function Loading() {
    return (
        <View style={Styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}