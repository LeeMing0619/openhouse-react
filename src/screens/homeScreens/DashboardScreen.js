import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
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
  TextInput,
  Alert,
  FlatList,BackHandler,
} from 'react-native';
import { SearchBar, Avatar } from 'react-native-elements';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
import Orientation from 'react-native-orientation'
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { ProgressCircle, CircleSnail } from '@components';
var Mailer = require('NativeModules').RNMail;
import email from 'react-native-email';
import FastImage from 'react-native-fast-image';

const _keyExtractor = item => item.name;
const _keyExtractor1 = item => item.img;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const item_height = (screenHeight - 100) / 4;

class DashboardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Back',
      headerTitle: (
        <View style={{ width:'100%', justifyContent: 'center',alignItems:'center'}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{
                            fontSize: 18, fontWeight: 'bold',
                        }}>Open House</Text>
                        { <Text style={{
                            fontSize: 8,
                        }}>TM</Text> }
          </View>
        </View>
      ),
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.getParam('changegrid')}>
          <FastImage
            source={Images.switch_layout}
            imageStyle={{ width: 25, height: 25 }}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          style={{
            marginLeft: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.getParam('logout')}>
          <Image
            source={Images.logout}
            imageStyle={{ width: 25, height: 25 }}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      loadingtxt: '',
      isDialogVisible: false,
      newtitle: '',
      gridtype: false,
    };
    this._willFocusSubscription = this.props.navigation.addListener("willFocus", payload => {
      Orientation.lockToPortrait();
    })
  }

  componentWillUnmount() {
    this._willFocusSubscription.remove();
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    // if (this.props.dashboard.status === 210) {
    //   this.props.navigation.navigate('leadScreen');
    // }
    // if (this.props.dashboard.status === 220) {
    //   this.props.navigation.navigate('openhouseScreen');
    // }
    // if (this.props.dashboard.status === 230) {
    //   Constants.loadLMSflag = 1;
    //   this.props.navigation.navigate('myBoardScreen');
    // }
    // if (this.props.dashboard.status === 240) {
    //   if (Constants.eventflag === 1) {
    //     this.props.navigation.navigate('event');
    //     Constants.eventflag = 0;
    //   }
    // }
    // if (this.props.dashboard.status === 280) {
    //   this.props.navigation.navigate('profileScreen');
    // }
    // if (this.props.dashboard.status === 260) {
    //   this.props.navigation.navigate('mortgageScreen');
    // }
    // if (this.props.dashboard.status === 200) {
    //     this.props.navigation.navigate('propertyScreen');
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 210 &&
      prevProps.dashboard.status === 100) {
      this.props.navigation.navigate('leadScreen');
    }
    if (this.props.dashboard.status === 220) {
      this.props.navigation.navigate('openhouseScreen');
    }
    if (this.props.dashboard.status === 230 &&
      prevProps.dashboard.status === 40) {
      Constants.loadLMSflag = 1;
      this.setState({ spinner: false });
      this.props.navigation.navigate('myBoardScreen');
    }
    if (this.props.dashboard.status === 240 &&
      prevProps.dashboard.status === 100) {
      if (Constants.eventflag === 1) {
        this.props.navigation.navigate('event');
        Constants.eventflag = 0;
      }
    }
    if (this.props.dashboard.status === 280) {
      this.props.navigation.navigate('profileScreen');
    }
    if (this.props.dashboard.status === 260 &&
      prevProps.dashboard.status === 100) {
      this.props.navigation.navigate('mortgageScreen');
    }

    if (
      this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
      this.props.dashboard.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (
      this.props.dashboard.status >= 200 &&
      prevProps.dashboard.status === 100 &&
      this.state.spinner
    ) {
      this.setState({ spinner: false });
      if (this.props.dashboard.status === 200) {
        this.props.navigation.navigate('propertyScreen');
      }
    }
    if (this.props.dashboard.status === 100 && !this.state.spinner ) {
      this.setState({ spinner: true });
    }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.props.navigation.setParams({ changegrid: this._changegrid });
    this.props.navigation.setParams({ logout: this._logout });
  }
  _changegrid = () => {
    this.props.navigation.navigate('homescreen');
  };
  _logout = () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      { text: 'NO' },
      { text: 'YES', onPress: this.logouthandle },
    ]);
  };
  logouthandle = () => {
    this.props.logout();
    this.props.navigation.navigate('signinScreen');
  };
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemcontainer}
        onPress={() => this.godetail(item.img)}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              <Avatar
                rounded
                size={Dimensions.get('window').width * 0.2 - 10}
                source={Images[item.img]}
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt}>{item.name}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };
  godetail = txt => {
    if (txt === 'property') {
      this.props.getproperties();
      // this.props.navigation.navigate('signFormScreen');
    }
    if (txt === 'event') {
      Constants.eventflag = 1;
      this.props.event();
    }
    if (txt === 'lead') {
      this.props.getlead();
    }
    if (txt === 'question') {
      this.props.getopenhouse();
    }
    if (txt === 'mls') {
      this.setState({ spinner: true});
      this.props.myboard();
    }
    if (txt === 'profile') {
      this.props.getprofile();
    }
    if (txt === 'mortgage') {
      this.setState({ spinner: true });
      this.props.getmortgage();
    }
    if (txt === 'support') {
      this.handleEmail();
    }
  };

  handleEmail = () => {
    const to = ['support@openhousemarketingsystem.com'];
    email(to, {
      // Optional additional arguments
      cc: [Constants.user_mail], // string or array of email addresses
      subject: 'Open House Support',
      body: '',
    }).catch(console.error);
  };
  _onLayout=event=>{
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }} onLayout={this._onLayout}>
        <View style={{ flex: 1, backgroundColor: '#f6f6f6', marginLeft: 4, marginRight: 4, }}>
          <Spinner
            visible={this.state.spinner}
            textContent={this.state.loadingtxt}
            textStyle={styles.spinnerTextStyle}
          />
          <FlatList
            data={
              this.props.login && this.props.login.homedata
                ? this.props.login.homedata
                : []
            }
            numColumns={2}
            keyExtractor={_keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#DFE0DF',
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
    activeOpacity:0.8,
    width: '50%',
    height: item_height,
    justifyContent: 'center',
    
  },
  itemview: {
    flex: 1,
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius:10,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    marginTop: 5,
  },
  itemimgview: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.2 * 0.5,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '100%',
    alignItems: 'center',
    // marginBottom: 10,
    justifyContent: 'center',
    marginTop: 7,
  },
  itemtxt: {
    textAlign: 'center',
    fontSize: 14,
  },
  itmeimgcontainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '90%',
    //  backgroundColor:'yellow'
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      getproperties: Actions.getproperties,
      getlead: Actions.getlead,
      getevent: Actions.getevent,
      event: Actions.getevent,
      getopenhouse: Actions.getOpenHouse,
      myboard: Actions.getMyboard,
      getprofile: Actions.getprofile,
      getmortgage: Actions.getmortgage,
    },
    dispatch,
  );
}

function mapStateToProps({ login, dashboard }) {
  return {
    login: login,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardScreen);
