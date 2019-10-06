import React, {Component} from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import Orientation from 'react-native-orientation'
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Image,
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
  ScrollView,BackHandler,
} from 'react-native';

import {
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import {Images, Fonts,Constants} from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class ThankEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
      if (Constants.device_Pad) {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    let that = this;
    setTimeout(function() {
      that.setTimePassed();
    }, 4000);
  }

  componentWillUnmount() {}
  componentDidUpdate(prevProps, prevState) {}
  setTimePassed = () => {
    this.props.navigation.navigate('startEventScreentwo');
  };
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={styles.container}
        resizeMode="cover"
        onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={styles.formviewcontainer}>
          <View style={styles.imgcontainer1}>
            <Text style={{fontSize: 20, marginTop: 5, marginBottom: 15}}>
              Thank You for Registering at
            </Text>
          </View>
          <View style={styles.imgcontainer1}>
            <Text style={{fontSize: 14, marginTop: 10}}>
              {this.props.dashboard.selectedproperty.property_address} ,
              {this.props.dashboard.selectedproperty.property_city},
              {this.props.dashboard.selectedproperty.property_state},
              {this.props.dashboard.selectedproperty.property_zipcode}
            </Text>
          </View>
          <View style={styles.imgcontainer2}>
            <View style={styles.profilelogview}>
              <Image
                source={{uri: this.props.login.account.agent_photo_url}}
                style={styles.lockimg1}
              />
            </View>
            <View style={styles.textdetail}>
              <Text style={styles.textitembold}>
                {this.props.login.account.agent_first_name}
                {this.props.login.account.agent_last_name}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_title}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_office_name}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_cellphone}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 10,
    marginRight: 10,
  },
  lockimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  lockimg1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // resizeMode:'contain'
  },
  formviewcontainer: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  formviewcontainer1: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  officelog: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  imgcontainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgcontainer2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '60%',
    marginTop: 10,
    zIndex: 100,
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: 60,
    zIndex: 100,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  txtitem: {
    width: '90%',
    fontSize: 7,
    textAlign: 'center',
  },
  profileview: {
    zIndex: 1,
    position: 'absolute',
    height: 60,
    width: '70%',
    bottom: 30,
    right: 0,
    backgroundColor: '#8c8c8c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilelogview: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: 10,
  },
  textdetail: {
    flexDirection: 'column',
    // alignItems:'center',
    marginLeft: 10,
  },
  textitem: {
    fontSize: 10,
  },
  textitembold: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,
    //
  },
  formitemcontainer: {
    marginTop: 10,
    height: 250,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  txtviewitem: {
    marginRight: 10,
    marginLeft: 10,
    padding: 0,
  },
  txtlabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setagentitem: Actions.setagentitem,
      postnewattendeeevent: Actions.postnewattendeeevent,
    },
    dispatch,
  );
}

function mapStateToProps({login, dashboard}) {
  return {
    login: login,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThankEventScreen);
