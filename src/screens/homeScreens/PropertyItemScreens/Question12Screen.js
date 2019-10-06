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
  TouchableOpacity,
  ImageBackground,BackHandler,
} from 'react-native';

import { Button } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation'
import PDFView from 'react-native-view-pdf';
class Question12Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectectProperty: this.props.dashboard.selectedproperty,
      pdfurl: '',
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
    const letproperty = this.props.login.downloaddisclosure;
    if (this.state.selectectProperty.property_type === 'R') {
      this.setState({ pdfurl: letproperty[1].pdf_url });
    } else {
      this.setState({ pdfurl: letproperty[0].pdf_url });
    }
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) { }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  nobtn = () => {
    this.props.navigation.navigate('signFormScreen');
  };
  yesbtn = () => {
    //buyerYesActivity
    this.props.navigation.navigate('buyerYesActivity');
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    const resourceType = 'url'
    const sources = this.state.pdfurl;
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
            <Text style={{ fontSize: 19 }}>Agency Disclosure Form</Text>
          </View>
          <View style={styles.imgcontainer1}>
            <Text style={{ fontSize: 12, color: 'rey' }}>
              This is not a contract
            </Text>
          </View>
          <PDFView
            fadeInDuration={250.0}
            style={{
              height: '70%',
              alignSelf: 'center',
              width: '90%',
              marginTop: 10,
            }}
            resourceType={resourceType}
            resource={sources}
          />
          {/* <WebView
            style={{
              height: '70%',
              alignSelf: 'center',
              width: '90%',
              marginTop: 10,
            }}
            originWhitelist={['*']}
            source={{uri: this.state.pdfurl}}></WebView> */}
          <View style={styles.imgcontainer}>
            <Button block style={styles.btn} onPress={() => this.nobtn()}>
              <Text style={styles.btntxt}>AGREE</Text>
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
    height: '72%',
    // alignSelf:'center',
    // justifyContent:'center',
  },
  officelog: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  imgcontainer1: {
    padding: 3,
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
    height: 60,
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
  return bindActionCreators(
    {
      authdownloaddisclosure: Actions.authdownloaddisclosure,
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
)(Question12Screen);
