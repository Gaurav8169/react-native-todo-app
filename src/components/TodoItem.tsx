import React, { memo } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Todo } from '../types/todo';

interface Props {
  item: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem = ({ item, onToggle, onDelete, onEdit }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        gap: 5,
      }}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <Text
          numberOfLines={3}
          style={{
            textDecorationLine: item.completed ? 'line-through' : 'none',
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <View style={{ width: 80 }}>
        <Button title="Delete" onPress={onDelete} />
      </View>
      <View style={{ width: 80 }}>
        <Button title="Edit" onPress={onEdit} />
      </View>
    </View>
  );
};

export default memo(TodoItem);
