import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectPostById,
    selectCommentsByPostId,
    deletePost,
} from '../../Feed.slice';
import { selectUserById } from '../../../Users/Users.slice';

import Styles from './styles';
import CommonStyles from '../../../../common/styles';

export default function FeedItem({ postId }) {
    const dispatch = useDispatch();

    const post = useSelector((state) => selectPostById(state, postId));
    const user = useSelector((state) => selectUserById(state, post.userId));
    const comments = useSelector((state) =>
        selectCommentsByPostId(state, post.id)
    );

    return (
        <View style={CommonStyles.itemContainer}>
            <Image
                style={CommonStyles.avatar}
                source={{
                    uri: user.avatar,
                }}
            />
            <View style={Styles.feedTextContainer}>
                <Text style={Styles.nameTitle}>{`${user.name}: ${
                    post.title
                }`}</Text>
                <Text>{post.body}</Text>
                {comments.map((comment) => (
                    <Text key={comment.id} style={Styles.comment}>{`${
                        comment.email
                    }: ${comment.body}`}</Text>
                ))}
                <TouchableOpacity onPress={() => dispatch(deletePost(post.id))}>
                    <Text style={Styles.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
