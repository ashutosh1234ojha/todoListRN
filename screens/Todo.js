import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTask, setTaskId } from '../redux/todoSlice';
import { useSelector, useDispatch } from 'react-redux'
import CheckBox from '@react-native-community/checkbox';



const Todo = ({ navigation }) => {
  const onPressHandle = () => {
    dispatch(setTaskId(todos.tasks.length + 1))
    navigation.navigate("Task")
  }

  const onPressDelete = (id) => {
    const filteredTask = todos.tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTask))
      .then(() => {
        dispatch(setTask(filteredTask));
        Alert.alert('Success!, task removed')
      }).catch(err => {
        console.log(err)
      })
  }


  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos)

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

  const checkTask = (id, newValue) => {

    const index = todos.tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...todos.tasks];
      const Task = {
        ID: newTasks[index].ID,
        Title: newTasks[index].Title,
        Desc: newTasks[index].Desc,
        Done: newValue
      }

      //newTasks[index].Done = newValue;
        newTasks[index] = Task;

      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTask(newTasks))
          Alert.alert('Success!, task changed')
        })
        .catch(err => { console.log(err) })
    }

  }

  return (
    <View style={styles.body}>
      <FlatList style={styles.item}
        data={todos.tasks.filter(task=>task.Done===false)}
        renderItem={({ item }) => (
          <View style={styles.main}>
            <CheckBox
              disabled={false}
              value={item.Done}
              onValueChange={(newValue) => { checkTask(item.ID, newValue) }}
            />
            <TouchableOpacity
              onPress={() => {
                dispatch(setTaskId(item.ID))
                navigation.navigate("Task")
              }}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.subtitle} >{item.Desc}</Text>
            </TouchableOpacity>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonDelete}
                onPress={() => onPressDelete(item.ID)}
              >
                <FontAwesome5 name={'trash'} size={14} color={'#FF0000'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}
          onPress={() => onPressHandle()}
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
  buttonDelete: {
    width: 40,
    height: 40,
    backgroundColor: '#FF0000	',
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
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', //Centered vertically

  }
})

export default Todo;