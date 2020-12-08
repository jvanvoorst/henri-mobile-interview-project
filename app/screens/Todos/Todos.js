/* eslint-disable no-confusing-arrow */
import React, { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';

import Loading from '../../components/loading/Loading';
import { getTodos } from '../../services/api.service';
import TodoItem from '../../components/TodoItem/TodosItem';

import CommonStyles from '../../common/styles';

export default function Todos() {
    const [status, setStatus] = useState('idle');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setStatus('loading');
                const _todos = await getTodos();
                setTodos(_todos.data);
                setStatus('idle');
            } catch (error) {
                console.log('Failed to fetch Todos: ', error.message);
            }
        })();
    }, []);

    const _toggleCompleted = (todo) => {
        const _todos = todos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
        );

        setTodos(_todos);
    };

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <ScrollView style={CommonStyles.screenContainer}>
            <Text style={CommonStyles.headerText}>Users</Text>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleCompleted={_toggleCompleted}
                />
            ))}
        </ScrollView>
    );
}
