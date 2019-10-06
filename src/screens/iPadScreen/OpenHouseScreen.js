import React, {Component} from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Alert,
  FlatList,
  Linking,
  Switch,BackHandler,
} from 'react-native';
import {Button, Icon} from 'native-base';
import {Images, Fonts, Constants} from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import {SearchBar} from 'react-native-elements';
import {ProgressCircle, CircleSnail} from '@components';
import Modal from 'react-native-modalbox';
import AsyncStorage from '@react-native-community/async-storage';
const _keyExtractor = item => item.name;

class OpenHouseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_list: [
        {
          index: 0,
          name: 'Currently Own or React?',
          date: 'Ask attendee if they own or rent the proper where they live',
        },
        {
          index: 1,
          name: 'Currently Property Listed?',
          date: 'Ask attendee if their property is currently listed yes or no?',
        },
        {
          index: 2,
          name: 'Need to List or Sell Before Buying?',
          date:
            'Ask attendee if they need to list and sell their current property before purchasing this one',
        },
        {
          index: 3,
          name: 'Comparative Market Analysis?',
          date:
            'Ask attendee if they wouldry like to receive a Comparative Market Analysis ("CMA") of their current property.',
        },
        {
          index: 4,
          name: 'Prospect Match Marketing',
          date:
            'Ask attendee if they want to be added to your cross-marketing and prospecting match database.',
        },
        {
          index: 5,
          name: 'How soon Are You Looking to But/Rect?',
          date:
            'Ask attendee how soon are they looking to buy or rent a property?',
        },
        {
          index: 6,
          name: 'Lead Source?',
          date:
            'Ask attendee if they are currently pre-qualified for a mortgage and which mortgage bank.',
        },
        {
          index: 7,
          name: 'Mortgage Qualification?',
          date: 'Ask attendee how their credit score is.',
        },
        {
          index: 8,
          name: 'How good is your credit?',
          date: 'Ask attendee if they would need a real estate attorney.',
        },
        {
          index: 9,
          name: 'Do you need a Real Estate Attorney?',
          date: 'Ask attendee how they would like for you to contact them.',
        },
        {
          index: 10,
          name: 'Agency Disclosure?',
          date:
            'Ask attendee to digital sign the state required agency disclosure form.',
        },
      ],
      check_list: [
        {
          key: 'Currently Own or React?',
          switch: true,
          index: 0,
          name: 'Currently Own or Rent?',
          date: 'Ask attendee if they own or rent the proper where they live.',
        },
        {
          key: 'Currently Property Listed?',
          switch: true,
          index: 1,
          name: 'Currently Property Listed?',
          date: 'Ask attendee if their property is currently listed yes or no?',
        },
        {
          key: 'Baseball',
          switch: true,
          index: 2,
          name: 'Need to List or Sell Before Buying?',
          date:
            'Ask attendee if they need to list and sell their current property before purchasing this one',
        },
        {
          key: 'Soccer',
          switch: true,
          index: 3,
          name: 'Comparative Market Analysis?',
          date:
            'Ask attendee if they wouldry like to receive a Comparative Market Analysis ("CMA") of their current property.',
        },
        {
          key: 'Running',
          switch: true,
          index: 4,
          name: 'Prospect Match Marketing',
          date:
            'Ask attendee if they want to be added to your cross-marketing and prospecting match database.',
        },
        {
          key: 'Cross Training',
          switch: true,
          index: 5,
          name: 'How soon Are You Looking to But/Rent?',
          date:
            'Ask attendee how soon are they looking to buy or rent a property?',
        },

        {
          key: 'Gym Workout',
          switch: true,
          index: 6,
          name: 'Lead Source?',
          date: 'Ask attendee how did they learned about this property.',
        },
        {
          key: 'Swimming',
          switch: true,
          index: 7,
          name: 'Mortgage Qualification?',
          date:
            'Ask attendee if they are currently pre-qualified for a mortgage and which mortgage bank.',
        },
        {
          key: 'Swimming',
          switch: true,
          index: 8,
          name: 'How good is your credit?',
          date: 'Ask attendee how their credit score is.',
        },
        {
          key: 'Swimming',
          switch: true,
          index: 9,
          name: 'Do you need a Real Estate Attorney?',
          date: 'Ask attendee if they would need a real estate attorney.',
        },
        {
          key: 'Swimming',
          switch: true,
          index: 10,
          name: 'Follow up method?',
          date: 'Ask attendee how they would like for you to contact them.',
        },
        {
          key: 'Swimming',
          switch: true,
          index: 11,
          name: 'Agency Disclosure?',
          date:
            'Ask attendee to digital sign the state required agency disclosure form.',
        },
      ],
    };
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    const tempData = [...this.state.check_list];
    for (let i = 0; i < 12; i++) {
      if (Constants.checkArray[i] === 0) {
        tempData[i].switch = false;
      } else {
        tempData[i].switch = true;
      }
    }
    this.setState({check_list: tempData});
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.itemview}>
        <View style={styles.itmeimgcontainer}>
          <View style={styles.itemtxtview}>
            <View style={{width: '80%', marginBottom:10,}}>
              <Text style={styles.itemtxt}>{item.name}</Text>
              <Text style={styles.itemtxt2}>{item.date}</Text>
            </View>
            <View style={styles.switch_btn}>
              <Switch
                onValueChange={value => this.setSwitchValue(value, item.index)}
                value={item.switch}
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              />
            </View>
          </View>
        </View>
      </View>

      // </TouchableOpacity>
    );
  };
  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'checkarray',
        JSON.stringify(Constants.checkArray),
      );
    } catch (e) {
      // saving error
    }
  };
  setSwitchValue = (val, ind) => {
    const tempData = [...this.state.check_list];
    tempData[ind].switch = val;
    if (val === true) {
      Constants.checkArray[ind] = 1;
    } else {
      Constants.checkArray[ind] = 0;
    }
    this.storeData();
    this.setState({check_list: tempData});
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                /> */}
        <FlatList
          data={this.state.check_list}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },

  txtinput: {
    height: 50,
    borderColor: '#CDCECD',
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 18,
  },
  txtrow: {
    marginTop: 20,
  },
  txtbtn: {
    color: '#0520F1',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 10,
  },
  switch_btn: {
    position: 'absolute',
    right: 4,
    top: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnview: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemcontainer: {
    width: '100%',
  },
  itemview: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    backgroundColor: '#ffffff',

  
    marginLeft:10,
    marginRight:10,
  },
  itemtxtview: {
    width: '100%',
    marginTop: 10,
    marginLeft: 4,
    flexDirection: 'row',
    // alignItems:'center',
  },
  itemtxt: {
    fontSize: 14,
    // textAlign:'center',
    fontWeight: 'bold',
  },
  itemtxt2: {
    fontSize: 14,
    marginTop: 5,
    marginBottom:5,
  },
  itmeimgcontainer: {
    // marginBottom: 10,
    // alignItems:'center',
   
    width: '90%',
    flexDirection: 'row',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout : Actions.logout,
      // setpropertyitem : Actions.setpropertyitem,
      // sethousehandletype : Actions.sethousehandletype,
    },
    dispatch,
  );
}

function mapStateToProps({login, dashboard}) {
  return {
    // login: login,
    // dashboard:dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenHouseScreen);
