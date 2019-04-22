import React, { Component } from 'react'
import { Image,View, Text,ScrollView, TouchableOpacity, TextInput,Keyboard,
  StyleSheet,KeyboardAvoidingView, Platform } from 'react-native'
import {AsyncStorage} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { ImagePicker } from 'expo';
import { List, ListItem, Avatar } from 'react-native-elements';

var radioSizeSeeking = [
  {label: 'Small', value: 0 },
  {label: 'Medium', value: 1 },
  {label: 'Large', value: 2 },
  {label: 'Any', value: 3 },
];

var radioSize = [
  {label: 'Small', value: 0 },
  {label: 'Medium', value: 1 },
  {label: 'Large', value: 2 },
];

var radioGender = [
  {label: 'Male', value: 'Male' },
  {label: 'Female', value: 'Female' },
];

var radioGenderSeeking = [
  {label: 'Male', value: 'Male' },
  {label: 'Female', value: 'Female' },
  {label: 'Both', value: 'Both' },
];

var radioRadius = [
  {label: '<5 Miles', value: 5 },
  {label: '10 Miles', value: 15 },
  {label: '30', value: 30 },
  {label: '50', value: 50 },
];

class Inputs extends Component {

  constructor()
  {
    super();

   this.state = {
    userInfo: '',
    newInfo: '',
    showerror: false,
    passerror: false,
    newUser: true,
    img: '',
    passCon: '',
   }
}

  handleText = (text) => {
    var length = text.length;

    for(var i = length-1; i > 0; i--)
    {
      var sub = text;
      if(sub.charAt(i) == '\n')
      {
        text = sub.substring(0, i-1);
      }
      else{
        break;
      }
      return text;
    }
    if(sub.charAt(0) == '\n')
    {
      return "";
    }
    return text;
  }

  handleUserName = (text) => {
     this.state.newInfo.username = text;
  }
  handleEmail = (text) => {
     this.state.newInfo.email = text;
  }
  handlePassword = (text) => {
     this.state.newInfo.password = text;
  }
  handleConfirmPassword = (text) => {
     this.state.passCon = text;
  }

  handleFName = (text) => {
     this.state.newInfo.firstName = text;
  }
  handleLName = (text) => {
     this.state.newInfo.lastName = text;
  }

   handlePetName = (text) => {
      this.state.newInfo.dName = text;
   }
   handlePetAge = (text) => {
      this.state.newInfo.age = text;
   }
   handlePetGender = (text) => {
      this.state.newInfo.gender = text;
   }
   // this will need to be a radio button assigned text (0,1,2) for S/M/L size
   handlePetSize = (text) => {
    this.state.newInfo.size = text;// must be 0, 1 or 2
   }
   // this will need to be a radio button assigned text (0,1,2) for S/M/L size
   handlePetSizeSeeking = (text) => {
    this.state.newInfo.sizeSeeking = text;// must be 0, 1 or 2
   }
   handlePetBreed = (text) => {
    this.state.newInfo.breed = text;
   }
   handleBio = (text) => {
    text = this.handleText(text);
    this.state.newInfo.bio = text;
   }
   handleMatchMessage = (text) => {
    text = this.handleText(text);
    this.state.newInfo.matchMessage = text;
   }
   handleRadius = (text) => {
    this.state.newInfo.radiusSeeking = text;
   }
   handleGenderSeeking = (text) => {
    this.state.newInfo.genderSeeking = text;
   }
   handleImage = (text) => {
    this.state.newInfo.breed = text;
   }


