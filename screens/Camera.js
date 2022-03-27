/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, Image, TouchableOpacity,Alert
} from 'react-native';
import { color } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskId } from '../redux/todoSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';





const Camera = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos)

    const [cameraImage, setCameraImage] = useState('https://reactnative.dev/img/tiny_logo.png')
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setCameraImage(image.path)
            updateTask(route.params.id, image.path)
        });
    }

    const updateTask = (id, path) => {
        try {
            const index = todos.tasks.findIndex(task => task.ID === id);
            let newTask = [];
            if (index > -1) {

                const Task = {
                    ID: todos.taskID,
                    Title: todos.tasks[index].Title,
                    Desc: todos.tasks[index].Desc,
                    Done: todos.tasks[index].Done,
                    Color: todos.tasks[index].Color,
                    Image: path
                }

                newTask = [...todos.tasks];
                // newTask[index].Image = path;
                   newTask[index] = Task;


                AsyncStorage.setItem("Tasks", JSON.stringify(newTask)).then(() => {
                    // dispatch(setTask(newTask))
                    dispatch(setTask(newTask))
                  }).catch(err => console.log(err))
                Alert.alert("Successfully task image saved");
                navigation.goBack();

            }
            // else {
            //     const Task = {
            //         ID: todos.taskID,
            //         Title:"",
            //         Desc: "",
            //         Done: false,
            //         Color: "#00Fd00",
            //         Image: path
            //     }
            //     newTask = [...todos.tasks, Task];
            //     AsyncStorage.setItem("Tasks", JSON.stringify(newTask)).then(() => {
            //         // dispatch(setTask(newTask))
            //         dispatch(setTask(newTask))
            //       }).catch(err => console.log(err))
            //     Alert.alert("Successfully task image saved");
            //     navigation.goBack();
            // }

        } catch (error) {
            console.log(error)
        }
        // const index = todos.tasks.findIndex(task => task.ID === todos.taskID);
        // const Task = {
        //     ID: todos.taskID,
        //     Title: title,
        //     Desc: desc,
        //     Done: done,
        //     Color: color,
        //     Image:path
        //   }




    }

    return (
        <View style={styles.parent}>
            <View style={styles.bellButton}>
                <TouchableOpacity style={styles.bellOkButton}
                    onPress={() => { openCamera() }}
                >
                    <Text style={styles.text}>Open Camera</Text>
                </TouchableOpacity>

            </View >

            <Image
                style={styles.tinyLogo}
                source={{
                    uri: cameraImage,
                }}
            />

        </View>

    );
};



const styles = StyleSheet.create({
    body: {

        flex: 1

    },
    text: {
        color: "#ffffff"
    },
    bellButton: {
        flexDirection: 'row',
        height: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    tinyLogo: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },


    bellOkButton: {
        //  flex: 1,
        borderWidth: 1,
        borderColor: '#909090',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
        height: 50,
        width: 200

    }
});

export default Camera;
