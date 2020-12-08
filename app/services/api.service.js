import axios from 'axios';

export function getUsers() {
    return axios.get('https://jsonplaceholder.typicode.com/users');
}

export function getAvatars() {
    return axios({
        method: 'get',
        url: 'https://uifaces.co/api',
        headers: {
            'X-API-KEY': 'C18BDE39-E22D4A37-9827F2A7-9A6BFF2C',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
        },
    });
}

export function getTodos() {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
}

export function getPosts() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

export function getComments() {
    return axios.get('https://jsonplaceholder.typicode.com/comments');
}

export function deletePost(postId) {
    return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

export function createPost(post) {
    return axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        post
    );
}
