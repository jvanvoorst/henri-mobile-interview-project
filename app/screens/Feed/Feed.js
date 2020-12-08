import React, { useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../common/components/Loading/Loading';
import FeedItem from './components/FeedItem';
import PostCreate from './components/PostCreate';

import { fetchFeed, selectPostIds } from './Feed.slice';
import CommonStyles from '../../common/styles';

export default function Feed() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeed());
    }, []);

    const postIds = useSelector(selectPostIds);
    const status = useSelector((state) => state.feed.status);

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <View style={CommonStyles.screenContainer}>
            <PostCreate />
            <ScrollView>
                <Text style={CommonStyles.headerText}>Feed</Text>
                {postIds.map((postId) => (
                    <FeedItem key={postId} postId={postId} />
                ))}
            </ScrollView>
        </View>
    );
}
