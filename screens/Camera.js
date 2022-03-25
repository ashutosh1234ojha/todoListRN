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
    View, Image, TouchableOpacity
} from 'react-native';
import { color } from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';




const Camera = ({ navigation }) => {

    const [cameraImage, setCameraImage] = useState('https://reactnative.dev/img/tiny_logo.png')
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setCameraImage(image.path)
          });

        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: true
        //   }).then(image => {
        //     // console.log("ImageConsole",CameraResult);

        //      console.log("ImageConsole",image);
        //     setCameraImage(image.path)
        //   });
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
