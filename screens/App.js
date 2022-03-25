/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Splash from './Splash';
import Todo from './Todo';
import Done from './Done';
import Task from './Task';
import Home from './Home';
import Camera from './Camera';

//import store from '../redux/store';
import { Provider } from 'react-redux';



// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createStackNavigator } from '@react-navigation/stack';

import { configureStore } from '@reduxjs/toolkit'
import todoSlicess from '../redux/todoSlice'

const Tab = createBottomTabNavigator();

function HomeTabs({navigation}) {
  return (
    <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon:({focused,size,color})=>{
          let iconName;
          if(route.name==='Todo'){
              iconName='list';
              size=focused?25:20;
              color=focused ?'#ff0000':'	#808080'

          }else if(route.name==='Done'){
              iconName='check';
              size=focused?25:20;
              color=focused ?'#ff0000':'	#808080'



          }
           return (<FontAwesome5 name={iconName}  size={size} color={color} />)
        
       //  return <Icon name={iconName} size={20} color={colors} />;
      },
  
      tabBarActiveTintColor:'#ff0000',
      tabBarInactiveTintColor:'#808080',
      tabBarLabelStyle: {
        fontSize: 15,
      },
      
    
  }
      
  )}

    >
      <Tab.Screen name="Todo" component={Todo} />
      <Tab.Screen name="Done" component={Done} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();


 const store = configureStore({
  reducer: {
      todos:todoSlicess
  }
})


const App = () => {
  return (
     <Provider store={store}>
    <NavigationContainer>
    <RootStack.Navigator 
    initialRouteName="Splash"
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#0080ff'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold'
      }
    }}
    >
      <RootStack.Screen name="Splash" component={Splash}  options={{
        headerShown: false,
      }}/>
      <RootStack.Screen name="HomeTabs" component={HomeTabs}  options={{ headerShown: false }} />
      <RootStack.Screen name="Task" component={Task} />
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Camera" component={Camera} />
      
    </RootStack.Navigator>
  </NavigationContainer>
     </Provider>


  );
};



export default App;
