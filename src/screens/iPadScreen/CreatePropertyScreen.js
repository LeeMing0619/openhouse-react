import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
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
import { Images, Fonts } from '@commons';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class CreatePropertyScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountnum:
        props.login.account && props.login.account.account_num
          ? props.login.account.account_num
          : '',
      propertyid: '',
      propertytype: 'S',
      propertyaddress: '',
      propertycity: '',
      propertystate: '',
      propertyzipcode: '',
      propertyprice: '$0',
      propertytaxes: '$0',
      anim: new Animated.Value(0),
      fromrange: 0,
    };
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }
  _save = () => {
    const {
      accountnum,
      propertytype,
      propertyid,
      propertyaddress,
      propertycity,
      propertystate,
      propertyzipcode,
      propertyprice,
      propertytaxes,
    } = this.state;
    if (!propertyid) {
      Alert.alert('Error', 'Please Enter A Valid MLS ID Number');
    } else if (!propertytype) {
      Alert.alert('Error', 'Please Select a Property Type');
    } else if (!propertyaddress) {
      Alert.alert('Error', 'Please Enter A Valid Address');
    } else if (!propertycity) {
      Alert.alert('Error', 'Please Enter A Valid City');
    } else if (!propertystate) {
      Alert.alert('Error', 'Please Enter A Valid State');
    } else if (!propertyzipcode || propertyzipcode.length !== 5) {
      Alert.alert('Error', 'Please Enter A Valid ZipCode');
    } else if (!propertyprice) {
      Alert.alert('Error', 'Please Enter A Valid Listing Amount');
    } else if (!propertytaxes) {
      Alert.alert('Error', 'Please Enter A Valid Tax Amount');
    } else {
      this.props.createproperty(
        accountnum,
        propertytype,
        propertyid,
        propertyaddress,
        propertycity,
        propertystate,
        propertyzipcode,
        propertyprice,
        propertytaxes,
      );
    }
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentDidUpdate(prevProps, prevState) { }

  handlepropertytype = value => {
    this.setState({
      propertytype: value,
    });
  };
  handlepropertystate = value => {
    this.setState({
      propertystate: value,
    });
  };
  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true, fromrange: 0 });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false, fromrange: 0 });
  }
  fadeIn(delay) {
    const { anim, typeid, fromrange } = this.state;
    let from = 1;
    from = fromrange;
    return {
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }
  render() {
    return (
      <View style={{ flex: 1, borderWidth: 0.5, borderColor: '#808080', borderStyle: 'solid', margin: 20 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{ flex: 1 }}><Text style={{ fontSize: 34, alignSelf: 'center', marginTop:10,}}>Create Property</Text></View>
        <View style={{flex:10}}>
          <View style={styles.txtrow}>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Enter Property ID</Label>
              <Input
                value={this.state.propertyid}
                style={styles.txtitem}
                onChangeText={text => this.setState({ propertyid: text })}
              />
            </Item>
            <Item picker style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Enter Property Type</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.propertytype}
                onValueChange={this.handlepropertytype}>
                <Picker.Item label="For Sale" value="S" />
                <Picker.Item label="For Rent" value="R" />
              </Picker>
            </Item>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Enter Property Address</Label>
              <Input
                value={this.state.propertyaddress}
                onChangeText={text => this.setState({ propertyaddress: text })}
              />
            </Item>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>City</Label>
              <Input
                value={this.state.propertycity}
                onChangeText={text => this.setState({ propertycity: text })}
              />
            </Item>
            <Item picker style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>State</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickeritem}
                placeholder="Select your SIM"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.propertystate}
                onValueChange={this.handlepropertystate}>
                {this.props.login.downloadlist &&
                  this.props.login.downloadlist !== null &&
                  this.props.login.downloadlist.map((item, index) => {
                    return (
                      <Picker.Item
                        label={item.statename}
                        value={item.state}
                        key={index}
                      />
                    );
                  })}
              </Picker>
            </Item>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Zip Code</Label>
              <Input
                value={this.state.propertyzipcode}
                keyboardType={'numeric'}
                onChangeText={text => {
                  let num1 = text.replace(/\D+/g, '');
                  let num = num1.replace('.', '');
                  if (isNaN(num) && text.length) {
                    // Its not a number
                  } else {
                    this.setState({ propertyzipcode: num1 });
                  }
                }}
              />
            </Item>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Listing Amount</Label>
              <Input
                value={this.state.propertyprice}
                keyboardType={'numeric'}
                onChangeText={text => {
                  let num1 = text.replace(/\D+/g, '');
                  if (num1 && num1.length === 2 && num1[0] === '0') {
                    num1 = num1[1];
                  }
                  let num2 =
                    '$' + num1.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  if (text.length === 0) {
                    num2 = '$0';
                  }
                  if (!num1) {
                    num2 = '$0';
                  }
                  let num = num1.replace('.', '');
                  if (isNaN(num) && text.length) {
                    // Its not a number
                  } else {
                    this.setState({ propertyprice: num2 });
                  }
                }}
              />
            </Item>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Taxes(if any)</Label>
              <Input
                value={this.state.propertytaxes}
                keyboardType={'numeric'}
                onChangeText={text => {
                  let num1 = text.replace(/\D+/g, '');
                  if (num1 && num1.length === 2 && num1[0] === '0') {
                    num1 = num1[1];
                  }
                  let num2 =
                    '$' + num1.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  if (text.length === 0) {
                    num2 = '$0';
                  }
                  if (!num1) {
                    num2 = '$0';
                  }
                  let num = num1.replace('.', '');
                  if (isNaN(num) && text.length) {
                    // Its not a number
                  } else {
                    this.setState({ propertytaxes: num2 });
                  }
                }}
              />
            </Item>
          </View>
        </View>
        <View style={{ flex: 2, flexDirection: 'row',marginTop:5,}}>
          <Button block style={styles.btn} onPress={() => this._save()}>
            <Text style={[styles.btntxt]}>SAVE</Text>
          </Button>
          <Button block style={styles.btn} onPress={() => { this.props.dashboardstatuschange(12); }}>
            <Text style={[styles.btntxt]}>CANCEL</Text>
          </Button>
        </View>
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
    fontSize: 20,
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
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    width:150,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtviewitem: {
    marginRight: 10,
    marginLeft: 10,
    padding: 0,
  },
  txtlabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'red',
  },
  txtitem: {},
  pickeritem: {
    height: 50,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createproperty: Actions.createproperty,
      dashboardstatuschange:Actions.dashboardstatuschange,
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
)(CreatePropertyScreen);
