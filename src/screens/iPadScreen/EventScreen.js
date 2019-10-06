import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Moment from 'moment';
import FastImage from 'react-native-fast-image'
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
import { SearchBar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
const _keyExtractor = item => item.uniqueid;

class EventScreen extends Component {

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
      checkActive: false,
      selecteditem: null,
      selectedAttendeData: null,
      dashboard:
        this.props.dashboard && this.props.dashboard.events
          ? this.props.dashboard.events
          : [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      Constants.eventData = this.props.login.downloadeventattend;
    }

    if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      if (Constants.uploadPhotoFlag === 1) {
        Constants.uploadPhotoFlag = 0;
        this.setState({ dashboard: this.props.login.downloadevent });
        this.setState({ spinner: false });
      }
    }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.props.authdownloadEventAttend();
  }
  componentWillUnmount() { }

  
  addproperty = () => {
    this.props.dashboardstatuschange(14);
  };
  checkActive(event_datestr) {
    var now_date = new Date();
    var event_date = Moment(event_datestr).format('YYYY-MM-DD');
    var new_event = new Date(event_date);
    // alert(now_date);
    if (now_date < new_event) {
      return 'A';
    } else {
      return 'I';
    }
  }
  convertStringtoDate(event_datestr) {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var std_date = Moment(event_datestr).format('YYYY-MM-DD');
    var d = new Date(std_date);
    var dayName = days[d.getDay()];
    var event_date = Moment(event_datestr).format('MMMM DD, YYYY');
    return dayName + ', ' + event_date;
  }
  _renderItem = ({ item }) => {


    if (item === 0) {
      return (
        <View style={[styles.itemcontainer, { boderColor: '#808080', boderWidth: 0.5, borderStyle: 'solid' }]}>
          <View style={[styles.itmeimgcontainer, { justifyContent: 'center' }]} opacity={0.95}>
            <Text style={{ fontSize: 28, alignSelf: 'center' }}>
              Add Event
              </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => this.addproperty()}>
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
        <View style={styles.itemcontainer}>
          <View style={{
            flex: 1, height: 30,
            backgroundColor: 'white',
            flexDirection: 'row',
            borderColor: '#808080',
            borderWidth: 0.5,
          }}>
            <View style={{ flex: 4 }}>
              <Text style={{ fontSize: 18, padding: 5 }}>
                tytrrtwe
              </Text>
            </View>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.itemClick(item)}>
              <Image
                style={{ width: '100%', height: '100%' }}
                imageStyle={{ width: '100%', height: '100%' }}
                source={Images.more_menue}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 6 }}>
            <FastImage
              style={styles.itemview}
              imageStyle={{width:'100%',height:'100%'}}
              source={{ uri: item.event_photo_url }}
            />
          </View>
          <View style={[{ flex: 2 }, styles.itmeimgcontainer]} opacity={1}>
            {this.checkActive(item.event_date) === 'A' ? (
              <Text style={{ color: 'white', fontSize: 14 }}>Active</Text>
            ) : (
                <Text style={{ color: 'red', fontSize: 14 }}>Inactive</Text>
              )}
            <Text style={styles.itemtxt}>{item.event_name}</Text>

            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt2}>
                {this.convertStringtoDate(item.event_date)}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  showDialog = status => {
    this.setState({ isDialogVisible: status });
  };

  itemClick = item => {
    this.setState({ selecteditem: item });
    this.refs.modal3.open();
    if (this.checkActive(item.event_date) === 'A') {
      this.setState({ checkActive: true });
      var eventAttendeData = [];
      for (data in Constants.eventData) {
        let each_Data = Constants.eventData[data];
        if (each_Data.event_id === item.event_id) {
          eventAttendeData.push(each_Data);
        }
      }
      if (eventAttendeData.length > 0) {
        this.setState({ checkmanage: true });
        this.setState({ selectedAttendeData: eventAttendeData });
      } else {
        this.setState({ checkmanage: false });
      }
    } else {
      this.setState({ checkActive: false });
    }
  };
  chooseFile = () => {
    this.refs.modal3.close();
    var options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('error1');
      } else if (response.customButton) {
        alert('error2');
      } else {
        this.setState({ spinner: true });
        let source = { uri: response.uri };
        this.setState({
          filePath: source,
        });
        // alert(source.uri);
        let filename = this.state.selecteditem.event_id + '.jpg';
        let body = new FormData();
        body.append('filetoupload', {
          uri:
            Platform.OS === 'android'
              ? source.uri
              : source.uri.replace('file://', ''),
          name: filename,
          type: 'image/jpg',
        });
        let Url = `${Constants.accounturl}/imageupload.php`;
        body.append('objectid', this.state.selecteditem.event_id);
        body.append('phototype', 'e');

        fetch(Url, {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: body,
        })
          .then(res => {
            Constants.uploadPhotoFlag = 1;
            this.setState({ dashboard: null });
            this.props.authdownloadEvent();
          })
          .done();
      }
    });
  };
  gonext = txt => {
    if (txt) {
      this.props.getbrokersname(txt);
    } else {
      Alert.alert('You must enter/select a title to continue', '');
    }
  };
  Change_ModalStyle = flag_style => {
    if (flag_style) {
      //   alert('styletest');
      return styles.modal4;
    } else {
      return styles.modal2;
    }
  };
  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let events =
      this.props.dashboard && this.props.dashboard.events
        ? this.props.dashboard.events
        : [];
    this.setState({ dashboard: events });
  };
  changesearch = (searchText) => {
    let events =
      this.props.dashboard && this.props.dashboard.events
        ? this.props.dashboard.events
        : [];
    let res = [];

    if (!searchText || searchText === '') {
      res = events;
    } else if (events && events.length) {
      res = events.filter(
        item =>
          item.event_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
      );
    }
    this.setState({ dashboard: res });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  viewevent = () => {
    this.props.dashboardstatuschange(16,{eventdata: this.state.selecteditem,
      attendeData: this.state.selectedAttendeData});
  };
  cancelmodal = () => {
    this.refs.modal3.close();
  };
  starEvent = () => {
    this.refs.modal3.close();
    this.props.dashboardstatuschange(18,{logo: this.state.selecteditem,});
  };
  uploadphoto = () => {
    this.refs.modal3.close();
    this.refs.modal2.open();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Photo'}
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
          data={[0, ...this.state.dashboard.sort(
            (a, b) => a.event_date < b.event_date,
          )]}
          numColumns={3}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal
          style={[styles.modal, styles.modal2]}
          position={'center'}
          ref={'modal2'}>
          <View style={styles.modalview_head}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Select Image</Text>
          </View>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.handlehousetype(1)}>
            <Text>Choose image from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.handlehousetype(2)}>
            <Text>Take new photo from camera</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          style={this.Change_ModalStyle(this.state.checkActive)}
          position={'bottom'}
          ref={'modal3'}>
          {this.state.checkActive && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.starEvent()}>
              <View style={styles.modalimgviewcontainer}>
                <Image
                  style={styles.modalimg}
                  imageStyle={styles.mdoalimgsty}
                  source={Images.start_openhouse}
                />
              </View>
              <View style={styles.modaltxtview}>
                <Text style={styles.modaltxt}>Start Event</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.viewevent()}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.share_property}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>View Event Attendees</Text>
            </View>
          </TouchableOpacity>
          {this.state.checkActive && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.chooseFile()}>
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
          )}
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.cancelmodal()}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.cancel}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Close</Text>
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
    backgroundColor: '#808080',
    width: Dimensions.get('window').width / 4.5 * 0.96,
    height: Dimensions.get('window').width / 4.5 * 0.6 + 130,
    marginLeft: Dimensions.get('window').width / 4.5 * 0.02,
    marginRight: Dimensions.get('window').width / 4.5 * 0.02,
    margin: 5,
  },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  itemtxtview: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 14,
    color: 'black',
  },
  itemtxt2: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: 'white',
    height: Dimensions.get('window').height*0.11,
    position: 'relative',
    padding: 5,
    borderWidth: 0.5,
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
  modal1: {
    height: 60,
    width: '100%',
    borderRadius: 5,
  },
  modal2: {
    height: 120,
    width: '100%',
    borderRadius: 5,
    // backgroundColor: "#3B5998"
  },

  modal3: {
    height: 180,
    width: '100%',
    bottom: 10,
    borderRadius: 5,
  },
  modal4: {
    height: 240,
    width: '100%',
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
  modalview_head: {
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalimg: {
    width: 40,
    height: 40,
  },
  mdoalimgsty: {
    width: 30,
    height: 30,
    marginLeft: 20,
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
    marginLeft: 20,
    width: '80%',
    borderBottomWidth: 0.2,
    borderBottomColor: '#D4D4D4',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange:Actions.dashboardstatuschange,
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      authdownloadEventAttend: Actions.authdownloadEventAttend,
      authdownloadEvent: Actions.authdownloadEvent,
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
)(EventScreen);
