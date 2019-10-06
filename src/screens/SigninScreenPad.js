import React, { Component } from 'react';
// import Timer from 'react-timer-mixin';
import * as Actions from '../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  Alert,
  Dimensions,BackHandler,
} from 'react-native';
import { Button, Item, Input, Label } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Modal from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import UUIDGenerator from 'react-native-uuid-generator';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
const _keyExtractor = item => item.realtor_title;
const _keyExtractor3 = item => item.company_name;
class SigninScreen extends Component {
  static navigationOptions = {
    title: 'Back',
    header: null,
  };
  state = {
    email: 'kelloggsx@gmail.com',
    password: '1019klgsx',
    spinner: false,
    loadingtxt: '',
    navbarTitle: ['Your Account Information',
      'What Is Your Title?',
      'Who Is Your Broker?',
      'Review Your Information',],
    modalStatus: 1,
    firstname: 'AA',
    lastname: 'BB',
    phone: '1234567890',
    repassword: '1019klgsx',
    title: '',
    officename: '',
    uniqueid: '',
    officetelephone: '',
    device: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    appid: 'com.ecaptureinc.open',
    company_logo_url: '',
    loadingtxt: '',
  };
  constructor(props) {
    super(props);
    Orientation.lockToLandscape();
  }
  componentWillUnmount() {
  }
  componentWillmount() {
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingtxt !== this.props.login.loadingtxt &&
      this.props.login.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.login.loadingtxt });
    }
    else if (this.state.spinner === false && this.props.login.status === 100) {
      this.setState({ spinner: true });
    }
    else if (this.props.login.status === 200 && prevProps.login.status === 100) {
      this.props.authupdate();
    }
    else if (
      this.props.login.updatedatastatus === 200 &&
      prevProps.login.updatedatastatus === 100
    ) {
      this.props.authdownloadstationlist();
    }
    else if (
      this.props.login.downloadstatus === 200 &&
      prevProps.login.downloadstatus === 100
    ) {
      this.props.authdownloadmortgage();
    }
    else if (
      this.props.login.downloadmortgagestatus === 200 &&
      prevProps.login.downloadmortgagestatus === 100
    ) {
      this.props.authdownloaddisclosure();
    }
    else if (
      this.props.login.downloaddisclosurestatus === 200 &&
      prevProps.login.downloaddisclosurestatus === 100
    ) {
      Constants.disclosureArray = this.props.login.downloaddisclosure;
      this.props.authdownloadProperties();
    }
    else if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
      this.props.authdownloadPropertyAttende();
    }
    else if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      this.props.authdownloadPropertyBrokerAttende();
    }
    else if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
      this.props.authdownloadEvent();
    }
    else if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      this.props.authdownloadEventAttend();
    }
    else if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      this.props.authdownloadMLSLinkAccount();
    }
    else if (
      this.props.login.downloadMLSLinkAccountstatus === 200 &&
      prevProps.login.downloadMLSLinkAccountstatus === 100
    ) {
      this.props.getproperties();
    }

    else if (
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
      (this.props.dashboard.status === 200 ||
        this.props.dashboard.status === 400) &&
      this.state.spinner === true
    ) {
      this.setState({ spinner: false });
      this.props.navigation.navigate('containerdScreen');
    }
    else if (
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
      this.setState({ spinner: false });
      Alert.alert('Login Faild', 'Please Check Login Info');
    }
    else if (this.props.createaccount.newaccountstatus >= 200 && prevProps.createaccount.newaccountstatus === 100 && this.state.spinner === true) {
      this.setState({ spinner: false });
      if (this.props.createaccount.newaccountstatus === 200) {
        this.setState({ spinner: false });
        Alert.alert(
          'Please Login',
          'Welcome to the Open House Marketing System',
          [
            { text: 'OK', onPress: this.gosiginscreen() },
          ],
        );

      }
      else if (this.props.createaccount.newaccountstatus === 500) {
        Alert.alert(
          'An account with this email address is already in our system.',
          'Error Creating Account',
        )
      }
      else {
        Alert.alert(
          'Unable to create an account at this time.',
          'Application Error',
        )
      }
    }
  }
  gosiginscreen = () => {
    this.setState({ spinner: false });
    this.refs.modalCreatAccount.close();
  }
  _orientationDidChange(orientation){
    Orientation.lockToLandscapeLeft();
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    Orientation.addOrientationListener(this._orientationDidChange);
    UUIDGenerator.getRandomUUID((uuid) => {
      this.setState({ uniqueid: uuid });
    });
  }
  onLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.props.loginaction(email, password);
      Constants.user_mail = email;
      Constants.user_password = password;
      this.setState({ spinner: true })
    }
    if (!email) {
      Alert.alert('', 'Please Input Email');
    } else if (!password) {
      Alert.alert('', 'Please Input Password');
    }
  };
  onCreateAccount = () => {
    this.refs.modalCreatAccount.open();
  };
  Navigation = () => {
    if (this.state.modalStatus > 1)
      this.setState({ modalStatus: this.state.modalStatus - 1 })
  };
  next = () => {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      repassword,
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!firstname || firstname.length < 2) {
      Alert.alert('Please Enter A Valid First Name', '');
    } else if (!lastname || lastname.length < 2) {
      Alert.alert('Please Enter A Valid Last Name', '');
    } else if (!email || (email && reg.test(email) === false)) {
      Alert.alert('Please Enter A Valid Email', '');
    } else if (!phone) {
      Alert.alert('Please Enter A Valid Telephone Number', '');
    } else if (!password || !repassword) {
      Alert.alert('Password do not match', '');
    } else if (password.length < 6 || repassword.length < 6) {
      Alert.alert('Password is too short', '');
    } else if (password !== repassword) {
      Alert.alert('Password do not match', '');
    } else {
      Constants.create_userfirstname = firstname;
      Constants.create_userlastname = lastname;
      Constants.create_useremailaddress = email;
      Constants.create_userephoneNumber = phone;
      Constants.create_userpassword = password;
      this.props.getcreateaccountdata();
      this.setState({ modalStatus: 2 })
    }
  }
  itemClick = (item) => {
    if (item && item.realtor_title) {
      this.props.getbrokersname(item.realtor_title);
      this.setState({ title: item.realtor_title })
      this.setState({ modalStatus: 3 })
    }
    else {
      Alert.alert(
        'You must enter/select a title to continue',
        '',
      )
    }
  }
  itemClick3 = (item1) => {
    if (item1 && item1.company_name) {
      this.props.getoriginationlist(item1);
      this.setState({ officename: item1.company_name });
      this.setState({ company_logo_url: item1.company_logo_url });
      this.setState({ modalStatus: 4 })
    }
    else {
      Alert.alert(
        'You must enter a name for your company',
        '',
      )
    }
  }
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick(item)} style={styles.itemcontainer}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              <FastImage
                style={styles.itemimg}
                imageStyle={{width:'100%',height:'100%'}}
                renderError={(e) => {
                  return (
                    <View >
                      <FastImage source={Images.openhouse} style={styles.itemimg} imageStyle={styles.itemimg} />
                    </View>

                  )
                }}
                source={{ uri: item.realtor_image_url }}
              />
            </View>
          </View>

          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt}>{item.realtor_title}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
  _renderItem3 = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick3(item)} style={styles.itemcontainer}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              <FastImage
                style={styles.itemimg}
                imageStyle={{width:'100%',height:'100%'}}
                renderError={(e) => {
                  return (
                    <View >
                      <FastImage source={Images.openhouse} style={{ width: Dimensions.get('screen').width * 0.2, height: Dimensions.get('screen').width * 0.2, }} imageStyle={{ width: Dimensions.get('screen').width * 0.2, height: Dimensions.get('screen').width * 0.2, }} />
                    </View>
                  )
                }}
                source={{ uri: item.company_logo_url }}
              />
            </View>
          </View>

          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt}>{item.company_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  checktypeid = (id, e) => {
  };
  modalView = () => {
    switch (this.state.modalStatus) {
      case 1:
        return (
          <View style={{ flex: 1, marginTop: 20 }}>
            <TextInput
              style={styles.txtinput}
              placeholder={'Enter Your First Name'}
              onBlur={e => this.checktypeid(0, e)}
              onChangeText={text => this.setState({ firstname: text })}
              value={this.state.firstname}
            />
            <TextInput
              onBlur={e => this.checktypeid(1, e)}
              style={styles.txtinput}
              placeholder={'Enter Your Last Name'}
              onChangeText={text => this.setState({ lastname: text })}
              value={this.state.lastname}
            />
            <TextInput
              onBlur={e => this.checktypeid(2, e)}
              style={styles.txtinput}
              keyboardType="email-address"
              placeholder={'Enter Your Email Address'}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
            <TextInput
              onBlur={e => this.checktypeid(3, e)}
              style={styles.txtinput}
              placeholder={'Enter Your Cell Phone Number'}
              onChangeText={text => {
                let num1 = text.replace(/\D+/g, '');
                let num2 = this.state.phone.replace(/\D+/g, '');
                let num = num1.replace('.', '');
                if (!text) {
                  this.setState({ phone: '' });
                }
                if (num1 && num1 === num2) {
                  num1 = num1.slice(0, num1.length - 1);
                }
                if (isNaN(num) || num.length > 10) {
                  // Its not a number
                } else {
                  let cleaned = num1;
                  let match = cleaned.replace(
                    /(\d{0,3})(\d{0,3})(\d{0,4})$/,
                    '($1) $2-$3',
                  );
                  if (match) {
                    this.setState({ phone: match });
                  }
                  if (!num1) {
                    this.setState({ phone: '' });
                  }
                }
              }}
              value={this.state.phone}
              keyboardType={'numeric'}
            />
            <TextInput
              onBlur={e => this.checktypeid(4, e)}
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Enter Your Password'}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
            <TextInput
              onBlur={e => this.checktypeid(5, e)}
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Confirm Password'}
              onChangeText={text => this.setState({ repassword: text })}
              value={this.state.repassword}
            />
            <View style={[styles.txtrow, { marginTop: 50, width: '100%' }]}>
              <Button block style={styles.btn} onPress={() => this.next()}>
                <Text style={[styles.btntxt]}>Next</Text>
              </Button>
            </View>
          </View>
        )
        break;
      case 2:
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              data={(this.props.createaccount && this.props.createaccount.realtortitles && this.props.createaccount.realtortitles !== null && this.props.createaccount.realtortitles.length) ? this.props.createaccount.realtortitles : []}
              numColumns={2}
              keyExtractor={_keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        )
        break;
      case 3:
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              data={(this.props.createaccount && this.props.createaccount !== null && this.props.createaccount.brokername) ? this.props.createaccount.brokername : []}
              numColumns={2}
              keyExtractor={_keyExtractor3}
              renderItem={this._renderItem3}
            />
          </View>
        )
        break;
      case 4:
        return (
          <View style={{ flex: 1 }}>
            <View style={[styles.txtrow, { width: '100%' }]}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>First Name</Label>
                <Input disabled value={Constants.create_userfirstname} style={styles.txtitem} />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Last Name</Label>
                <Input disabled value={Constants.create_userlastname} />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Title</Label>
                <Input disabled value={this.state.title} />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Email</Label>
                <Input disabled value={Constants.create_useremailaddress} />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Phone Number</Label>
                <Input disabled value={Constants.create_userephoneNumber} />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Broker Name</Label>
                <Input disabled value={this.state.officename} />
              </Item>
            </View>
            <View style={[styles.txtrow, { marginTop: 50, width: '100%' }]}>
              <Button
                block
                style={[styles.btn]}
                onPress={() => this.confirm()} >
                <Text style={styles.btntxt}>Confirm</Text>
              </Button>
            </View>
          </View>
        )
        break;
      default:
        break;
    }
  }
  confirm = () => {
    const { firstname, lastname, phone, officetelephone, title, email, uniqueid, officename, password, company_logo_url, device, appid } = this.state;
    this.props.createnewaccount(firstname, lastname, phone, officetelephone, title, email, uniqueid, officename, password, company_logo_url, device, appid);
    this.setState({ spinner: true });
  }
  _onLayout(){
    Orientation.lockToLandscape();
  }
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={{ flex: 1 }}
        resizeMode="cover"
        onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          {/* <View style={styles.logo}> */}
            <Image source={Images.openhouse} style={styles.openhouselogo} />
          {/* </View> */}
          {/* <View style={styles.titlename}>
            <Text style={styles.titletxt}>Open House</Text>
            <Text style={styles.titletxt}>Marketing System</Text>
          </View> */}
        </View>
        <View style={styles.loginContainer}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 28, marginTop: 20, marginLeft: 20, }}>Login</Text>
          </View>
          <View style={styles.txtrow}>
            <TextInput
              style={styles.txtinput}
              placeholder={'Email'}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
            <TextInput
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Password'}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <View style={{ flexDirection: 'row-reverse', width: 500, }}>
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
          <View style={styles.txtrow}>
            <Button
              block
              style={styles.btn}
              onPress={() => this.onCreateAccount()}>
              <Text style={styles.btntxt}>CREATE NEW ACCOUNT</Text>
            </Button>
          </View>
          <View style={styles.textitem}>
            <View style={styles.text1}>
              <Text style={styles.text2}>
                By Signing in, you are agreeing to our
                  </Text>
              <TouchableOpacity>
                <Text style={styles.text3}>{' '}terms and conditions</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>{' '}of our services</Text>
            </View>
          </View>
        </View>
        <Modal
          style={styles.modal}
          position={'center'}
          ref={'modalCreatAccount'}>
          <View style={styles.modalNavBar}>
            <TouchableOpacity
              style={{
                position: 'absolute', margin: 10,
              }}
              onPress={() => this.Navigation()}>
              <Image
                source={Images.backicon}
                imageStyle={{ width: 40, height: 40 }}
                style={{ width: 40, height: 40, }}
              />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', }}>
              <Text style={{ fontSize: 30, padding: 10, }}>{this.state.navbarTitle[this.state.modalStatus - 1]}</Text>
            </View>
          </View>
          {this.modalView()}

        </Modal>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  itemcontainer: {
    width: '50%',
  },
  itemview: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#CDCECD',
  },
  itmeimgcontainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
  },
  itemimgview: {
    height: Dimensions.get('screen').width / 2 * 0.2,
    width: Dimensions.get('screen').width / 2 * 0.2,
    borderRadius: Dimensions.get('screen').width / 2 * 0.2 * 0.5,
    borderWidth: 0.5,
    borderColor: '#CDCECD',
    alignItems: 'center',
    justifyContent: 'center',

  },
  itemtxt: {
    fontSize: 16,
    textAlign: 'center',
  },
  itemtxtview: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  modalNavBar: {
    height: 60,
    borderColor: 'white',
    backgroundColor: '#f6f6f6f6',
    borderBottomColor: 'gray',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    marginTop: '10%',
    marginLeft: '-45%',
  },
  logo: {
    flexDirection: 'row',
    height: 220,
    width: 220,
    marginTop: 25,
    borderRadius: 110,
    top: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#808080',

  },
  openhouselogo: {
    width: 180,
    height: 180,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  txtlabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',

  },
  titlename: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
  },
  titletxt: {
    width: '70%',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.billabong,
    fontSize: 60,
    marginTop: -7,
  },
  btnview: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  txtrow: {
    marginTop: 10,
    width: 500,
  },
  loginContainer: {
    backgroundColor: 'white',
    flexWrap: 'wrap',
    position: 'absolute',
    right: '5%',
    marginTop: '10%',
  },
  btn: {
    width: '80%',
    backgroundColor: '#38a2c2',
    height: 60,
    alignSelf: 'center'
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  text1: {
    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text2: {
    fontSize: 14,
    textAlign: 'center',
  },
  text3: {
    fontSize: 14,
    textAlign: 'center',
    color: 'blue',
  },
  txtbtn: {
    fontSize: 22,
    color: '#345f9f',
    marginTop: 10,
    marginRight: 10,
  },
  txtbtnview: {
    margin: 5,
    width: '50%',
    flexDirection: 'row-reverse',
  },
  textitem: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtinput: {
    height: 60,
    borderColor: '#808080',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    fontSize: 24,
  },
  modal: {
    width: '50%',
    height: '95%',
  }
  ,
  txtitem: {
    fontSize: 20,
    height: 50,
  }
});

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


      getcreateaccountdata: Actions.getcreateaccountdata,
      initauth: Actions.initauth,
      getbrokersname: Actions.getbrokersname,
      getoriginationlist: Actions.getoriginationlist,
      createnewaccount: Actions.createnewaccount,


      getproperties: Actions.getproperties,
      getevent: Actions.getevent,
    },
    dispatch,
  );
}

function mapStateToProps({ login, createaccount, dashboard }) {
  return {
    dashboard: dashboard,
    login: login,
    createaccount: createaccount,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninScreen);
