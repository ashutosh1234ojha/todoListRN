import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskId } from '../redux/todoSlice'

const Task = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos)

  const getTask = () => {
    const Task = todos.tasks.find(task => task.ID === todos.taskID)
    if (Task) {

      const tt = Task.Title
      setTitle(tt)
      setDesc(Task.Desc)

      console.log("Task title " + title)
      console.log("Task Des " + desc)
    }
  }



  useEffect(() => {
    getTask()
  })

  const onPressHandle = () => {
    if (title.length == 0 || desc.length == 0) {
      Alert.alert("Title/Desc is empty")
    } else {

      try {
        const Task = {
          ID: todos.taskID,
          Title: title,
          Desc: desc
        }
        const index = todos.tasks.findIndex(task => task.ID === todos.taskID);

        let newTask = [];

        if (index > -1) {
          newTask = [...todos.tasks];
          newTask[index] = Task;
        } else {
          newTask = [...todos.tasks, Task];
        }

        AsyncStorage.setItem("Tasks", JSON.stringify(newTask)).then(() => {
          // dispatch(setTask(newTask))
          dispatch(setTask(newTask))
        }).catch(err => console.log(err))
        Alert.alert("Successfully task added");
        navigation.goBack();
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <View>
      <TextInput style={styles.input}
        value={title}
        placeholder='Title'
        onChangeText={(value) => setTitle(value)} />

      <TextInput style={styles.input}
        value={desc}
        placeholder='Description'
        onChangeText={(value) => setDesc(value)} />

      <TouchableOpacity style={styles.button}
        onPress={onPressHandle} >
        <Text style={styles.text}>Save Task</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  input: {

    borderColor: '#000000',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    height: 46
  },
  button: {

    height: 50,
    backgroundColor: '#00FF00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

  },
  text: {
    color: "#000000"
  }
})

export default Task;

