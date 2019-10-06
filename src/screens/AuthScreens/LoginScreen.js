import React, {Component} from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
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
  Alert,BackHandler,
} from 'react-native';
import {Button} from 'native-base';
import {Images, Fonts, Constants} from '@commons';

import Spinner from 'react-native-loading-spinner-overlay';

class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Login',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerRight: <View />,
    };
  };
  state = {
    email: '',
    password: '',
    spinner: false,
    loadingtxt: '',
  };
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingtxt !== this.props.login.loadingtxt &&
      this.props.login.loadingtxt !== ''
    ) {
      this.setState({loadingtxt: this.props.login.loadingtxt});
    }
    if (this.state.spinner === false && this.props.login.status === 100) {
      this.setState({spinner: true});
    }
    if (this.props.login.status === 200 && prevProps.login.status === 100) {
      this.props.authupdate();
    }
    if (
      this.props.login.updatedatastatus === 200 &&
      prevProps.login.updatedatastatus === 100
    ) {
      this.props.authdownloadstationlist();
    }
    if (
      this.props.login.downloadstatus === 200 &&
      prevProps.login.downloadstatus === 100
    ) {
      this.props.authdownloadmortgage();
    }
    if (
      this.props.login.downloadmortgagestatus === 200 &&
      prevProps.login.downloadmortgagestatus === 100
    ) {
      this.props.authdownloaddisclosure();
    }
    if (
      this.props.login.downloaddisclosurestatus === 200 &&
      prevProps.login.downloaddisclosurestatus === 100
    ) {
      // alert('dd');
      Constants.disclosureArray = this.props.login.downloaddisclosure;
      this.props.authdownloadProperties();
    }
    if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
      this.props.authdownloadPropertyAttende();
    }
    if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      this.props.authdownloadPropertyBrokerAttende();
    }
    if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
      this.props.authdownloadEvent();
    }
    if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      this.props.authdownloadEventAttend();
    }
    if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      this.props.authdownloadMLSLinkAccount();
    }
    if (
      (this.props.login.updatedatastatus === 200 ||
        this.props.login.updatedatastatus === 400) &&
      (this.props.login.status === 200 || this.props.login.status === 400) &&
      (this.props.login.downloadstatus === 200 ||
        this.props.login.downloadstatus === 400) &&
      (this.props.login.downloadmortgagestatus === 200 ||
        this.props.login.downloadmortgagestatus === 400) &&
      (this.props.login.downloaddisclosurestatus === 200 ||
        this.props.login.downloaddisclosurestatus === 400) &&
      (this.props.login.downloadpropertiesstatus === 200 ||
        this.props.login.downloadpropertiesstatus === 400) &&
      (this.props.login.downloadpropertiesattendestatus === 200 ||
        this.props.login.downloadpropertiesattendestatus === 400) &&
      (this.props.login.downloadpropertiesbrokerattendestatus === 200 ||
        this.props.login.downloadpropertiesbrokerattendestatus === 400) &&
      (this.props.login.downloadeventstatus === 200 ||
        this.props.login.downloadeventstatus === 400) &&
      (this.props.login.downloadeventattendstatus === 200 ||
        this.props.login.downloadeventattendstatus === 400) &&
      (this.props.login.downloadMLSLinkAccountstatus === 200 ||
        this.props.login.downloadMLSLinkAccountstatus === 400) &&
      this.state.spinner === true
    ) {
      this.setState({spinner: false});
      this.props.navigation.navigate('dashboard');
    }
    if (
      (this.props.login.updatedatastatus > 200 ||
        this.props.login.status > 200 ||
        this.props.login.downloadstatus > 200 ||
        this.props.login.downloadmortgagestatus > 200 ||
        this.props.login.downloaddisclosurestatus > 200 ||
        this.props.login.downloadpropertiesstatus > 200 ||
        this.props.login.downloadpropertiesattendestatus > 200 ||
        this.props.login.downloadpropertiesbrokerattendestatus > 200 ||
        this.props.login.downloadeventstatus > 200 ||
        this.props.login.downloadeventattendstatus > 200 ||
        this.props.login.downloadMLSLinkAccountstatus > 200) &&
      this.state.spinner === true
    ) {
      this.setState({spinner: false});
      Alert.alert('Login Faild', 'Please Check Login Info');
    }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.props.initauth();
    // if(this.props.login.status === 200){
    //     this.props.authupdate();
    // }
    // setInterval(() => {
    //     this.setState({
    //         spinner: !this.state.spinner
    //     });
    // }, 3000);
  }
  onLogin = () => {
    const {email, password} = this.state;
    if (email && password) {
      this.props.loginaction(email, password);
      Constants.user_mail = email;
      Constants.user_password = password;
    }
    if (!email) {
      Alert.alert('', 'Please Enter A Valid Email Address');
    } else if (!password) {
      Alert.alert('', 'Please Enter A Valid Password');
    }
  };
  forgotpassword = () => {
    this.props.navigation.navigate('resetpass');
  };
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={{flex: 1}}
        resizeMode="cover">
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          <View style={styles.txtrow}>
            <TextInput
              style={styles.txtinput}
              placeholder={'Email'}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
            />
            <TextInput
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Password'}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
            />
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              style={styles.txtbtnview}
              onPress={this.forgotpassword}>
              <Text style={styles.txtbtn}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.txtrow}>
            <Button block style={styles.btn} onPress={() => this.onLogin()}>
              <Text style={styles.btntxt}>LOGIN</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  txtinput: {
    height: 50,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  txtrow: {
    marginTop: 20,
  },
  txtbtn: {
    fontSize:12,
    color: '#345f9f',
    marginTop: 10,
    marginRight: 10,
  },
  txtbtnview: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  btn: {
    alignSelf:'center',
    backgroundColor: '#38a2c2',
    width: '90%',
    height: Dimensions.get('window').height*0.11,
    marginRight:10,
    marginLeft:10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 21,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginaction: Actions.login,
      authupdate: Actions.authupdate,
      initauth: Actions.initauth,
      authdownloadstationlist: Actions.authdownloadstationlist,
      authdownloadmortgage: Actions.authdownloadmortgage,
      authdownloaddisclosure: Actions.authdownloaddisclosure,
      authdownloadProperties: Actions.authdownloadProperties,
      authdownloadPropertyAttende: Actions.authdownloadPropertyAttende,
      authdownloadPropertyBrokerAttende:
        Actions.authdownloadPropertyBrokerAttende,
      authdownloadEvent: Actions.authdownloadEvent,
      authdownloadEventAttend: Actions.authdownloadEventAttend,
      authdownloadMLSLinkAccount: Actions.authdownloadMLSLinkAccount,
    },
    dispatch,
  );
}

function mapStateToProps({login}) {
  return {
    login: login,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
