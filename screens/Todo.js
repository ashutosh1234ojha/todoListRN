import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTask, setTaskId } from '../redux/todoSlice';
import { useSelector, useDispatch } from 'react-redux'


const Todo = ({ navigation }) => {
  const onPressHandle = () => {
    dispatch(setTaskId(todos.tasks.length + 1))
    //  console.log(todos.taskID)
    console.log("Lenght " + todos.tasks.length)
    console.log(todos)
    navigation.navigate("Task")
  }

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos)
  // const { tasks, taskID } = useSelector((state) => state.todos)

  const getTasks = () => {
    AsyncStorage.getItem('Tasks').then(tasks => {
      const parsedTasks = JSON.parse(tasks);
      if (parsedTasks && typeof parsedTasks === 'object') {
        dispatch(setTask(parsedTasks))
      }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getTasks();
  }, [])

  return (
    <View style={styles.body}>
      <FlatList style={styles.item}
        data={todos.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={()=>{
            dispatch(setTaskId(item.ID))
            navigation.navigate("Task")
          }}>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.subtitle} >{item.Desc}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}
          onPress={onPressHandle}
        >
          <FontAwesome5 name={'plus'} size={25} color={'#ffffff'} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0000ff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,

  },
  buttonView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5
  },
  title: {
    color: "#000000",
    fontSize: 30,
    margin: 5
  },
  subtitle: {
    color: "#999999",
    fontSize: 20,
    margin: 5
  }
})

export default Todo;