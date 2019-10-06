import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Alert,
  FlatList,
  Linking,BackHandler,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { SearchBar, Avatar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import { SwipeListView } from 'react-native-swipe-list-view';

const _keyExtractor = item => item.name;

class MyBoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      dashboard:
        this.props.dashboard && this.props.dashboard.myboard
          ? this.props.dashboard.myboard
          : [],
    };
  }

  _renderItem = ({ item }) => {
    if (item === 0) {
      return (
        <View style={[styles.itemcontainer, { boderColor: '#808080', boderWidth: 0.5, borderStyle: 'solid' }]}>
          <View style={[styles.itmeimgcontainer, { justifyContent: 'center' }]} opacity={0.95}>
            <Text style={{ fontSize: 18, alignSelf: 'center' }}>
              Link to MLS Organization
              </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => this.addLMSaccount()}>
            <Image
              style={{ height: 100, width: 100, alignSelf: 'center' }}
              imageStyle={{ resizeMode: 'center', height: '100%', width: '100%' }}
              source={Images.add_data}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.itemcontainer, { backgroundColor: 'white', boderColor: '#808080', boderWidth: 0.5, borderStyle: 'solid' }]}>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ width: 30, height: 30, alignSelf: 'flex-end' }}>
              <Image
                source={Images.delete_icon}
                imageStyle={{ width: '100%', height: '100%' }}
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
            {item.photourl && (
              <Avatar
                size='xlarge'
                rounded
                source={{ uri: item.photourl }}
              />
            )}
            {!item.photourl && (
              <Avatar
                source={Images.avataricon}
                size='medium'
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            )}
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.itemtxt}>
              {item.firstname} {item.lastname}
            </Text>
            <Text style={styles.itemtxt2}>{item.mls_organization_name}</Text>
            <Text style={styles.itemtxt2}>Agent ID: {item.agentid}</Text>
          </View>
        </View>
      );
    }
  };

  async handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.Unlink = this.Unlink.bind(this);
    // if (this.props.dashboard.status === 230) {
    //   //alert('Success');
    //   this.setState({
    //     dashboard:
    //       this.props.dashboard && this.props.dashboard.myboard
    //         ? this.props.dashboard.myboard
    //         : [],
    //   });
    // }
    this._addLMSaccount = this._addLMSaccount.bind(this);
    this.props.navigation.setParams({ addmlsaccount: this._addLMSaccount });
  }
  addLMSaccount() {
   this.props.dashboardstatuschange(16);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 230) {
      // alert('Success');
      if (Constants.loadLMSflag === 1) {
        this.setState({
          dashboard:
            this.props.dashboard && this.props.dashboard.myboard
              ? this.props.dashboard.myboard
              : [],
        });
        Constants.loadLMSflag = 0;
      }
    }
  }

  Unlink(item) {
    let message = 'Are you sure you want' + 'to unlink account?';
    Alert.alert(
      '',
      message,
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            this.props.unlinkaccount(item);
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                /> */}
        <FlatList
          data={[0, ...this.state.dashboard]}
          numColumns={3}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  itemtxtview: {
    marginLeft: 40,
    justifyContent: 'center',
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
    paddingLeft: 10,
    fontSize: 18,
  },
  txtrow: {
    marginTop: 20,
  },
  txtbtn: {
    color: '#0520F1',
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
    marginLeft: 10,
    marginRight: 10,
  },
  btntxt: {

    color: 'white',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemcontainer: {
    backgroundColor: '#808080',
    width: Dimensions.get('window').width / 5 * 0.96,
    height: Dimensions.get('window').width / 5 * 0.6 + 130,
    margin: 10,
  },
  itemview: {
    flex: 1,
    // margin: 8,
    alignItems: 'center',
    // borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#d6d6d6',
    backgroundColor: '#ffffff',
  },
  itemimg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    // margin:'10%',
  },
  itemimgview: {
    height: (Dimensions.get('window').height - 92) * 0.1 - 25,
    width: (Dimensions.get('window').height - 92) * 0.1 - 25,
    borderRadius: (Dimensions.get('window').height - 92) * 0.1 * 0.5 - 12.5,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '80%',
    marginLeft: 10,
    // alignItems:'center',
  },
  itemtxt: {
    fontSize: 14,
    fontWeight: 'bold'
    // textAlign:'center',

  },
  itemtxt2: {
    fontSize: 14,
    marginTop: 4,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    position: 'relative',
    padding: 5,
    borderWidth: 0.5,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange:Actions.dashboardstatuschange,
      unlinkaccount: Actions.unlinkaccount,
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
)(MyBoardScreen);
