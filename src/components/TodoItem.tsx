import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../types/todo';

interface Props {
  item: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem = ({ item, onToggle, onDelete, onEdit }: Props) => {
  return (
    <View style={styles.container}>
      {/* Left Section: Checkbox + Title */}
      <TouchableOpacity style={styles.leftSection} onPress={onToggle}>
        {/* Checkbox */}
        <View style={[styles.checkbox, item.completed && styles.checked]}>
          {item.completed && <Text style={styles.checkMark}>✓</Text>}
        </View>

        {/* Title */}
        <Text
          style={[styles.title, item.completed && styles.completedText]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Right Section: Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(TodoItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#334155',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checked: {
    backgroundColor: '#334155',
  },

  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  title: {
    flex: 1,
    fontSize: 14,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

  actions: {
    flexDirection: 'row',
  },

  editBtn: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    borderRadius: 4,
  },

  deleteBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});
