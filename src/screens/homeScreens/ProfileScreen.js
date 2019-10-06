import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import axios from 'axios';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import Orientation from 'react-native-orientation'
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
  Linking, BackHandler,
  PermissionsAndroid,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { SearchBar, Input, Avatar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import { white, red } from 'ansi-colors';
import { AuthService } from '@services';
import ImagePicker from 'react-native-image-picker';

const axios_instance1 = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Profile Information',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.getParam('logout')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Text style={{ color: '#0000ff' }}>Save</Text>
        </TouchableOpacity>
      ),
    };
  };



  constructor(props) {
    super(props);
    this.state = {
      profile_info: {},
      flag: false,
      set_flag: false,
      key_flag: false,
      photo_url: '',
      first_name: '',
      last_name: '',
      agent_title: '',
      email_adress: '',
      cell_number: '',
      broker_name: '',
      spinner: false,
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    this._saveprofile = this._saveprofile.bind(this);
    this.LoadProfile = this.LoadProfile.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 255) {
      if (Constants.updateFlag === 1) {
        this.setState({ spinner: false, });
        this.props.navigation.goBack();
        Constants.updateFlag = 0;
      }
    }
    if (this.props.login.profileinfostatus === 200) {
      // ''alert('dd');
    }
  }
  async LoadProfile() {
    var info = await AuthService.profile_login(
      Constants.user_mail,
      Constants.user_password,
    );
    var data = info[0];
    if (info[0].agent_photo_url === null) {
      this.setState({ flag: true });
    }
    this.setState({ photo_url: null });
    if (this.state.set_flag == false) {
      this.setState({
        profile_info: data,
        photo_url: data.agent_photo_url,
        first_name: data.agent_first_name,
        last_name: data.agent_last_name,
        agent_title: data.agent_title,
        email_adress: data.agent_email,
        cell_number: data.agent_cellphone,
        broker_name: data.agent_office_name,
      });
      Constants.first_name = data.agent_first_name;
      Constants.last_name = data.agent_last_name;
      Constants.agent_title = data.agent_title;
      Constants.email_adress = data.agent_email;
      Constants.cell_number = data.agent_cellphone;
      Constants.broker_name = data.agent_office_name;
    }
  }
  async handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // alert(Constants.user_mail);
    this.LoadProfile();
    this.props.navigation.setParams({ logout: this._saveprofile });
    // alert(data);
    // this.setState({
    //   profile_info: JSON.parse(AuthService.profile_login(Constants.user_mail, Constants.user_password)[0]),
    // })
  }

  componentWillUnmount() { }

  _saveprofile() {
    this.setState({ set_flag: true });
    this.setState({ spinner: true });
    Constants.updateFlag = 1;
    this.props.update_profile(
      Constants.first_name,
      Constants.last_name,
      Constants.cell_number,
      Constants.broker_name,
      Constants.agent_title,
    );
  }

  async  requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.INTERNET,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.changePhoto();
      } else {
        alert(granted);
      }
    } catch (err) {
      alert(err);
    }
  }

  changePhoto = () => {
    var options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options,response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
        // alert('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
        alert(response.customButton);
      } else {
        this.setState({ spinner: true });
        this.setState({ filePath:response.uri});
        let filename = this.state.profile_info.account_num + '.jpg';
        var data = new FormData();
        data.append('filetoupload', {
          uri: response.uri,
          name: filename,
          type: 'image/jpeg',
        });
        let Url = `${Constants.accounturl}/imageupload.php`;
        data.append('objectid', this.state.profile_info.account_num);
        data.append('phototype', 'a');
        fetch(Url, {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data', },
          body: data,
        })
          .then(res => {
            this.setState({ spinner: false });
            this.LoadProfile();
          })
          .done();
      }
    });
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    // alert(this.state.profile_info);

    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Profile Information'}
          textStyle={styles.spinnerTextStyle}
        />
        {!this.state.flag && (
          <TouchableOpacity
            style={styles.Img_position}
            onPress={() => this.requestCameraPermission()}>
              
            <Avatar
              containerStyle={{ borderColor: '#808080', borderWidth: 0.2 }}
              size={75} rounded source={{ uri: `${this.state.photo_url}?${new Date()}` }} />
          </TouchableOpacity>
        )}
        {this.state.flag && (
          <TouchableOpacity
            style={styles.Img_position}
            onPress={() => this.requestCameraPermission()}>
            <Avatar
              containerStyle={{ borderColor: '#808080', borderWidth: 0.2}}
              size={75} rounded 
              source={Images.avataricon}/>
          </TouchableOpacity>
        )}
        <Text style={styles.field_txt}>First Name</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.first_name}
          onChangeText={first_name => {
            this.setState({ first_name });
            Constants.first_name = first_name;
          }}></TextInput>
        <Text style={styles.field_txt}>Last Name</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.last_name}
          onChangeText={last_name => {
            this.setState({ last_name });
            Constants.last_name = last_name;
          }}></TextInput>
        <Text style={styles.field_txt}>Title</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.agent_title}
          onChangeText={agent_title => {
            this.setState({ agent_title });
            Constants.agent_title = agent_title;
          }}></TextInput>
        <Text style={styles.field_txt}>Email Address</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.email_adress}
          onChangeText={email_adress => {
            this.setState({ email_adress });
            Constants.email_adress = email_adress;
          }}></TextInput>
        <Text style={styles.field_txt}>Cellphone Number</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.cell_number}
          onChangeText={cell_number => {
            this.setState({ cell_number });
            Constants.cell_number = cell_number;
          }}></TextInput>
        <Text style={styles.field_txt}>Office or Brokers Name</Text>
        <TextInput style={{ borderBottomWidth: 0.5, borderBottomColor: 'black', fontSize: 14, height: 50, width: '95%', alignSelf: 'center', marginBottom: 1, }}
          value={this.state.broker_name}
          onChangeText={broker_name => {
            this.setState({ broker_name });
            Constants.broker_name = broker_name;
          }}></TextInput>
      </View>
    );
  }
}

const styles = {
  field_txt: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    width: '94%',
    alignSelf: 'center',
    color: 'red',
  },
  Img_position: {
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      update_profile: Actions.updateprofile,
      profile_login: Actions.profile_login,
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
)(ProfileScreen);
