import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Styles from './styles';
import CommonStyles from '../../../../common/styles';

export default function TodosItem({ todo, toggleCompleted }) {
    return (
        <View style={CommonStyles.itemContainer}>
            <TouchableOpacity onPress={() => toggleCompleted(todo)}>
                {_renderCompleteIcon(todo)}
            </TouchableOpacity>
            <Text style={Styles.title}>{todo.title}</Text>
        </View>
    );
}

function _renderCompleteIcon(todo) {
    if (todo.completed) {
        return (
            <FontAwesome5
                name={'check-circle'}
                style={[Styles.completeIcon, Styles.icon]}
                size={30}
            />
        );
    }

    return (
        <FontAwesome5
            name={'times-circle'}
            style={[Styles.incompleteIcon, Styles.icon]}
            size={30}
        />
    );
}
