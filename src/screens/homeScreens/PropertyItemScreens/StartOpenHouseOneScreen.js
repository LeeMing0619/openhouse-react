import React, { Component } from 'react';

import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert, BackHandler,
  Dimensions,

} from 'react-native';
import Orientation from 'react-native-orientation'
import {
  Button,
} from 'native-base';
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import Spinner from 'react-native-loading-spinner-overlay';
class StartOpenHouseOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    if (aspectRatio >1.6) {
      Constants.device_Pad = false;
    } else {
      Constants.device_Pad = false;
    }

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
    
   

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.downloadmortgagestatus === 200 && prevProps.login.downloadmortgagestatus === 100) {
      this.signin()
    }
  }

  signin = () => {
    // this.props.navigation.navigate('question12Screen');
    if (
      this.props.dashboard &&
      this.props.dashboard.makehousedata &&
      this.props.dashboard.makehousedata.type === 'public'
    ) {
      // go startopenhouse two
      let downloadmortgage = this.props.login.downloadmortgage.filter(
        item => item.is_selected === '1',
      );
      if (downloadmortgage && downloadmortgage.length) {
        this.props.setmortgageitem(downloadmortgage[0]);
        this.setState({ spinner: false })
        this.props.navigation.navigate('startOpenHouseTwoScreen');
      }
    } else {
      this.setState({ spinner: false })
      this.props.navigation.navigate('brokerOneScreen');
    }
  };
  gobackdashboard = () => {
    Alert.alert('', 'Do you want to end the Open House?', [
      { text: 'YES', onPress: this.godashboard },
      { text: 'NO' },
    ]);
  };
  godashboard = () => {
    if (Constants.device_Pad) {
      this.props.navigation.navigate('containerdScreen');
    } else {
      this.props.navigation.navigate('dashboard');
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
    if (Constants.device_Pad) {
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
              <Image source={Images.lock} style={styles.lockimg} />
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer}>
              <Image
                imageStyle={{ height: '100%', width: '100%' }}
                source={{ uri: this.props.login.account.agent_office_logo_url }}
                style={styles.officelog}
              />
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={[styles.btn, { height: 80, width: '40%' }]} onPress={() => this.signin()}>
                <Text style={[styles.btntxt, { fontSize: 30 }]}>PLEASE SIGN IN</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Text style={[styles.txtitem, { fontSize: 20 }]}>
                I understand that by pressing sign-in or continue, I am agreeing with the terms and
                    conditions of THT Open.  I am also granting full permission to be
                  contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name} or any of his/her affiliates.
                  You're also granting permission to be contacted by any of THT Open
                   partners and affiliates
              </Text>
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
            textContent={'Signing...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Image source={Images.lock} style={styles.lockimg} />
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer}>
              <Image
                source={{ uri: this.props.login.account.agent_office_logo_url }}
                style={styles.officelog}
              />
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => { this.props.authdownloadmortgage(), this.setState({ spinner: true }) }}>
                <Text style={styles.btntxt}>PLEASE SIGN IN</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Text style={styles.txtitem}>
                I understand that by pressing sign-in or continue, I am agreeing with the terms and
                    conditions of THT Open.  I am also granting full permission to be
                  contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name} or any of his/her affiliates.
                   I am also granting permission to be contacted by any of THT Open
                   partners and affiliates
              </Text>
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
    top: 10,
    right: 10,
  },
  lockbtnview: {
    width: 50,
    height: 50,
    marginTop: 25,
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
    width: '80%',
    paddingBottom: 20,
    marginLeft: '10%',
    marginRight: '10%',
    // alignSelf:'center',
    // justifyContent:'center',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    borderRadius: 5,
  },
  officelog: {
    width:200,
    height: 100,
    resizeMode: 'contain',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: 60,
    margin: 10,
  },
  spinnerTextStyle: {
    color: '#FFF'
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
    justifyContent: 'center',
    alignItems: 'center',
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
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      authdownloadmortgage: Actions.authdownloadmortgage,
      setmortgageitem: Actions.setmortgageitem,
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
)(StartOpenHouseOneScreen);
