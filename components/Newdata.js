import React from 'react'
import {View,Text, Button, TextInput, StyleSheet,ActivityIndicator} from 'react-native'
import {ThemeProvider} from 'react-native-elements'
import Myheader from './Myheader'
import firebase from './firebase'




export default class Newdata extends React.Component{

    constructor(props){
        super(props),
        this.state=({
            name:'',
            email:'',
            address:'',

            showError: false,
            error: "",
            showLoading: false,
            showMessage: false,
            message: ""
        })
        this.emailRef=React.createRef(),
        this.addressRef=React.createRef()
    }

    saveData=()=>{
        if(this.state.name.length <=0){
            this.setState({showError:true, error: "The name field is required"})
            this.clearError();
            return
        }
        if(this.state.email.length <=0){
            this.setState({showError:true, error: "The email field is required"})
            this.clearError();
            return
        }
        if(this.state.address.length <=0){
            this.setState({showError:true, error: "The address field is required"})
            this.clearError();
            return
        }
        this.setState({showLoading:true})
        const stu={
            name: this.state.name,
            email: this.state.email,
            address: this.state.address
        }
        firebase.database().ref("students").push(stu)
        .then((res)=>{
            this.setState({showLoading:false})
            this.setState({
                name:"",
                email:"",
                address:"",
                showMessage: true,
                message: "The user have been created."
            
            })
            this.clearError()
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    clearError=()=>{
        setTimeout(()=>{
            this.setState({error:"",showError:false, message:"", showMessage:false})
        },2000)
    }

    render(){
        return(
            <ThemeProvider>
               <Myheader center="New data"></Myheader>

               {
                   this.state.showError && (
                       <View style={styles.errorBody}>
                            <Text style={styles.errorText}>{this.state.error}
                            </Text>
                       </View>
                    )
               }
               {
                   this.state.showMessage && (
                       <View style={styles.messageBody}>
                            <Text style={styles.messageText}>{this.state.message}
                            </Text>
                       </View>
                    )
               }
               {
                   this.state.showLoading && (
                       <ActivityIndicator
                       color="royalblue"
                       size={40}
                       ></ActivityIndicator>
                   )
               }
            
               <View style={styles.formContainer}> 
                   <View style={styles.formGroup}>
                       <Text>Name</Text>
                       <TextInput
                       style={styles.formControl}
                       onChangeText={(t)=>this.setState({name:t})}
                       value={this.state.name}
                       returnKeyType="next"
                       onSubmitEditing={()=>this.emailRef.current.focus()}
                       ></TextInput>
                   </View>
                   <View style={styles.formGroup}>
                       <Text>Email</Text>
                       <TextInput
                       //placeholder="Email"
                       autoCapitalize="none"
                       style={styles.formControl}
                       keyboardType="email-address"
                       onChangeText={(t)=>this.setState({email:t})}
                       value={this.state.email}
                       returnKeyType="next"
                       ref={this.emailRef}
                       onSubmitEditing={()=>this.addressRef.current.focus()}
                       ></TextInput>
                   </View>
                   <View style={styles.formGroup}>
                       <Text>address</Text>
                       <TextInput
                       style={styles.formControl}
                       multiline={true}
                       onChangeText={(t)=>this.setState({address:t})}
                       value={this.state.address}
                       returnKeyType="next"
                       ref={this.addressRef}
                       ></TextInput>
                   </View>
                   <View style={styles.formGroup}>
                       <Button
                       title="Save"
                       onPress={()=>this.saveData()}
                       ></Button>
                   </View>
               </View>
            </ThemeProvider>
            
        )
    }
}
const styles=StyleSheet.create({
    formContainer:{
        padding:40
    },
    formGroup:{
        marginBottom:20
    },
    formControl:{
        borderBottomColor: "#000",
        borderBottomWidth: 1
    },
    errorBody:{
        borderColor:"red",
        borderWidth:1,
        padding:10,
        borderRadius:10,
        backgroundColor:"#ffc9c9",
        marginRight:20,
        marginLeft: 20,
        marginTop: 20

    },
    errorText:{
        color:"red"
    },
    messageBody:{
        borderColor:"green",
        borderWidth:1,
        padding:10,
        borderRadius:10,
        backgroundColor:"#8ce99a",
        marginRight:20,
        marginLeft: 20,
        marginTop: 20

    },
    messageText:{
        color:"green"
    }
})