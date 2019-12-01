import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {} from 'react-native-elements'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Newdata from './components/Newdata'
import Showdata from './components/Showdata'


export default class App extends React.Component {
  render(){

    const MyTab=createBottomTabNavigator({
      Adddata:{
        screen:Newdata,
        navigationOptions:{
          tabBarLabel:"Add Some Data",
          tabBarIcon:({tintColor})=><Icon name="plus-circle" color={tintColor} size={15}></Icon>
        }
      },
      Showdata:{
        screen:Showdata,
        navigationOptions:{
          tabBarLabel:"Available Data",
          tabBarIcon:({tintColor})=><Icon name="tags" color={tintColor} size={15}></Icon>
        }
      }
    },{
      initialRouteName:"Showdata"
    })

    const AppContainer=createAppContainer(MyTab)

    return (<AppContainer></AppContainer>)
  }
  
}


