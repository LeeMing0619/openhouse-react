import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import Orientation from 'react-native-orientation'
import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
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
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class BankScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeebankname: '',
      spinner: false,
      loadingtxt: '',
    };
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
    // alert(Constants.bestsellingfeatures[0]);
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 259) {
      if (Constants.postbrokerFlag === 1) {
        Constants.postbrokerFlag = 0;
        this.setState({ spinner: false });
        // this.props.navigation.navigate('CreateAccountfourScreen');
        this.props.navigation.navigate('thankPropertyScreen');
      }
    }
  }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };

  continue = () => {
    if (
      !this.state.attendeebankname ||
      this.state.attendeebankname.length < 5
    ) {
      Alert.alert('', 'Bank Name is Required');
    } else {
      Constants.attendeeprequalifiedbankname = this.state.attendeebankname;
      var flag = 0;
      var position = 0;
      for (let i = 8; i < Constants.checkArray.length; i++) {
        if (Constants.checkArray[i] === 1) {
          flag = 1;
          position = i;
          break;
        }
      }
      if (flag === 0) {
        // this.props.navigation.navigate('signFormScreen');
      } else {
        if (this.props.dashboard.selectedproperty.property_state === 'NY') {
          this.props.navigation.navigate(Constants.questionScreens[position]);
        } else {
          if (position === 11) {
            // / this.props.navigation.navigate('signFormScreen');
          } else {
            this.props.navigation.navigate(Constants.questionScreens[position]);
          }
        }
      }
    }
  };
  _onLayout=event=>{
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  
  render() {
    if (Constants.device_Pad) {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 40, marginTop: 10, fontWeight: 'bold' }}>
                Name Of Your Pre-Approved Mortgage Lender?
            </Text>
            </View>
            <View style={styles.formitemcontainer}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={[styles.txtlabel, { fontSize: 20 }]}>Enter Lender or Bank Name</Label>
                <Input
                  value={this.state.attendeefirstname}
                  style={[styles.txtitem2, { fontSize: 20, height: 70 }]}
                  onChangeText={text => this.setState({ attendeebankname: text })}
                />
              </Item>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.continue()}>
                <Text style={styles.btntxt}>Continue</Text>
              </Button>
            </View>
          </View>

          <View style={{
            position: 'absolute',
            height: 120,
            width: '40%',
            bottom: 60,
            right: 0,
            backgroundColor: '#8c8c8c',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={styles.profilelogview}>
              <Image
                source={{ uri: this.props.login.account.agent_photo_url }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  // resizeMode:'contain'
                }}
              />
            </View>
            <View style={[styles.textdetail, { marginLeft: 50 }]}>
              <Text style={{ fontSize: 20, color: 'white' }}>
                {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name}
              </Text>
              <Text style={{ fontSize: 20, color: 'white' }}>
                {this.props.login.account.agent_title}
              </Text>
              <Text style={{ fontSize: 20, color: 'white' }}>
                {this.props.login.account.agent_office_name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>
                Name Of Your
            </Text>
            </View>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>
                Pre-Approved Mortgage Lender?
            </Text>
            </View>
            <View style={styles.formitemcontainer}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={[styles.txtlabel]}>Enter Lender or Bank Name</Label>
                <Input
                  value={this.state.attendeefirstname}
                  style={[styles.txtitem2]}
                  onChangeText={text => this.setState({ attendeebankname: text })}
                />
              </Item>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.continue()}>
                <Text style={styles.btntxt}>Continue</Text>
              </Button>
            </View>
          </View>

          <View style={styles.profileview}>
            <View style={styles.profilelogview}>
              <Image
                source={{ uri: this.props.login.account.agent_photo_url }}
                style={styles.lockimg1}
              />
            </View>
            <View style={styles.textdetail}>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_title}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_office_name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
    }
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
    top: 20,
    left: 20,
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 35,
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
    height: 350,
    position: 'absolute',
    top: 160,
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
    backgroundColor: 'white',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '60%',
    marginRight: '5%',
    marginTop: 20,
    zIndex: 100,
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '100%',
    height: 50,
    marginRight: 10,
    zIndex: 100,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 19,
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
    color: 'white',
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,
    //
  },
  formitemcontainer: {
    marginTop: 10,
    height: 70,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setagentitem: Actions.setagentitem,
      postBroker: Actions.postBroker,
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
)(BankScreen);
