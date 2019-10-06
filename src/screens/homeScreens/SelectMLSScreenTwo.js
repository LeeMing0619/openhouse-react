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
class SelectMLSScreenTwo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select MLS Organization',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: 70,
      },

    };
  };

  constructor(props) {
    super(props);
    this.state = {
      datasource: [],
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidUpdate(prevProps, prevState) {

  }

  async handleBackButton() {
    return true;
  }
  componentDidMount() {
    let mlsserchdata = Constants.MlsData;
    this.setState({ datasource: mlsserchdata });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }

  componentWillUnmount() { }

  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  itemClick(item) {
    Constants.mlsSelectedItem = item;
    Constants.mlsOrganize = item.mls_organization_name;
    this.props.navigation.navigate('selectmls')
  }
  _renderTextItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick(item)}>
        <View style={styles.itemview}>
          <Text
            style={{
              color: '#3294fe',
              height: 40,
              padding: 5,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {item.mls_organization_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    this.setState({ modalmlsdata: Constants.MlsData });
  };
  changesearch = (searchText) => {
    let leadattendees = [];
    let res = [];
    leadattendees = Constants.MlsData;

    if (!searchText || searchText === '') {
      res = leadattendees;
    } else if (leadattendees && leadattendees.length) {
      res = leadattendees.filter(
        item =>
          item.mls_organization_name.toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1,
      );
    }
    this.setState({ modalmlsdata: res });
  };
  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <SearchBar
          // round={true}
          lightTheme={true}
          placeholder="Search..."
          platform={Platform.OS}
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.searchbartxt}
          onCancel={this.clearsearch}
          onClear={this.clearsearch}
          autoCorrect={false}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        <FlatList
          style={{ flex: 1, marginTop: 20, }}
          data={this.state.datasource}
          numColumns={1}
          renderItem={this._renderTextItem}
        />
      </View>
    );
  }
}

const styles = {
  spinnerTextStyle: {
    color: '#FFF',
  },
  searchbar: {
    backgroundColor: '#F4F4F4',

  },
  searchbartxt: {
    backgroundColor: 'white',
    // borderColor:'#808080',
    // borderWidth:0.5,
    // borderRadius:3,
  },
  itemview: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: '#808080',
    borderBottomWidth: 0.5,
    marginBottom: 1,
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center'
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
)(SelectMLSScreenTwo);
