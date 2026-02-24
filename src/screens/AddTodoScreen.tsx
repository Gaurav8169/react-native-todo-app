import { useRoute } from '@react-navigation/native';
import { addTodo, editTodo } from '../store/todoSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { LayoutAnimation } from 'react-native';

const AddTodoScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const route = useRoute<any>();

  const todo = route.params?.todo;

  const [text, setText] = useState(todo?.title || '');

  const handleSave = () => {
    if (!text.trim()) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (todo) {
      // Editing existing todo
      dispatch(
        editTodo({
          id: todo.id,
          title: text,
        }),
      );
    } else {
      // Adding new todo
      dispatch(addTodo(text));
    }

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title={todo ? 'Update' : 'Add'} onPress={handleSave} />
    </View>
  );
};

export default AddTodoScreen;
