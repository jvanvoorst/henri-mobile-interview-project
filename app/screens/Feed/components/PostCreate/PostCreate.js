import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { createPost } from '../../Feed.slice';

import Styles from './styles';

export default function PostCreate() {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <View style={Styles.container}>
            <TextInput
                style={Styles.titleInput}
                placeholder={'Title'}
                value={title}
                onChangeText={(e) => setTitle(e)}
            />
            <TextInput
                style={Styles.bodyInput}
                placeholder={'Post'}
                value={body}
                onChangeText={(e) => setBody(e)}
            />
            <TouchableOpacity
                disabled={title.length < 3 || body.length < 3}
                onPress={() => dispatch(createPost({ title, body }))}
            >
                <Text style={Styles.createButton}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}
