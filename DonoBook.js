import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase';
import db from '../config';

export default class AuthenticationScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            isModalVisible:"false",
            firstName: '',
            lastName: '',
            address: '',
            confirmPasword: '',
            contact: ''
        }
    }
    SignUp=(emailId, password, confirmPasword)=>{
        if(password !== confirmPasword){
            return Alert.alert("Password and the Confirmed Password do not match. Please Reenter!")
        }else{
            
        
        firebase.auth().createUserWithEmailIdAndPassword(emailId, password)
        .then(()=>{
            db.collection('users').add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                contact: this.state.contact,
                password: this.state.password,
                emailAddress: this.state.emailAddress,
                confirmPasword: this.state.confirmPasword,
                address: this.state.address
            })
            return Alert.alert( 'User Added Successfully', '', 
            [{text: 'OK', onPress: () => this.setState({
                "isModalVisible" : false
            })}, ] ); })
            
            

        .catch(function(error){
            var errorCode=error.code
            var errorMessage=error.message;
            return Alert.alert(errorMessage)
        })
    }
}
    Login=(emailId, password)=>{
        firebase.auth().signInWithEmailIdAndPassword(emailId, password)
        .then((response)=>{
            return Alert.alert("You have successfully Logged In!")
        })
        .catch(function(error){
            var errorCode=error.code
            var errorMessage=error.message;
            return Alert.alert(errorMessage)
        })
    }
    showModal=()=>{
        return(
            <Modal animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}>
            <View style={styles.ModalContainer}>
                <ScrollView styles={{width: '100%'}}>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                        <Text style={styles=ModalTitle}>
                            Registration for Dono Book:
                        </Text>
                        <TextInput style={styles.FormInput}>
                                placeholder={"First Name"}
                                maxLength={10}
                                onChangeText={(text)=>{
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Last Name"}
                                maxLength={10}
                                onChangeText={(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Contact Number"}
                                maxLength={11}
                                keyboardType={'numeric'}
                                onChangeText={(text)=>{
                                    this.setState({
                                        contact: text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        address: text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Email Adress"}
                                maxLength={20}
                                onChangeText={(text)=>{
                                    this.setState({
                                        emailAddress:text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password: text
                                    })
                                }}
                        </TextInput>
                        <TextInput style={styles.FormInput}>
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPasword: text
                                    })
                                }}
                        </TextInput>
                        <View style={styles.ModalBackButton}>
                            <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                this.SignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                            }}>
                               <Text styles={{ fontSize='30',fontFamily= 'Times New Roman'}}>Click to Register!</Text>   
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ModalBackButton}>
                            <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                this.setState({
                                    "isModalVisible": false
                                })
                            }}>
                               <Text styles={{ fontSize='25',fontFamily= 'Times New Roman', fontColor='red'}}>Click to Cancel.</Text>   
                            </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>    
                </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
            <View>
                <TextInput style={styles.loginBox} placeholder="BookSanta@book.com" 
                 keyboardType='Email Address' 
                 onChangeText={(text)=>{
                     this.setState({
                         emailId:text
                     })
                 }}>

                </TextInput>

                <View>
                <TextInput style={styles.loginBox} placeholder="Password"
                 secureTextEntry={true} 
                 keyboardType='password' 
                 onChangeText={(text)=>{
                     this.setState({
                         password:text
                     })
                 }}>

                </TextInput>
                <TouchableOpacity style={styles.button} 
                onPress={()=>{this.SignUp(this.state.emailId, this.state.password)}}>
                <Text>
                    SignUp
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} 
                onPress={()=>{this.Login(this.state.emailId, this.state.password)}}>
                <Text>
                    Login
                </Text>
                </TouchableOpacity>
            
            <View>
                <Text style={styles.Title}>
                    Welcome to the DonoBook!
                </Text>
            </View>
            </View>
            </View>
            </View>
        )
    }
}
 const styles= StyleSheet.create({
     loginBox:{
         width: 250,
         height: 50,
         paddingLeft: 40,
         borderWidth: 2,
         borderColor: '#b0b0b0',
         margin: 5
     },
     container:{
         flex:1,
         backgroundColor: '#52c8ff',
     },
     Title:{
         fontSize: 50,
         fontWeight: 10,
         fontFamily: "Times New Roman",
         fontColor: '#ffffff'
     },
     button:{
         width: 150,
         height: 50,
         borderRadius: 20,
         backgroundColor: '#44c95b',
         fontColor: 'white',
         justifyContent: 'center',
         alignItems: 'center'
     },
     ModalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft=30,
        backgroundColor: '#52c8ff',
        borderRadius:12
     },
     FormInput:{
        width:150,
        height:50,
        borderColor: "black",
        borderRadius: 6,
        borderWidth: 3,
        marginTop: 20,
        padding: 13
     },
     ModalTitle:{
        justifyContent: 'center',
        fontSize: 30,
        fontColor:"black"
     },
     KeyboardAvoidingView:{
        flex:1,
        justifyContent: 'center',
        alignItem: 'center',
     }

 })
