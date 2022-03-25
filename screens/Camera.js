/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import {
   StyleSheet,
   Text,
   View, Image
 } from 'react-native';
 
 import GlobalStylesheet from '../globalstyle/GlobalStylesheet';
 
 
 
 const Camera = ({navigation}) => {
 

   return (
     <View style={styles.parent}>
     <Text>Camera</Text>
     
     </View>
 
   );
 };
 
 // <Text style={GlobalStylesheet.CustomFontBig}>Test</Text>
 
 
 const styles = StyleSheet.create({
  body:{
   width: '100%',
   height: undefined,
   aspectRatio: 1, 
   resizeMode: 'contain'
 
 },
 parent:{
   justifyContent: 'center',
   flex:1
 
 },
 text:{
 fontSize:34,
 textAlign: 'center', // <-- the magic
 
 },
 });
 
 export default Camera;
 