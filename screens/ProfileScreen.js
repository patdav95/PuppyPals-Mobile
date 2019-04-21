import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {NavigationEvents} from "react-navigation";
import { MonoText } from '../components/StyledText';
import {AsyncStorage} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { List, ListItem, Avatar } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {

      super(props)
      this.state = {
         userInfo: '',
         value: 0,
      }
    }

getSize = (size) => {
  if (size == 0) {
    return "Small";
  }
  else if (size == 1) {
    return "Medium";
  }
  else if(size == 2){
    return "Large";
  }
  else {
    return "Any";
  }

}

  componentWillMount(){
    AsyncStorage.getItem("userInfo", (err,ret) =>{
      this.setState({userInfo: JSON.parse(ret)});
      //this.state.userInfo.age = '9';
      //alert(this.state.userInfo.age);
    });
     //alert(this.state.userInfo.age);


  }

//<Image source={{ uri: this.state.userInfo.imgDog }} style={styles.img} />

  render() {

        const { navigation } = this.props;
        const userID = '';
        const firstName = navigation.getParam('firstName', 'NA');

    return (

      <View style={{height: '100%'}}>


        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Image
            source={require('../assets/images/PuppyPals-Logo.png')}
            style={styles.welcomeImage}
            />

<View>
        <Avatar
          rounded
          size="xlarge"
          source={{uri: this.state.userInfo.imgDog}}
        />
</View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Your Name</Text>
          <Text style={styles.profileText}>
          {this.state.userInfo.firstName} {this.state.userInfo.lastName}
          </Text>
        </View>

        <View style={styles.textView}>
          <Text style = {styles.inputText}>Email</Text>
          <Text style={styles.profileText}>{this.state.userInfo.email}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Name</Text>
          <Text style={styles.profileText}>{this.state.userInfo.dName}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Age</Text>
          <Text style={styles.profileText}>{this.state.userInfo.age}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Breed</Text>
          <Text style={styles.profileText}>{this.state.userInfo.breed}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Gender</Text>
          <Text style={styles.profileText}>{this.state.userInfo.gender}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Seeking Gender(s)</Text>
          <Text style={styles.profileText}>{this.state.userInfo.genderSeeking}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Seeking Radius</Text>
          <Text style={styles.profileText}>{this.state.userInfo.radiusSeeking} miles</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Size</Text>
          <Text style={styles.profileText}>{this.getSize(this.state.userInfo.size)}</Text>
        </View>
        <View style={styles.textView}>
          <Text style = {styles.inputText}>Seeking Size(s)</Text>
          <Text style={styles.profileText}>{this.getSize(this.state.userInfo.sizeSeeking)}</Text>
        </View>

    <View style = {styles.blockView}>
      <View style={styles.textView}>
          <Text style = {styles.inputText}>Match Message</Text>
          <Text style={styles.profileText}>{this.state.userInfo.matchMessage}</Text>
      </View>
      <View style={styles.textView}>
          <Text style = {styles.inputText}>Dog's Bio</Text>
          <Text style={styles.profileText}>{this.state.userInfo.bio}</Text>
      </View>
    </View>




        </ScrollView>

        <View style={styles.buttonContainerContainer}>
         <View style={styles.buttonContainer}>
             <TouchableOpacity onPress={this._handleLogout}
               style={styles.logoutButton}>
               <Text style={styles.ButtonText}>Log out</Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={this._handleGotoEdit}
               style={styles.logoutButton}>
               <Text style={styles.ButtonText}>Edit</Text>
             </TouchableOpacity>
         </View>
       </View>

       </View>

    );
  }

  _handleGotoEdit = () => {
    const {navigate} = this.props.navigation;
    navigate('EditProfile',)
};//_handleEditProfile

_handleLogout = () => {
  const {navigate} = this.props.navigation;
  navigate('Login',)
};//_handlelogout



}//class end

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //height: '100%',
    backgroundColor: '#efefee',
    //paddingBottom: 200,
    //flex: 1,
    //paddingBottom: 30,
    //alignItems: 'center',
    //backgroundColor: 'red',
  },
  contentContainer: {
    paddingTop: 25,
    paddingBottom: 300,
    width: '100%',
    //height: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  separator: {
    width: '15%',
  },
  buttonContainerContainer: {
    height: '8%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e3e2',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: 'green',
  },
  buttons:{
    flex:1,
  },
  welcomeImage: {
    width: '65%',
    height: '10%',
    resizeMode: 'contain',
    //paddingTop: 15,
    //marginLeft: -10,
  },

  radio: {
    alignItems: 'center',
    //marginHorizontal: 50,
  },
  logoutButton: {
    backgroundColor: '#d7ad7e',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 10,
    width: "40%",
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 2.0,
    shadowRadius: 10,
    elevation: 4,
  },
  ButtonText:{
     color: '#636363',
     textAlign: 'center'
  },
  blockView:{
    width: '70%',
  },
  textView:{
    padding: 10,
  },
  inputText:{
    color: '#c1a17e',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    //lineHeight: 15,
    //paddingTop: 15,
  },
  profileText:{
    color: '#636363',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    //paddingBottom: 15,
  },
  img: {
    width: 100,
      height: 100,
    borderRadius: 40,
    borderColor: '#d7ad7e',
    borderWidth: 2,
      margin: 10,
      backgroundColor: '#d7ad7e',
  },

});
