import React, { Component } from 'react'
import { Image,View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {AsyncStorage} from 'react-native';


class Inputs extends Component {

  constructor(props) {

      super(props)
      this.state = {
         username: '',
         password: '',
         userInfo: '',
         showerror: false,
      }
    }

   handleUser = (text) => {
      this.setState({ username: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }

   login = (username, pass) => {
     if(username != ''&& pass != ''){

     let jsonpackage = JSON.stringify({
         "username":username,"password":pass,
         })

     fetch('https://poopspring2019.website/API/Login.php', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: jsonpackage,//body
       }).then((response) => response.json())
       .then((responseJson) => {
          console.log('[Response obj]', responseJson);  //
          //console.log('[Sent obj]', jsonpackage);       // for tests
          //alert(responseJson.userID);                   //

          if (responseJson.userID != 0 && responseJson.userID != 13) {// will check for good userid after testing

            this.state.userInfo = responseJson;
            this.state.userInfo.username = this.state.username;
            this.state.userInfo.password = this.state.password;

            AsyncStorage.setItem("userInfo" , JSON.stringify(this.state.userInfo));
            //AsyncStorage.setItem("userID" , responseJson.userID.toString());

            const {navigate} = this.props.navigation;        //
            navigate("Swipes",);// How to pass data to another screen
          }
          else{
            this.state.showerror = true;
            this.forceUpdate()
          }

      });//fetch
    }// if no input
    else{
      this.state.showerror = true;
      this.forceUpdate();
    }



   }
   signup = () => {
     const {navigate} = this.props.navigation;
     navigate('SignUp', {});

   }
   render() {
      return (

         //<View style = {styles.container} height='100%'>
         <KeyboardAvoidingView
               style={styles.container}
               behavior="padding"
               height='100%'
         >
            <Image
              source={require('../assets/images/PuppyPals-Logo.png')}
              style={styles.welcomeImage}
            />

          { this.state.showerror ?
            <Text style={styles.ErrorText}>
              There was an issue with your Username/Password.
              {"\n"} Please try again.
            </Text>
           : null}

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#bababa"
               autoCapitalize = "none"
               onChangeText = {this.handleUser}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               secureTextEntry={true}
               placeholder = "Password"
               placeholderTextColor = "#bababa"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}

               onPress = {
                  () => this.login(this.state.username, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Sign In </Text>
            </TouchableOpacity>

            <Text >
              Don't have an account?
            </Text><TouchableOpacity onPress={() => this.signup()}
               style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Sign Up Now!</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
         //</View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#efefee',
   },
   welcomeImage: {
     width: '80%',
     height: '30%',
     resizeMode: 'contain',
     //borderColor: 'black',
     justifyContent: 'center',
     //marginTop: 3,
     //marginLeft: -10,
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: 'transparent',
      backgroundColor: 'white',
      //borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',

      width: "75%",
   },
   submitButton: {
      backgroundColor: '#d7ad7e',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius: 10,
      width: "50%",
      shadowOffset:{  width: 10,  height: 10,  },
      shadowColor: 'black',
      shadowOpacity: 2.0,
      shadowRadius: 1,
      elevation: 4,
   },
   signupLink: {
     paddingVertical: 15,
   },
   signupLinkText: {
     fontSize: 14,
     color: '#2e78b7',
   },
   ErrorText: {
     color: 'red',
     textAlign: 'center',
   },
   submitButtonText:{
      color: '#636363',
      textAlign: 'center'
   }
})
