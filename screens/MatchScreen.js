import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Alert, Image, TouchableOpacity ,Button} from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'
import {AsyncStorage} from 'react-native';
import Modal from 'react-native-modalbox';



class Matches extends Component {

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: (
        <View
          style={{
            height: 55,
            marginTop: 20,
            backgroundColor: '#eecfad',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#636363',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            Matches
          </Text>
        </View>
      ),
  };

  constructor()
  {
    super();

    this.state = {
    match_Array: '',
    userInfo: '',
    }

  }



  componentWillMount(){

    AsyncStorage.getItem("userInfo", (err,ret) =>{
      console.log('[matches screen Response obj]', ret);
      //console.log('[Response error]', err);
      this.setState({userInfo: JSON.parse(ret)});
      this._getMatches();
    });
    // may not like being outside the async
    //this.setState({Card_Array: this.state.Card_Array.reverse(),});
  }

  _getMatches = () => {
    let arr = [];
    fetch('https://poopspring2019.website/API/GetMatches.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "userID":this.state.userInfo.userID
          }),//body
      }).then((response) => response.json())
      .then((responseJson) => {
         console.log('[Card response]', responseJson);  //
         //console.log('[Sent obj]', jsonpackage);       // for tests
         //alert(responseJson.userID);                   //

         if (responseJson.error == "") {// will check for good user data after testing
           var i = 0;

          //make var to return to flatlist//

           for (let resObj of responseJson.matches)
           {
             console.log(i.toString(), resObj);
             //alert(resObj.url);

             arr.push({key: i.toString(),
                    dogName: resObj.dogName,
                   humanName: resObj.humanName,
                      img: resObj.imgDog,
                      msg: resObj.matchMessage
                });



             //this.setState({match_Array: match_Array});
            // console.log(i.toString(), this.state.match_Array);
             i+=1;
           } // for resObj
           console.log('arr:', arr);
           this.setState({match_Array: arr});
           //return arr;
        }// if no error
     });//fetch

  }//getmatches




  render() {
    return (

      <View>

      <TouchableOpacity onPress={() => this.forceUpdate()}
         style={styles.signupLink}>
        <Text style={styles.signupLinkText}>Update</Text>
      </TouchableOpacity>

      { (this.state.match_Array.length > 0) ?
        <FlatList
          data={this.state.match_Array}
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => (
            <ListItem
                key={item.key}
                leftAvatar={
                  <Avatar
                    rounded
                    size="large"
                    source={{uri: item.img}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />}
                title={item.dogName}
                subtitle={`Owner: ${item.humanName}`}
                onPress={() => {Alert.alert(item.dogName, item.msg)}}
              />

           )}
        />
        : <Text style={styles.noMatchText}> No Matches For Now! </Text>}

      </View>

    );
  }
}
export default Matches

const styles = StyleSheet.create({

MainContainer :{

// Setting up View inside content in Vertically center.
justifyContent: 'center',
flex:1,
margin: 10

},
updateText:{
  color: 'red',
  textAlign: 'center',
},
item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  signupLink: {
    backgroundColor: '#f6f6f3',
    padding: 10,
    justifyContent: 'center',
  },
  signupLinkText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2e78b7',
  },
  noMatchText:{
    padding: 75,
    color: '#636363',
    fontSize: 20,
    textAlign: 'center',
  },

});
