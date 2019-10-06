import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
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
  ScrollView, BackHandler,
  PermissionsAndroid,
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
import RNFetchBlob from 'rn-fetch-blob';
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import SignatureCapture from 'react-native-signature-capture';
class SignFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueid: '',
      spinner: false,
      dragflag: false,
      filepath: '',
    };
    
    this._onDragEvent = this._onDragEvent.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this.postData = this.postData.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 264 && prevProps.dashboard.status === 30) {
      // this.setState({ spinner: false });
      // this.props.navigation.navigate('thankPropertyScreen');
      if (this.state.dragflag === false) {
        this.props.navigation.navigate('thankPropertyScreen');
      } else {
        let data = this.props.dashboard.resultData;
        this.requestCameraPermission(data);
      }
    }
  }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  goskip = () => {
    this.postData();
  };
  clearbtn = () => { };
  okbtn = () => { };
  saveSign() {
    this.refs['sign'].saveImage();
  }

  resetSign() {
    this.refs['sign'].resetImage();
  }
  async  requestCameraPermission(result) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.INTERNET,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.fs
          .writeFile(result.pathName, result.encoded, "encoding type")
          .then(success => {
            
          })
          .catch(err => {
            alert(err)
          });
          this.uploadPhoto() ;
      } else {
        alert(granted);
      }
    } catch (err) {
      alert(err);
    }
  }

  uploadPhoto(result) {
    let filename = '2' + '.jpg';
    let data = new FormData();
    data.append('filetoupload', {
      uri:result.pathName,
      name: filename,
      type: 'image/jpeg',
    });
    let Url = `${Constants.accounturl}/imageupload.php`;
    data.append('objectid', 2);
    data.append('phototype', 's');
alert(Url);
    fetch(Url, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    })
      .then(res => {
        this.props.navigation.navigate('thankPropertyScreen');
      })
      .done();
  }

  _onSaveEvent(result) {
    this.uploadPhoto(result) ;
    // this.setState({ filepath: result.pathName });
    // this.postData();
  }
  postData() {
    let data = {
      propertyrecordnum: this.props.dashboard.selectedproperty
        .property_record_num,
      accountnum: this.props.login.account.account_num,
      advertisingid: this.props.login.account.advertising_id,
      uniqueid: this.state.uniqueid,
    };
    Constants.postflag = 1;
    this.setState({ spinner: true });
    this.props.postData(data);
  }

  _onDragEvent() {
    this.setState({ dragflag: true });
  }
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    if (Constants.device_Pad) {
      return (
        <View style={styles.container} onLayout={this._onLayout}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={this.gobackdashboard}
              style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'left', marginLeft: '5%' }]}>
                Back
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goskip} style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'right', marginRight: '5%' }]}>
                Skip
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 30, alignSelf: 'center' }}>
            <Text style={[styles.backtxt, { fontSize: 40 }]}>Signature Required</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flex: 6,
              marginTop: 10,
              width: '90%',
              borderColor: '#808080',
              borderWidth: 1,
              borderStyle: 'solid',
            }}>
            <SignatureCapture
              style={{
                flex: 1,
                borderColor: '#808080',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: '5%',
              justifyContent: 'space-between',
            }}>
            <Button
              style={[styles.buttonStyle, { marginRight: 10, height: 120 }]}
              onPress={() => {
                this.resetSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 30, textAlign: 'center' }}>
                CLEAR
            </Text>
            </Button>
            <Button
              style={[styles.buttonStyle, { marginLeft: 10, height: 120 }]}
              onPress={() => {
                this.saveSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 30, textAlign: 'center' }}>
                OK
            </Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={this.gobackdashboard}
              style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'left', marginLeft: '5%' }]}>
                Back
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goskip} style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'right', marginRight: '5%' }]}>
                Skip
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 30, alignSelf: 'center' }}>
            <Text style={styles.backtxt}>Signature Required</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flex: 6,
              marginTop: 10,
              width: '90%',
              borderColor: '#808080',
              borderWidth: 1,
              borderStyle: 'solid',
            }}>
            <SignatureCapture
              style={{
                flex: 1,
                borderColor: '#808080',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: '5%',
              justifyContent: 'space-between',
            }}>
            <Button
              style={[styles.buttonStyle, { marginRight: 10 }]}
              onPress={() => {
                this.resetSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center' }}>
                CLEAR
            </Text>
            </Button>
            <Button
              style={[styles.buttonStyle, { marginLeft: 10 }]}
              onPress={() => {
                this.saveSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center' }}>
                OK
            </Text>
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
  },
  bottombtn: {
    width: '36%',
    backgroundColor: '#',
    color: '#ffffff',
    fontSize: 19,
    borderRadius: 5,
    height: 40,
  },
  skipbtnview: {
    width: 70,

    height: 50,
    marginTop: 25,
    marginRight: 10,
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,

    //
  },
  buttonStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#39A2C1',
    width: '35%',
    justifyContent: 'center',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postData: Actions.postData,

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
)(SignFormScreen);