import React from 'react'
import {View,Text,FlatList,TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import {ThemeProvider,ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Myheader from './Myheader'
import firebase from './firebase'

class Students extends React.Component{
    render(){
        return(
            <View>
                <ListItem
                    title={this.props.name}
                    subtitle={this.props.email}
                    rightSubtitle={this.props.address}
                    rightIcon={
                        <TouchableOpacity onPress={()=>{this.props.dData()}}>
                            <Text>
                                <Icon name="trash" size={15} color="red"></Icon>
                            </Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                ></ListItem>
            </View>
        )
    }
}

export default class Showdata extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            students:[],
            showLoading:false,
            
        })
    }
    componentDidMount=()=>{
        this.fetchStudents();
    }
    
    deleteData=(id)=>{
        Alert.alert(
            "Confirm",
            "The selected student will be deleted permanently.",
            [
                {text: "No", style: "cancel"},
                {text: "Yes", style: "destructive", onPress:()=>this.confirmDelete(id)}
            ]
        )
    }

    confirmDelete=(id)=>{
        firebase.database().ref("students/"+id).remove()
        .then((res)=>{
            this.fetchStudents();
        })
        .catch((err)=>{

        })
    }

    

    fetchStudents=()=>{
        this.setState({showLoading:true})
        firebase.database().ref("students").once("value")
        .then((res)=>{
            //console.log(res.val())
            this.setState({showLoading:false})
            const d=res.val();
            const stus=[];

            for(s in d){
                //console.log(d[s].name)
                let stu={
                    id: s,
                    name: d[s].name,
                    email: d[s].email,
                    address: d[s].address
                }
                stus.unshift(stu);

            }
            //console.log(stus)
            this.setState({students:stus})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <ThemeProvider>
                <Myheader center="Show Data"></Myheader>
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                        color="royalblue"
                        size={40}
                        ></ActivityIndicator>
                    )
                }

                <View>
                    <FlatList
                    refreshing={this.state.showLoading}
                    onRefresh={()=>this.fetchStudents()}
                    keyExtractor={(s)=>s.id.toString()}
                    data={this.state.students}
                    renderItem={(s)=>{
                        //console.log(s)
                        return(
                            <Students
                            dData={()=>this.deleteData(s.item.id)}
                            id={s.item.id}
                            name={s.item.name}
                            email={s.item.email}
                            address={s.item.address}
                            ></Students>
                        )
                    }}
                    />
                </View>
            </ThemeProvider>
        )
    }
}