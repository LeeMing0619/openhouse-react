import React, {Component} from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../../store/actions';
import {bindActionCreators} from 'redux';
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
import Orientation from 'react-native-orientation'
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
import {Images, Fonts, Constants} from '@commons';
// import Image from 'react-native-image-progress';
// import WebsitesScreen from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class WebsitesScreen extends Component {
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
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);}

  componentWillUnmount() {}
  componentDidUpdate(prevProps, prevState) {}
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  zillowbtn = () => {
    Constants.attendeehowhearaboutlistinganswer = 'ZILLOW';
    var flag = 0;
    var position = 0;
    for (let i = 7; i < Constants.checkArray.length; i++) {
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
  };
  truliabtn = () => {
    Constants.attendeehowhearaboutlistinganswer = 'TRULIA';
    var flag = 0;
    var position = 0;
    for (let i = 7; i < Constants.checkArray.length; i++) {
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
  };
  realtorsbtn = () => {
    Constants.attendeehowhearaboutlistinganswer = 'REALTORS.COM';
    var flag = 0;
    var position = 0;
    for (let i = 7; i < Constants.checkArray.length; i++) {
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
  };
  otherbtn = () => {
    Constants.attendeehowhearaboutlistinganswer = 'OTHER';
    var flag = 0;
    var position = 0;
    for (let i = 7; i < Constants.checkArray.length; i++) {
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.lockbtnview}
            onPress={this.gobackdashboard}>
            <Text style={styles.backtxt}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formviewcontainer}>
          <View style={styles.imgcontainer1}>
            <Text style={{fontSize: 16, marginBottom: 10,marginTop: 10,fontWeight: 'bold'}}>Which Website or App?</Text>
          </View>
          <View style={styles.imgcontainer}>
            <Button block style={styles.btn} onPress={() => this.zillowbtn()}>
              <Text style={styles.btntxt}>ZILLOW</Text>
            </Button>
          </View>
          <View style={styles.imgcontainer}>
            <Button block style={styles.btn} onPress={() => this.truliabtn()}>
              <Text style={styles.btntxt}>TRULIA</Text>
            </Button>
          </View>
          <View style={styles.imgcontainer}>
            <Button block style={styles.btn} onPress={() => this.realtorsbtn()}>
              <Text style={styles.btntxt}>REALTORS.COM</Text>
            </Button>
          </View>
          <View style={styles.imgcontainer}>
            <Button block style={styles.btn} onPress={() => this.otherbtn()}>
              <Text style={styles.btntxt}>OTHER</Text>
            </Button>
          </View>
        </View>

        <View style={styles.profileview}>
          <View style={styles.profilelogview}>
            <Image
              source={{uri: this.props.login.account.agent_photo_url}}
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
    height: 250,
    position: 'absolute',
    top: 160,
    // alignSelf:'center',
    // justifyContent:'center',
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
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: Dimensions.get('window').height*0.08,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 21,
  },
  txtitem: {
    width: '90%',
    fontSize: 7,
    textAlign: 'center',
  },
  profileview: {
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
    marginTop: 15,
    fontSize: 18,
    //
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
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
)(WebsitesScreen);
