import React, { Component } from 'react';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import Orientation from 'react-native-orientation'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  Linking, BackHandler,
  PermissionsAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image'
// import {Button, Icon} from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
// import DialogInput from 'react-native-dialog-input';
import { SearchBar } from 'react-native-elements';
// import {ProgressCircle, CircleSnail} from '@components';
import Modal from 'react-native-modalbox';
import Share from 'react-native-share';
// import CacheImage from './CacheImage';
import CachedImage from 'react-native-image-cache-wrapper';
const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
}
import imageCacheHoc from 'react-native-image-cache-hoc';
const CacheableImage = imageCacheHoc(Image,{
  validProtocols: ['http', 'https'],
});
CacheableImage.flush()
  .then( flushResults => {
    console.log(flushResults);
    // All local filles created by 'react-native-image-cache-hoc' are now destroyed. 
    // They will be rebuilt by future <CacheableImage> renders.
  });
const _keyExtractor = item => item.uniqueid;
// const dirs = RNFetchBlob.fs.dirs;

// var RNFS = require('react-native-fs');
class PropertyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Properties',
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
          onPress={navigation.getParam('addproperty')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Image
            source={Images.createicon}
            imageStyle={{ width: 28, height: 28 }}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      ),
    };
  };

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
      selecteditem: null,
      selected_attendeData: null,
      selected_brokerData: null,
      dashboard:
        this.props.dashboard && this.props.dashboard.properties
          ? this.props.dashboard.properties
          : [],
      refresh:false,
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      //   alert(Constants.AttendeData);
    }
    if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
    }

    if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
        this.setState({ dashboard: this.props.login.downloadproperties });
        this.setState({ refresh: !this.state.refresh });
        this.setState({ spinner: false });
    }
    

  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.setParams({ addproperty: this._addproperty });
    this.props.authdownloadPropertyAttende();
    this.props.authdownloadPropertyBrokerAttende();
  }
  componentWillUnmount() { }
  _addproperty = () => {
    this.props.navigation.navigate('createPropertyScreen');
  };
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.itemClick(item)}
        style={styles.itemcontainer}>
        <FastImage 
          style={styles.itemview}
          imageStyle={{ width: '100%', height: '100%' }}
          //  uri = {item.property_photo_url}
         
          source={{ uri: `${item.property_photo_url}?${new Date()}`  }}
          // cacheControl ={FastImage.cacheControl.web} 
          // permanent={false}
        />
        <View style={styles.itmeimgcontainer} opacity={0.8}>
          <View style={styles.itemtxtview}>
            <Text style={[styles.itemtxt, { alignSelf: 'flex-start' }]}>
              ${item.property_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
            {item.property_status === 'A' ? (
              <Text style={{ color: 'white', fontSize: 14, alignSelf: 'flex-end' }}>
                Active
              </Text>
            ) : (
                <Text style={{ color: 'red', fontSize: 14, alignSelf: 'flex-end' }}>
                  Inactive
              </Text>
              )}
          </View>
          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt2}>
              {item.property_address}, {item.property_city},{' '}
              {item.property_state}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  showDialog = status => {
    this.setState({ isDialogVisible: status });
  };
  checkmanagestatus = _item => {
    // alert(_item.property_record_num);
    var item_Attendes = [];
    var item_Brokers = [];
    for (attende in Constants.AttendeData) {
      let each_attende = Constants.AttendeData[attende];
      if (each_attende.property_record_num === _item.property_record_num) {
        item_Attendes.push(each_attende);
      }
      //   if (attende.attendee_email === 'Dfgfd@gmail.com') {
      //     alert('same');
      //   }
    }
    for (broker in Constants.BrokerData) {
      let each_broker = Constants.BrokerData[broker];
      if (each_broker.property_record_num === _item.property_record_num) {
        item_Brokers.push(each_broker);
        // alert('same');
      }
    }

    if (item_Attendes.length > 0 || item_Brokers.length > 0) {
      this.setState({
        checkmanage: true,
        selected_attendeData: item_Attendes,
        selected_brokerData: item_Brokers,
      });
      //   selected_attendeData: null,
      //   selected_brokerData: null,
    } else {
      this.setState({ checkmanage: false });
    }
    // alert(this.state.checkmanage);
  };
  itemClick = item => {
    this.setState({ selecteditem: item });
    if (item.property_status === 'A') {
      this.refs.modal3.open();
      this.checkmanagestatus(item);
      this.props.setpropertyitem(item);
    } else {
      this.props.setpropertyitem(null);
    }
  };
  gonext = txt => {
    if (txt) {
      this.props.getbrokersname(txt);
    } else {
      Alert.alert('You must enter/select a title to continue', '');
    }
  };

  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let properties =
      this.props.dashboard && this.props.dashboard.properties
        ? this.props.dashboard.properties
        : [];
    this.setState({ dashboard: properties });
  };
  changesearch = (searchText) => {
    let properties =
      this.props.dashboard && this.props.dashboard.properties
        ? this.props.dashboard.properties
        : [];
    let res = [];

    if (!searchText || searchText === '') {
      res = [...properties];
    } else if (properties && properties.length) {
      res = properties.filter(
        item =>
          item.property_address
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1 ||
          item.property_city.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_state.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_zipcode
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1 ||
          item.property_price.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_mls_num
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1,
      );
    }
    this.setState({ dashboard: res });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  async  requestCameraPermission(options) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        alert('dda')
      }
    } catch (err) {
      alert(err);
    }
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
        this.goproperty(3);
      } else {
        alert(granted);
      }
    } catch (err) {
      alert(err);
    }
  }
  goproperty = id => {
    this.refs.modal3.close();
    if (id === 1) {
      //start open house
      this.refs.modal2.open();
    } else if (id === 2) {
      //share this property

      // Linking.canOpenURL(Constants.shareurl).then(supported => {
      //   if (supported) {
      //     Linking.openURL(Constants.shareurl);
      //   } else {
      //     console.log("Don't know how to open URI: " + Constants.shareurl);
      //   }
      // });

      const shareoptions = {

        url: this.state.selecteditem.property_share_url,

      }
      Share.open(shareoptions);

    } else if (id === 3) {
      this.refs.modal3.close();
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          // alert('User cancelled image picker');
        } else if (response.error) {
          alert(response.error + "ww");
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
         this.setState({ spinner: true });
          let source = { uri: Platform.OS === 'android'
          ? response.uri
          : response.uri.replace('file://', ''), };
          // alert(source.uri);
          this.setState({ filePath: source });
         
          let filename = this.state.selecteditem.uniqueid + '.jpg';
          let body = new FormData();
          body.append('filetoupload', {
            uri: source.uri,
            name: filename,
            type: 'image/jpeg',
          });
          let Url = `${Constants.accounturl}/imageupload.php`;
          body.append('objectid', this.state.selecteditem.uniqueid);
          body.append('phototype', 'p');
        //  alert(Url);
          fetch(Url, {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: body,
          })
            .then(res => {
              CacheableImage.flush();
                // let resdata = JSON.parse(res.json);
                // alert(resdata);
               // CachedImage.clearCache();
              this.setState({ dashboard: this.props.login.downloadproperties });
             this.props.authdownloadProperties();
              // alert(res.uploaded);
            })
            .done();
        }
      });
    } else if (id === 5) {
      //managethis.
      this.props.navigation.navigate('propertyViewAttendeesScreen', {
        propertydata: this.state.selecteditem,
        attendeData: this.state.selected_attendeData,
        brokerData: this.state.selected_brokerData,
      });
    } else if (id === 4) {
      //cancel
    }
  };
  handlehousetype = id => {
    let downloaddisclosure =
      this.props.login && this.props.login.downloaddisclosure.length
        ? this.props.login.downloaddisclosure
        : [];
    let getselproperty =
      this.props.dashboard && this.props.dashboard.selectedproperty
        ? this.props.dashboard.selectedproperty
        : null;
    if (id === 1) {
      if (
        getselproperty &&
        getselproperty !== null &&
        getselproperty.disclosure_form_required === 1
      ) {
        let flag = 0;
        if (downloaddisclosure.length > 0) {
          let disclosure = downloaddisclosure.filter(
            item =>
              item.property_type === getselproperty.property_type &&
              item.state === getselproperty.property_state,
          );
          if (disclosure.length > 0) {
            flag = 1;
          }
        }
        if (flag === 0) {
          Alert.alert(
            'Agency disclosure form has not been downloaded for this property',
            '',
          );
          return;
        }
      }
      let data = { data: getselproperty, type: 'public' };
      this.props.sethousehandletype(data);
      this.props.navigation.navigate('startOpenHouseOneScreen');
    } else if (id === 2) {
      let data = { data: getselproperty, type: 'broker' };
      this.props.sethousehandletype(data);
      this.props.navigation.navigate('startOpenHouseOneScreen');
    } else if (id === 3) {
    }
    this.refs.modal2.close();
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <SearchBar
          // round={true}
          lightTheme={true}
          placeholder="Search..."
          platform={Platform.OS}
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.searchbartxt}
          // showLoading={true}
          onCancel={this.clearsearch}
          onClear={this.clearsearch}
          autoCorrect={false}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        <FlatList
          data={this.state.dashboard.sort(
            (a, b) => a.property_status > b.property_status,
          )}
          numColumns={1}
          extraData={this.state.refresh}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal
          style={[styles.modal, styles.modal2]}
          position={'center'}
          ref={'modal2'}>
          <View style={styles.modalview_head}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>
              Choose Open House Type
            </Text>
            <Text style={{ fontSize: 12, alignSelf: 'center' }}>
              Is this a Broker or Public Open House?
            </Text>
          </View>
          {/* <View style={styles.modalview}>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>Is this a Broker or Public Open House?</Text>
                    </View> */}
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(1)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderbottomColor: 'black', paddingTop: 14, borderBottomWidth: 0.5, paddingBottom: 7, }}>Public</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(2)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderBottomColor: 'black', paddingTop: 14, borderBottomWidth: 0.5, paddingBottom: 7 }}>Broker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(3)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderBottomColor: 'white', paddingTop: 14, borderBottomWidth: 0.5, paddingBottom: 7 }}>Cancel</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          style={[
            styles.modal,
            this.state.checkmanage ? styles.modal4 : styles.modal3,
          ]}
          position={'bottom'}
          ref={'modal3'}>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(1)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.start_openhouse}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Start Open House</Text>
            </View>
          </TouchableOpacity>
          {this.state.checkmanage && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.goproperty(5)}>
              <View style={styles.modalimgviewcontainer}>
                <Image
                  style={styles.modalimg}
                  imageStyle={styles.mdoalimgsty}
                  source={Images.manage_attendees}
                />
              </View>
              <View style={styles.modaltxtview}>
                <Text style={styles.modaltxt}>View Property Attendees</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(2)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.share_property}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Share This Property</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.requestCameraPermission()}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.add_photo}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Upload New Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(4)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.cancel}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </Modal>
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
    fontSize: 18,
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
    marginLeft: 10,
    marginRight: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemcontainer: {
    width: Dimensions.get('window').width * 0.96,
    height: Dimensions.get('window').width * 0.6,
    marginLeft: Dimensions.get('window').width * 0.02,
    marginRight: Dimensions.get('window').width * 0.02,
    marginBottom: 5,
    marginTop: 5,
  },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    margin: '10%',
  },
  itemimgview: {
    height: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.1,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    marginTop: 15,
    backgroundColor: 'white',
  },
  itemtxtview: {
    width: '98%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 14,
    marginLeft: -2,
    color: 'white',
  },
  itemtxt2: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
    marginLeft: -2,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: '#808080',
    height: 70,
    position: 'absolute',
    padding: 5,
    bottom: 0,
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    backgroundColor: 'white',
  },
  modal: {
    // justifyContent: 'center',
    alignItems: 'center',
  },

  modal2: {
    width: '70%',
    // height:Dimensions.get('window').height*0.3,
    height: 220,
    borderRadius: 5,
    marginBottom: 20,
  },

  modal3: {
    height: 250,
    width: '96%',
    bottom: 10,
    borderRadius: 5,
  },
  modal4: {
    height: 300,
    width: '96%',
    bottom: 10,
    borderRadius: 5,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  modalview: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalview5: {
    width: '100%',
    flexDirection: 'row',
  },
  modalview_head: {
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalimg: {
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  mdoalimgsty: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  modaltxt: {
    paddingTop: 5,
    fontSize: 16,
    // textAlign:'center',
    justifyContent: 'center',
  },
  modalimgviewcontainer: {
    width: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modaltxtview: {
    width: '80%',
    marginLeft: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#D4D4D4',
  },
  modaltxtviewcancel: {
    width: '80%',
    marginLeft: 20,
    // borderBottomWidth: 0.2,
    // borderBottomColor: '#ffffff',

  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      authdownloadPropertyAttende: Actions.authdownloadPropertyAttende,
      authdownloadPropertyBrokerAttende:
        Actions.authdownloadPropertyBrokerAttende,
      authdownloadProperties: Actions.authdownloadProperties,
      uploadPhoto: Actions.UploadProperty,
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
)(PropertyScreen);