   login = () => {
     console.log("userInfo-", this.state.newInfo);
     // error checking
    if((this.state.newInfo.dName != '' &&
        this.state.newInfo.age != '' &&
        this.state.newInfo.gender != '' &&
        this.state.newInfo.sizeSeeking != '' &&
        this.state.newInfo.firstName != '' &&
        this.state.newInfo.lastName != '' &&
        this.state.newInfo.size != '' &&
        this.state.newInfo.breed != '' &&
        this.state.newInfo.username != '' &&
        this.state.newInfo.email != '' &&
        this.state.newInfo.password != '' &&
        this.state.newInfo.matchMessage != '' &&
        this.state.newInfo.bio != '') &&
        (this.state.newInfo.dName != null &&
         this.state.newInfo.age != null &&
         this.state.newInfo.gender != null &&
         this.state.newInfo.firstName != null &&
         this.state.newInfo.lastName != null &&
         this.state.newInfo.sizeSeeking != null &&
         this.state.newInfo.size != null &&
         this.state.newInfo.breed != null &&
         this.state.newInfo.username != null &&
         this.state.newInfo.email != null &&
         this.state.newInfo.password != null &&
         this.state.newInfo.matchMessage != null &&
         this.state.newInfo.bio != null)
        || !this.state.newUser
      ){

    if(this.state.passCon == this.state.newInfo.password){

        // assign new values, if edited
        if(this.state.newInfo.firstName != '' && this.state.newInfo.firstName != null){
            this.state.userInfo.firstName = this.state.newInfo.firstName;
          }
        if(this.state.newInfo.lastName != '' && this.state.newInfo.lastName != null){
            this.state.userInfo.lastName = this.state.newInfo.lastName;
          }
        if(this.state.newInfo.dName != '' && this.state.newInfo.dName != null){
            this.state.userInfo.dName = this.state.newInfo.dName;
          }
        if(this.state.newInfo.age != '' && this.state.newInfo.age != null){
            this.state.userInfo.age = this.state.newInfo.age;
          }
        if(this.state.newInfo.gender != '' && this.state.newInfo.gender != null){
            this.state.userInfo.gender = this.state.newInfo.gender;
          }
        if(this.state.newInfo.genderSeeking != '' && this.state.newInfo.genderSeeking != null){
            this.state.userInfo.genderSeeking = this.state.newInfo.genderSeeking;
          }
        if(this.state.newInfo.radiusSeeking != '' && this.state.newInfo.radiusSeeking != null){
            this.state.userInfo.radiusSeeking = this.state.newInfo.radiusSeeking;
          }
        if(this.state.newInfo.sizeSeeking != '' && this.state.newInfo.sizeSeeking != null){
            this.state.userInfo.sizeSeeking = this.state.newInfo.sizeSeeking;
          }
        if(this.state.newInfo.size != '' && this.state.newInfo.size != null){
            this.state.userInfo.size = this.state.newInfo.size;
          }
        if(this.state.newInfo.breed != '' && this.state.newInfo.breed != null){
            this.state.userInfo.breed = this.state.newInfo.breed;
          }
        if(this.state.newInfo.bio != '' && this.state.newInfo.bio != null){
            this.state.userInfo.bio = this.state.newInfo.bio;
          }
        if(this.state.newInfo.matchMessage != '' && this.state.newInfo.matchMessage != null){
            this.state.userInfo.matchMessage = this.state.newInfo.matchMessage;
          }

        if(this.state.newInfo.username != '' && this.state.newInfo.username != null){
            this.state.userInfo.username = this.state.newInfo.username;
          }
        if(this.state.newInfo.email != '' && this.state.newInfo.email != null){
            this.state.userInfo.email = this.state.newInfo.email;
          }
        if(this.state.newInfo.password != '' && this.state.newInfo.password != null)
          {
            this.state.userInfo.password = this.state.newInfo.password;
          }



     //save updated profile to device
     AsyncStorage.setItem("userInfo" , JSON.stringify(this.state.userInfo));



     // build json package
     let jsonpackage = JSON.stringify({
  "userID": this.state.userInfo.userID,
  "firstName":this.state.userInfo.firstName,
  "lastName":this.state.userInfo.lastName,
  "email":this.state.userInfo.email,
  "username":this.state.userInfo.username,
  "password":this.state.userInfo.password,
  "matchMessage":this.state.userInfo.matchMessage,
  "age": this.state.userInfo.age,
  "bio": this.state.userInfo.bio,
  "breed": this.state.userInfo.breed,
  "dName": this.state.userInfo.dName,
  "gender": this.state.userInfo.gender,
  "imgDog": this.state.userInfo.imgDog,
  "size": this.state.userInfo.size,
  "genderSeeking": this.state.userInfo.genderSeeking,
  "radiusSeeking": this.state.userInfo.radiusSeeking,
  "sizeSeeking": this.state.userInfo.sizeSeeking,
})

     console.log('[Sent obj]', jsonpackage);

     //fetch to api to update server-side user info
     fetch('https://poopspring2019.website/API/UpdateUser.php', {
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
            const {navigate} = this.props.navigation;
            navigate('Profile', {});
          }

        });


      }// if mismatch passwords
      else {
        this.state.passerror = true;
        this.forceUpdate();
      }

      }//if no input missing
      else{
        this.state.showerror = true;
        this.forceUpdate();
      }// missing input error

   }// login

   componentWillMount(){
     AsyncStorage.getItem("userInfo", (err,ret) =>{
       this.setState({userInfo: JSON.parse(ret)});
       this.setState({newInfo: JSON.parse(ret)});
       this.state.passCon = this.state.userInfo.password;

       if(this.state.userInfo.dName != null){
        this.state.newUser = false;
        //alert("yes");
         }

       if(this.state.userInfo.imgDog == ""){
        this.state.newUser.imgDog = '../assets/images/3.png';
        alert("img is empty");
         }

   });//AsyncStorage-get
   }

   //Picking Image From Library
      _pickImage = async () => {
         let result = await ImagePicker.launchImageLibraryAsync({
           allowsEditing: true,
         });
         console.log(result);
         if (!result.cancelled) {
           //this.setState({ image: result.uri });
           console.log(result.uri);

         let localUri = result.uri;
         let filename = localUri.split('/').pop();
         let match = /\.(\w+)$/.exec(filename);
         let type = match ? `image/${match[1]}` : `image`;
         let formData = new FormData();
         formData.append('photo', { uri: localUri, name: filename, type });
        return await fetch('http://poopspring2019.website/uploads/upload.php', {
           method: 'POST',
           body: formData,
           header: {
           'content-type': 'multipart/form-data',},
        }).then((response) => response.json())
        .then((responseJson) => {

        console.log(responseJson);

          this.state.userInfo.imgDog =  responseJson.url.toString();
          this.forceUpdate();
        //AsyncStorage.setItem("imageurl" , responseJson.url.toString());
     });
   }// if not cancelled
}

   render() {

      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


            <View style={styles.welcomeContainer}>
             <Text style={styles.welcomeText}>Profile Settings</Text>
            </View>

            <Avatar
              rounded
              size="xlarge"
              source={{uri: this.state.userInfo.imgDog}}
            />

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => this._pickImage() }>
               <Text style = {styles.submitButtonText}> Upload Image </Text>
            </TouchableOpacity>





              <Text style = {styles.inputText}>First Name</Text>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                Value = {this.state.newInfo.firstName}
                placeholder = {this.state.newInfo.firstName}
                placeholderTextColor = "#3E3E3E"
                autoCapitalize = "none"
                onChangeText = {this.handleFName}/>

              <Text style = {styles.inputText}>Last Name</Text>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                Value = {this.state.newInfo.lastName}
                placeholder = {this.state.newInfo.lastName}
                placeholderTextColor = "#3E3E3E"
                autoCapitalize = "none"
                onChangeText = {this.handleLName}/>

             <Text style = {styles.inputText}>UserName</Text>
             <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.username}
               placeholder = {this.state.newInfo.username}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handleUserName}/>

             <Text style = {styles.inputText}>Email</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.email}
               placeholder = {this.state.newInfo.email}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>


             <Text style = {styles.inputText}>Password</Text>
            <TextInput style = {styles.input}
               secureTextEntry={true}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.password}
               placeholder = {"[Hidden]"}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

             <Text style = {styles.inputText}>Confirm Password</Text>
            <TextInput style = {styles.input}
               secureTextEntry={true}
               underlineColorAndroid = "transparent"
               placeholder = {"[Hidden]"}
               placeholderTextColor = "#3E3E3E"
               Value = {this.state.newInfo.password}
               autoCapitalize = "none"
               onChangeText = {this.handleConfirmPassword}/>




             <Text style = {styles.inputText}>Dog's Name</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.dName}
               placeholder = {this.state.newInfo.dName}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePetName}/>

              <Text style = {styles.inputText}>Dog's Age</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.age}
               placeholder = {this.state.newInfo.age}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePetAge}/>


               <Text style = {styles.inputText}>Dog's Breed</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.breed}
               placeholder = {this.state.newInfo.breed}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               onChangeText = {this.handlePetBreed}/>

               <Text style = {styles.inputText}>Dog's Bio</Text>
            <TextInput style = {styles.Extinput}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.bio}
               placeholder = {this.state.newInfo.bio}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               multiline = {true}
               numberOfLines = {4}
               onChangeText = {this.handleBio}/>

               <Text style = {styles.inputText}>Match Message</Text>
            <TextInput style = {styles.Extinput}
               underlineColorAndroid = "transparent"
               Value = {this.state.newInfo.matchMessage}
               placeholder = {this.state.newInfo.matchMessage}
               placeholderTextColor = "#3E3E3E"
               autoCapitalize = "none"
               multiline = {true}
               numberOfLines = {4}
               onChangeText = {this.handleMatchMessage}/>

               <Text style = {styles.inputText}>Dog's Gender</Text>
               <RadioForm
                 radio_props={radioGender}
                 initial={-1}
                 onPress={((value) => {this.state.newInfo.gender = value})}
               />

               <Text style = {styles.inputText}>Seeking Gender</Text>
               <RadioForm
                 radio_props={radioGenderSeeking}
                 initial={-1}
                 onPress={((value) => {this.state.newInfo.genderSeeking = value})}
               />

               <Text style = {styles.inputText}>Dog's Size</Text>
               <RadioForm
                 radio_props={radioSize}
                 initial={-1}
                 onPress={((value) => {this.state.newInfo.size = value})}
               />
               <Text style = {styles.inputText}>Seeking Size</Text>
               <RadioForm
                 radio_props={radioSizeSeeking}
                 initial={-1}
                 onPress={((value) => {this.state.newInfo.sizeSeeking = value})}
               />
               <Text style = {styles.inputText}>Seeking Radius, In Miles</Text>
               <RadioForm
                 radio_props={radioRadius}
                 initial={-1}
                 onPress={((value) => {this.state.newInfo.radiusSeeking = value})}
               />


               { this.state.showerror ?
                 <Text style={styles.ErrorText}>
                   Please fill out all fields.
                 </Text>
                : null}
                { this.state.passerror ?
                  <Text style={styles.ErrorText}>
                    Passwords must match.
                  </Text>
                 : null}


            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => this.login() }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <View style={styles.kcontainer}>
            </View>

        </ScrollView>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    //height: '100%',
     paddingTop: 30,
     paddingBottom: 30,
     //justifyContent: 'center',
     //alignItems: 'center',
     backgroundColor: '#efefee',
  },
  contentContainer: {
     //paddingTop: 30,
     justifyContent: 'center',
     alignItems: 'center',
     //backgroundColor: '#efefee',
  },
  kcontainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    paddingTop: 10,
    paddingBottom: 10,
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
  inputText: {
     marginTop: 15,
     marginBottom: 5,
  },
  input: {
     //margin: 5,
     height: 40,
     borderColor: 'transparent',
     backgroundColor: 'white',
     //borderStyle: "solid",
     borderWidth: 1,
     borderRadius: 10,
     textAlign: 'center',

     width: "75%",
  },
  Extinput: {
     //margin: 5,
     height: 120,
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
  welcomeText: {
    color: '#636363',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButtonText:{
     color: '#636363',
     textAlign: 'center'
  }
})
