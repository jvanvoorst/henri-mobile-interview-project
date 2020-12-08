import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as API from '../../services/api.service';

const initialState = {
    status: 'idle',
    posts: {},
    comments: {},
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        feedLoaded(state, action) {
            const _posts = {};
            const _comments = {};
            const { posts, comments } = action.payload;

            posts.forEach((post) => {
                _posts[post.id] = post;
            });
            comments.forEach((comment) => {
                _comments[comment.id] = comment;
            });

            state.posts = _posts;
            state.comments = _comments;
            state.status = 'idle';
        },
        feedLoading(state) {
            state.status = 'loading';
        },
        postDeleted(state, action) {
            delete state.posts[action.payload];
        },
    },
});

export const { feedLoaded, feedLoading, postDeleted } = feedSlice.actions;
export default feedSlice.reducer;

// Thunks
export const fetchFeed = () => async (dispatch) => {
    dispatch(feedLoading());

    const posts = await
    API.getPosts();
    const comments = await API.getComments();

    dispatch(feedLoaded({ posts: posts.data, comments: comments.data }));
};

export const deletePost = (postId) => async (dispatch) => {
    API.deletePost(postId);
    dispatch(postDeleted(postId));
};

// Selectors
// Posts objects
const selectPostData = (state) => state.feed.posts;

// Posts array
export const selectPosts = createSelector(
    selectPostData,
    (posts) => Object.values(posts)
);

export const selectPostIds = createSelector(
    selectPosts,
    (posts) => posts.map((post) => post.id)
);

export const selectPostById = (state, id) => {
    return selectPostData(state)[id];
};

// Comments
const selectCommentData = (state) => state.feed.comments;

export const selectCommentsByPostId = (state, postId) => {
    const _comments = selectCommentData(state);
    return Object.values(_comments).filter(
        (comment) => comment.postId === postId
    );
};
