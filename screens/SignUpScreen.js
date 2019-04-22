import React, { Component } from 'react'
import { Image,View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView ,ScrollView,} from 'react-native'
import {AsyncStorage} from 'react-native';

class Inputs extends Component {
   state = {
      FName: '',
      LName: '',
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      userInfo: '',
      showerror: false,
      showpasserror: false,
   }
   handleFName = (text) => {
      this.setState({ FName: text })
   }
   handleLName = (text) => {
      this.setState({ LName: text })
   }
   handleUser = (text) => {
      this.setState({ username: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   handlePasswordConfirm = (text) => {
      this.setState({ passwordConfirm: text })
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   login = (username, pass, passCon, fname, lname, email) => {

     if(username != '' && pass != '' && passCon != '' &&
        fname != '' && lname != '' && email != '')
        {
          this.state.showerror = false;
          this.forceUpdate();
        }

     if (pass == passCon && pass != '') {
       this.state.showpasserror = false;
       this.forceUpdate();
     }

     if(username != '' && pass != '' && passCon != '' &&
        fname != '' && lname != '' && email != '')
        {
     if(pass == passCon){
       let jsonpackage = JSON.stringify({
           "fname":fname,"lname":lname, "username":username,
           "email":email,"password":pass,"password2":passCon,
           })

       fetch('https://poopspring2019.website/API/registration.php', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: jsonpackage,//body
         }).then((response) => response.json())
         .then((responseJson) => {
            //console.log('[Response obj]', responseJson);  //
            //console.log('[Sent obj]', jsonpackage);       // for tests
            //alert(responseJson.error);                   //

            if(responseJson.error == ""){

              this.state.userInfo = responseJson;
              this.state.userInfo.username = this.state.username;
              this.state.userInfo.password = this.state.password;
              this.state.userInfo.firstName = this.state.FName;
              this.state.userInfo.lastName = this.state.LName;
              this.state.userInfo.email = this.state.email;

              AsyncStorage.setItem("userInfo" , JSON.stringify(this.state.userInfo));

              const {navigate} = this.props.navigation;
              navigate('EditProfile', {})
            }

          });

   }
   else{
     this.state.showpasserror = true;
     this.forceUpdate();
     //error passwords dont match
   }
 }//if no input or input missing
 else{
   this.state.showerror = true;
   this.forceUpdate();
 }// missing input error
   }

   goBack = () => {
     const {navigate} = this.props.navigation;
     navigate('Login', {});
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
                Please fill out all fields.
              </Text>
             : null}
             { this.state.showpasserror ?
               <Text style={styles.ErrorText}>
                 Password / Pasword Confirmation don't match
                 {"\n"} Please try again.
               </Text>
              : null}

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handleFName}/>

               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Last Name"
                  placeholderTextColor = "#3E3E3E"
                  autoCapitalize = "none"
                  onChangeText = {this.handleLName}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "UserName"
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handleUser}/>

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              placeholderTextColor = "#3E3E3E"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Confirm Password"
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePasswordConfirm}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.username, this.state.password,
                    this.state.passwordConfirm, this.state.FName,
                    this.state.LName,this.state.email)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goBack()}
               style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.kcontainer}>
            </View>

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
  kcontainer: {
    paddingTop: 30,
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
     shadowRadius: 10,
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
