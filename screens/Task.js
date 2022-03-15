import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

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
  const [done, setDone] = useState(false)

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos)

  const getTask = () => {
    const Task = todos.tasks.find(task => task.ID === todos.taskID)
    if (Task) {

      //  const tt = Task.Title
      setTitle(Task.Title)
      setDesc(Task.Desc)
      setDone(Task.Done)

      // console.log("Task title " + title)
      // console.log("Task Des " + desc)
    }
  }

  useEffect(() => {
    console.log("UseEffect")
    getTask()
  },[])

  const onPressHandle = () => {
    if (title.length == 0 || desc.length == 0) {
      Alert.alert("Title/Desc is empty")
    } else {

      try {
        const Task = {
          ID: todos.taskID,
          Title: title,
          Desc: desc,
          Done: done
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

      <View style={styles.checkBox}>
        <CheckBox
          disabled={false}
          value={done}
          onValueChange={(newValue) => setDone(newValue)}
        />
        <Text style={styles.checkBoxText}>Task Done</Text>
      </View>

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
  },
  checkBox: {
    flexDirection: 'row',
    margin: 10
  },
  checkBoxText: {
    fontSize: 20
  }
})

export default Task;

