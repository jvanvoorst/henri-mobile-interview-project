import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUserById } from '../../screens/Users/Users.slice';

import Styles from './styles';
import CommonStyles from '../../common/styles';

export default function UserItem({ id }) {
    const user = useSelector((state) => selectUserById(state, id));

    return (
        <View style={CommonStyles.itemContainer}>
            <Image
                style={CommonStyles.avatar}
                source={{
                    uri: user.avatar,
                }}
            />
            <View style={Styles.userTextContainer}>
                <Text style={Styles.userName}>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    );
}
