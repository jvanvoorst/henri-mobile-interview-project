import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    data: {},
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersLoaded(state, action) {
            const data = {};

            action.payload.users.forEach((user, i) => {
                data[user.id] = {
                    ...user,
                    avatar: action.payload.avatars[i].photo
                }
            });

            state.data = data;
            state.status = 'idle';
        },
        usersLoading(state) {
            state.status = 'loading';
        },
    },
});

export const { usersLoaded, usersLoading } = usersSlice.actions;
export default usersSlice.reducer;

// Selectors
// Users object, ids are keys and values are users object
const selectUsersData = (state) => state.users.data;

// Users array
export const selectUsers = createSelector(
    selectUsersData,
    (data) => Object.values(data)
);

export const selectUserIds = createSelector(
    selectUsers,
    (users) => users.map((user) => user.id)
);

export const selectUserById = (state, id) => {
    return selectUsersData(state)[id];
};

