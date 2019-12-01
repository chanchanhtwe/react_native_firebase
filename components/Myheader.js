import React from 'react'
import {View,Text} from 'react-native'
import {ThemeProvider,Header} from 'react-native-elements'

export default class Myheader extends React.Component{
    render(){
        return(
            <Header
            centerComponent={{text: this.props.center, style:{color: "#fff", fontSize:20}}}
            ></Header>
        )
    }
}