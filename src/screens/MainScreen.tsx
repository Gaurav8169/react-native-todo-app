import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { LayoutAnimation } from 'react-native';
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  setFilter,
  setSort,
} from '../store/todoSlice';
import TodoItem from '../components/TodoItem';

const MainScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, filter, sortBy, page, loading } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    dispatch(fetchTodos(1));
  }, []);

  const loadMore = () => {
    if (!loading) {
      dispatch(fetchTodos(page));
    }
  };

  const handleToggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(deleteTodo(id));
  };

  // Filter + Sort (memoized for performance)
  const visibleTodos = useMemo(() => {
    let list = [...todos];

    // Filter
    if (filter === 'ACTIVE') {
      list = list.filter(t => !t.completed);
    } else if (filter === 'DONE') {
      list = list.filter(t => t.completed);
    }

    // Sort
    if (sortBy === 'RECENT') {
      list.sort((a, b) => b.updated_at - a.updated_at);
    } else {
      list.sort((a, b) => a.id - b.id);
    }

    return list;
  }, [todos, filter, sortBy]);

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  return (
    <View style={styles.container}>
      {/* Count */}
      <Text style={styles.countText}>
        Total: {total} | Done: {completed}
      </Text>

      {/* Add Button */}
      <Button title="Add Todo" onPress={() => navigation.navigate('AddTodo')} />

      {/* Filter Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Filter:</Text>
        <Button title="All" onPress={() => dispatch(setFilter('ALL'))} />
        <Button title="Active" onPress={() => dispatch(setFilter('ACTIVE'))} />
        <Button title="Done" onPress={() => dispatch(setFilter('DONE'))} />
      </View>

      {/* Sort Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Sort:</Text>
        <Button title="By ID" onPress={() => dispatch(setSort('ID'))} />
        <Button
          title="Most Recent"
          onPress={() => dispatch(setSort('RECENT'))}
        />
      </View>

      {/* List */}
      <FlatList
        data={visibleTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('AddTodo', { todo: item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <Text style={{ textAlign: 'center' }}>Loading...</Text>
          ) : null
        }
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 5,
  },
  label: {
    marginRight: 5,
    fontWeight: '600',
  },
});
