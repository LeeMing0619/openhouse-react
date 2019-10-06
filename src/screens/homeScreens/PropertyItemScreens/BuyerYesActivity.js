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

class BuyerYesActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentfullname: '',
      agentcellphone: '',
      agentofficename: '',
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
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton); }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) { }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };

  continue = () => {
    const { agentfullname, agentcellphone, agentofficename } = this.state;
    if (!agentfullname || agentfullname.length < 3) {
      Alert.alert('', 'Agent Full Name is Required');
    } else if (!agentcellphone || agentcellphone.length < 14) {
      Alert.alert('', 'Agent Cellphone is Required');
    } else if (!agentofficename || agentofficename.length < 3) {
      Alert.alert('', 'Agent OfficeName is Required');
    } else {
      let data = {
        attendeeagentfullname: agentfullname,
        attendeeagenttelephone: agentcellphone,
        attendeeagentcompanyname: agentofficename,
      };
      this.props.setagentitem(data);
      this.props.navigation.navigate('buyerYesOneActivity');
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
      // return (
      //   <ImageBackground
      //     source={Images.siginbackgroundimage}
      //     style={styles.container}
      //     resizeMode="cover"
      //     onLayout={this._onLayout}>

      //     <View style={styles.header}>
      //       <TouchableOpacity
      //         style={styles.lockbtnview}
      //         onPress={this.gobackdashboard}>
      //         <Text style={styles.backtxt}>Back</Text>
      //       </TouchableOpacity>
      //     </View>
      //     <View style={styles.formviewcontainer}>
      //       <View style={styles.imgcontainer1}>
      //         <Text style={{ fontSize: 40, marginTop: 5, marginBottom: 5 }}>
      //           Enter Agent Information
      //       </Text>
      //       </View>
      //       <View style={styles.formitemcontainer}>
      //         <Item stackedLabel style={styles.txtviewitem}>
      //           <Label style={[styles.txtlabel, { fontSize: 20 }]}>Agent's Full Name</Label>
      //           <Input
      //             value={this.state.agentfullname}
      //             style={[styles.txtitem2, { fontSize: 20, height: 60 }]}
      //             onChangeText={text => this.setState({ agentfullname: text })}
      //           />
      //         </Item>
      //         <Item stackedLabel style={styles.txtviewitem}>
      //           <Label style={[styles.txtlabel, { fontSize: 20 }]}>
      //             Agent's Cellphone or Office Number
      //         </Label>
      //           <Input
      //             value={this.state.agentcellphone}
      //             style={[styles.txtitem2, { fontSize: 20, height: 60 }]}
      //             keyboardType={'numeric'}
      //             onChangeText={text => {
      //               let num1 = text.replace(/\D+/g, '');
      //               let num2 = this.state.agentcellphone.replace(/\D+/g, '');
      //               let num = num1.replace('.', '');
      //               if (!text) {
      //                 this.setState({ agentcellphone: '' });
      //               }
      //               if (num1 && num1 === num2) {
      //                 num1 = num1.slice(0, num1.length - 1);
      //               }
      //               if (isNaN(num) || num.length > 10) {
      //                 // Its not a number
      //               } else {
      //                 let cleaned = num1;
      //                 let match = cleaned.replace(
      //                   /(\d{0,3})(\d{0,3})(\d{0,4})$/,
      //                   '($1) $2-$3',
      //                 );
      //                 if (match) {
      //                   this.setState({ agentcellphone: match });
      //                 }
      //                 if (!num1) {
      //                   this.setState({ agentcellphone: '' });
      //                 }
      //               }
      //             }}
      //           />
      //         </Item>
      //         <Item stackedLabel style={styles.txtviewitem}>
      //           <Label style={[styles.txtlabel, { fontSize: 20 }]}>Agent's Office Name</Label>
      //           <Input
      //             value={this.state.agentofficename}
      //             style={[styles.txtitem2, { fontSize: 20, height: 60 }]}
      //             onChangeText={text => this.setState({ agentofficename: text })}
      //           />
      //         </Item>
      //       </View>
      //       <View style={styles.imgcontainer}>
      //         <Button block style={[styles.btn, { height: 120 }]} onPress={() => this.continue()}>
      //           <Text style={[styles.btntxt, { fontSize: 30 }]}>Continue</Text>
      //         </Button>
      //       </View>
      //     </View>

      //     <View style={{
      //       position: 'absolute',
      //       height: 120,
      //       width: '40%',
      //       bottom: 60,
      //       right: 0,
      //       backgroundColor: '#8c8c8c',
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //     }}>
      //       <View style={styles.profilelogview}>
      //         <Image
      //           source={{ uri: this.props.login.account.agent_photo_url }}
      //           style={{
      //             width: 80,
      //             height: 80,
      //             borderRadius: 40,
      //             // resizeMode:'contain'
      //           }}
      //         />
      //       </View>
      //       <View style={[styles.textdetail, { marginLeft: 50 }]}>
      //         <Text style={{ fontSize: 20, color: 'white' }}>
      //           {this.props.login.account.agent_first_name}{' '}
      //           {this.props.login.account.agent_last_name}
      //         </Text>
      //         <Text style={{ fontSize: 20, color: 'white' }}>
      //           {this.props.login.account.agent_title}
      //         </Text>
      //         <Text style={{ fontSize: 20, color: 'white' }}>
      //           {this.props.login.account.agent_office_name}
      //         </Text>
      //       </View>
      //     </View>
      //   </ImageBackground>
      // );
    } else {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout()}>
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
              <Text style={{ fontSize: 19, marginTop: 5, marginBottom: 5 }}>
                Enter Agent Information
            </Text>
            </View>
            <View style={styles.formitemcontainer}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={[styles.txtlabel]}>Agent's Full Name</Label>
                <Input
                  value={this.state.agentfullname}
                  style={[styles.txtitem2,]}
                  onChangeText={text => this.setState({ agentfullname: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={[styles.txtlabel]}>
                  Agent's Cellphone or Office Number
              </Label>
                <Input
                  value={this.state.agentcellphone}
                  style={[styles.txtitem2]}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    let num1 = text.replace(/\D+/g, '');
                    let num2 = this.state.agentcellphone.replace(/\D+/g, '');
                    let num = num1.replace('.', '');
                    if (!text) {
                      this.setState({ agentcellphone: '' });
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
                        this.setState({ agentcellphone: match });
                      }
                      if (!num1) {
                        this.setState({ agentcellphone: '' });
                      }
                    }
                  }}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={[styles.txtlabel]}>Agent's Office Name</Label>
                <Input
                  value={this.state.agentofficename}
                  style={[styles.txtitem2]}
                  onChangeText={text => this.setState({ agentofficename: text })}
                />
              </Item>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={[styles.btn,]} onPress={() => this.continue()}>
                <Text style={[styles.btntxt]}>Continue</Text>
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
    top: 10,
    left: 20,
  },
  lockbtnview: {
    width: 70,
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
    width: '100%',
    height: 250,
    // alignSelf:'center',
    // justifyContent:'center',
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
    fontSize: 18,
    //
  },
  formitemcontainer: {
    marginTop: 10,
    height: 200,
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
)(BuyerYesActivity);
