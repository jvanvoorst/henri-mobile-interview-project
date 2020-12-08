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
        postCreated(state, action) {
            // add userId and id here since would normally get from backend once created
            const post = {
                ...action.payload,
                userId: 1,
                id: Object.keys(state.posts).length + 1,
            };

            state.posts[post.id] = post;
        },
    },
});

export const { feedLoaded, feedLoading, postDeleted, postCreated } = feedSlice.actions;
export default feedSlice.reducer;

// Thunks
export const fetchFeed = () => async (dispatch) => {
    dispatch(feedLoading());

    let posts;
    let comments;
    try {
        posts = await API.getPosts();
        comments = await API.getComments();
    } catch (error) {
        return console.log('There was an error fetching posts:', error.message)
    }

    dispatch(feedLoaded({ posts: posts.data, comments: comments.data }));
};

export const deletePost = (postId) => async (dispatch) => {
    try {
        await API.deletePost(postId);
    } catch (error) {
        return console.log('There was an error deleting post:', error.message)
    }

    // TODO add post loading
    dispatch(postDeleted(postId));
};

export const createPost = (post) => async (dispatch) => {
    try {
        await API.createPost(post);
    } catch (error) {
        return console.error('There was an error creating post: ', error.message);
    }

    dispatch(postCreated(post));
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
    (posts) => posts.map((post) => post.id).reverse()
    // reversing array so that created posts show up at top
    // normally would sort by created time but there is none
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
