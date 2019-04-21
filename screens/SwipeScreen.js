//This is an example of Tinder like Swipeable Card//
import React, { Component } from 'react';
//import react in our code.
import {AsyncStorage} from 'react-native';
import { Platform, StyleSheet, Image, View,Alert, Text,ScrollView,
        Dimensions, Animated, PanResponder,} from 'react-native';
//import all the components we are going to use.
const SCREEN_WIDTH = Dimensions.get('window').width;
class SwipeableCard extends React.Component {

  constructor() {
    super();
    this.panResponder;

    this.state = {
      Xposition: new Animated.Value(0),
      RightText: false,
      LeftText: false,
    };
    this.Card_Opacity = new Animated.Value(1);
  }
  componentWillMount() {



    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.state.Xposition.setValue(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 300) {
          this.setState({
            RightText: true,
            LeftText: false,
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 300) {
          this.setState({
            LeftText: true,
            RightText: false,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < SCREEN_WIDTH - 150 &&
          gestureState.dx > -SCREEN_WIDTH + 150
        ) {
          this.setState({
            LeftText: false,
            RightText: false,
          });
          Animated.spring(
            this.state.Xposition,
            {
              toValue: 0,
              speed: 5,
              bounciness: 10,
            },
            { useNativeDriver: true }
          ).start();
        } else if (gestureState.dx > SCREEN_WIDTH - 250) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {
            this.setState({ LeftText: false, RightText: false }, () => {
              // right swipe

              this.swipe(this.props.item.userID, this.props.item.otherID);

              this.props.removeCard();
            });
          });
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: -SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {
            this.setState({ LeftText: false, RightText: false }, () => {
              //left swipe
              this.props.removeCard();
            });
          });
        }
      },
    });
  }
  //<Text style={styles.Card_Title}> {this.props.item.card_Title} </Text>

swipe = () => {

  fetch('https://poopspring2019.website/API/Swipe.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "userID":this.props.item.userID,"otherUserID":this.props.item.otherID,
        }),//body
    }).then((response) => response.json())
    .then((responseJson) => {
       //console.log('[Response obj]', responseJson);  //
       //console.log('[Sent obj]', jsonpackage);       // for tests
       //alert(responseJson.userID);                   //

       if (responseJson.matchstatus == 1) {// will check for good userid after testing
          Alert.alert("","It's a match!!");
       }
       else {
         //alert("test: Nope");
       }

   });//fetch
}//swipe



  render() {
    const rotateCard = this.state.Xposition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-20deg', '0deg', '20deg'],
    });
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.card_Style,
          {
            backgroundColor: this.props.item.backgroundColor,
            opacity: this.Card_Opacity,
            transform: [
              { translateX: this.state.Xposition },
              { rotate: rotateCard },
            ],
          },
        ]}>

        <ScrollView style= {styles.cardScrollView} contentContainerStyle={styles.cardConScrollView}>

          <View style={styles.CardImageView}>

          <Image source={{uri: this.props.item.img}}
            style={{width: 400, height: 500,}} />

          </View>
          <View style={styles.Card_Text_View}>
            <Text style={styles.Card_Text_name}>
              {this.props.item.dName}
            </Text>
            <Text style={styles.Card_Text_age}>
              ( {this.props.item.age} / {this.props.item.gender} / {this.props.item.breed} )
            </Text>
            <Text style={styles.Card_Text_bio}>
              {this.props.item.bio}
            </Text>


          </View>


        </ScrollView>




        {this.state.LeftText ? (
          <Text style={styles.Left_Text_Style}> Nope </Text>
        ) : null}
        {this.state.RightText ? (
          <Text style={styles.Right_Text_Style}> Yes </Text>
        ) : null}
      </Animated.View>
    );
  }
}// ^ card stuff

export default class App extends React.Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
};
  constructor() {
    super();
    this.state = {
      userInfo: '',
      Card_Array: [],
      No_More_Card: false,
    };
  }

componentWillMount(){

  AsyncStorage.getItem("userInfo", (err,ret) =>{
    //console.log('[Response obj]', ret);
    //console.log('[Response error]', err);
    this.setState({userInfo: JSON.parse(ret)});
    this._getCards(this.state.userInfo.userID);
  });
  // may not like being outside the async
  this.setState({Card_Array: this.state.Card_Array.reverse(),});
}

_getCards = (userID) => {

  fetch('https://poopspring2019.website/API/ShowMe5.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "userID":userID,
        }),//body
    }).then((response) => response.json())
    .then((responseJson) => {
       //console.log('[Card response]', responseJson);  //
       //console.log('[Sent obj]', jsonpackage);       // for tests
       //alert(responseJson.userID);                   //

       if (responseJson.error == "") {// will check for good userid after testing
         var i = 0;

         for (let resObj of responseJson.results)
         {
           //console.log(i.toString(), resObj);
           //alert(resObj.url);

           let card_Array = this.state.Card_Array;


           card_Array.push({id: i,
                              age: resObj.age,
                              bio: resObj.bio,
                            breed: resObj.breed,
                            dName: resObj.dName,
                           gender: resObj.gender,
                          otherID: resObj.otherID,
                             size: resObj.size,
                              img: resObj.url,
                           userID: userID,
                        });
           this.setState({Card_Array: card_Array});
           console.log(i.toString(), this.state.Card_Array);
           i+=1;
         }


       }
   });//fetch

}

  componentDidMount() {

    if (this.state.Card_Array.length == 0) {
      //this.setState({ No_More_Card: true });
    }

  }

  removeCard = id => {

    this.state.Card_Array.splice(
      this.state.Card_Array.findIndex(x => x.id == id),
      1
    );

    this.setState({ Card_Array: this.state.Card_Array }, () => {
      if (this.state.Card_Array.length == 0) {
        this.setState({ No_More_Card: true });
      }
    });

  };


  render() {
    return (

      <View style={styles.MainContainer}>

        {this.state.Card_Array.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={this.removeCard.bind(this, item.id)}
          />
        ))}

        {this.state.No_More_Card ? (
          <Text style={{ fontSize: 22, color: '#000' }}>No Dogs Found.</Text>
        ) : null}

      </View>
    );
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    //flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eecfad',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  card_Style: {
    //flex: 1,
    width: '95%',
    height: '95%',
    alignItems: 'center',
    position: 'absolute',

    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    //backgroundColor: 'blue',
  },
  cardConScrollView: {
    alignItems: 'center',
    //width: '100%',
    //height: '100%',
    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: 'transparent',
  },
  cardScrollView: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: '#efefee',
  },
  cardImage: {
    alignItems: 'center',
    resizeMode: 'contain',
    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  cardImageView: {

    resizeMode: 'contain',
    alignItems: 'center',
    borderRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  Left_Text_Style: {
    top: 10,
    right: 10,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  Right_Text_Style: {
    top: 10,
    left: 10,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  Card_Text_name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#636363',
  },
  Card_Text_age: {
    textAlign: 'center',
    fontSize: 15,
  },
  Card_Text_breed: {
    textAlign: 'center',
    fontSize: 15,

  },
  Card_Text_bio: {
    textAlign: 'center',
    fontSize: 20,

  },
  Card_Text_View: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
