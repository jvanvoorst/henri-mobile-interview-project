import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { usersLoading, usersLoaded, selectUserIds } from './Users.slice';
import { getAvatars, getUsers } from '../../services/api.service';
import UserItem from './components/UserItem';
import Loading from '../../common/components/Loading';

import CommonStyles from '../../common/styles';

export default function Users() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                dispatch(usersLoading());
                const users = await getUsers();
                const avatars = await getAvatars();
                dispatch(
                    usersLoaded({ users: users.data, avatars: avatars.data })
                );
            } catch (error) {
                console.error('Unable to fetch users:', error.message);
            }
        })();
    }, []);

    const userIds = useSelector(selectUserIds);
    const status = useSelector((state) => state.users.status);

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <ScrollView style={CommonStyles.screenContainer}>
            <Text style={CommonStyles.headerText}>Todos</Text>
            {userIds.map((id) => (
                <UserItem key={id} id={id} />
            ))}
        </ScrollView>
    );
}
