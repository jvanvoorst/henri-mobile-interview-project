import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/loading/Loading';
import { fetchFeed, selectPostIds } from './Feed.slice';
import FeedItem from '../../components/FeedItem';

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
        <ScrollView style={CommonStyles.screenContainer}>
            <Text style={CommonStyles.headerText}>Feed</Text>
            {postIds.map((postId) => (
                <FeedItem key={postId} postId={postId} />
            ))}
        </ScrollView>
    );
}
