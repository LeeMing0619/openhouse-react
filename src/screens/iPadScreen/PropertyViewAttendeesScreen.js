import React, { Component } from 'react';
import { Avatar, Text, Image } from 'react-native-elements';
import { Linking, Dimensions, FlatList, View ,BackHandler,} from 'react-native';
import { Images } from '@commons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import { Button, Icon } from 'native-base';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class PropertyViewAttendeesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: null,
      flag_attend: false,
      flag_broker: true,
      attendeeData: this.props.ipad.data.attendeData,
      brokerData: this.props.ipad.data.brokerData,
      txtItem:this.props.ipad.data.propertydata,
    };
    this.attendees = this.attendees.bind(this);
    this.broker = this.broker.bind(this);
    this.ShowName = this.ShowName.bind(this);
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.state.attendeeData.sort(
      (a, b) => a.attendee_first_name > b.attendee_first_name,
    );
    this.setState({ datasource: this.state.attendeeData });
  }
  ShowName(item) {

    if (!this.state.flag_attend) {
      return item.attendee_first_name + ' ' + item.attendee_last_name;
    } else {
      return item.agent_fullname;
    }
  }
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

  exportCSVFile = () => {
    const values = this.state.attendeeData;
    const headerString =
      'First Name,Last Name,Agent Name,Agent PhoneNumber,PDF URL,Property Record Number\n';
    var rowstring = '';
    for (let i = 0; i < values.length; i++) {
      let data = values[i];
      let each_row =
        data.attendee_first_name +
        ',' +
        data.attendee_last_name +
        ',' +
        data.attendee_agent_fullname +
        ',' +
        data.attendee_telephone +
        ',' +
        data.attendee_pdf_url +
        ',' +
        data.property_record_num +
        '\n';
      rowstring = rowstring + each_row;
    }
    const csvString = `${headerString}${rowstring}`;
    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/property.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        let options = {
          type: 'text/csv',
          url: pathToWrite,
          social: Share.Social.EMAIL
        }
        Share.open(options);
      })
      .catch(error => console.error(error));
  };

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
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.state.flag_attend) {
            this.props.dashboardstatuschange(8,item);
          } else {
            this.props.dashboardstatuschange(10,item);
          }
        }}
        >
        <View style={styles.itemview_a}>
          <View style={styles.itmeimgcontainer_a}>
            <View style={styles.itemimgview_a}>
              <FastImage
                style={styles.itemimg_a}
                imageStyle={{width:'100%',height:'100%'}}
                source={Images.avataricon}
              />
            </View>
            <View style={styles.itemtxtview_a}>
              <Text style={styles.itemtxt_a}>{this.ShowName(item)}</Text>
              <Text style={styles.itemtxt2_a}>
                {this.convertStringtoDate(item.created_at)}
              </Text>
              {/* <Text style={styles.itemtxt2_a}>{item.name}</Text> */}
            </View>
            <View style={styles.details_show}>
              <Image
                style={styles.item_style}
                imageStyle={styles.img_style}
                source={Images.itemshowicon}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  Change_BtnStyle = flag_style => {
    if (!flag_style) {
      //   alert('styletest');
      return {
        width:'50%',
        height: 40,
        backgroundColor: '#39A2C1',
        borderRadius: 0,
        justifyContent: 'center',
        marginLeft: 0,
        // fontSize: 16,
        // textAlign: 'center',
        // color: '#ffffff',
      };
    } else {
      return {
        width:'50%',
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        marginRight: 0,
        justifyContent: 'center',
        // fontSize: 16,
        // textAlign: 'center',
        // color: '#39A2C1',
      };
    }
  };
  Change_TextStyle = flag_style => {
    if (!flag_style) {
      return styles.attendee_text;
    } else {
      return styles.broker_text;
    }
  };
  attendees() {
    this.setState({ flag_attend: false, flag_broker: true });

    this.setState({ datasource: null });
    this.state.attendeeData.sort(
      (a, b) => a.attendee_first_name > b.attendee_first_name,
    );
    this.setState({ datasource: this.state.attendeeData });

    // this.Change_BtnStyle(this.state.flag_attend);
    // alert(this.state.datasource.length);
  }

  broker() {
    this.setState({ flag_broker: false, flag_attend: true });
    this.setState({ datasource: null });
    this.state.brokerData.sort((a, b) => a.agent_fullname > b.agent_fullname);
    this.setState({ datasource: this.state.brokerData });
    // alert(this.state.datasource.length);
    // this.setState({data_source: this.state.dashboard.broker});

    // alert(this.state.flag_broker);
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
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderColor:'#808080', borderStyle:'solid',borderWidth:0.5}}>
        <View style={[styles.itemcontainer, { flex: 1 }]}>
          <FastImage
            style={styles.itemview}
            imageStyle={{width:'100%',height:'100%'}}
            source={{ uri: this.state.txtItem.property_photo_url }}
          />
          <View style={styles.itmeimgcontainer} opacity={0.8}>
              <Text style={[styles.itemtxt, { alignSelf: 'flex-start' }]}>
                $
                {this.state.txtItem.property_price.replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  '$1,',
                )}
              </Text>
              {this.state.txtItem.property_status === 'A' ? (
                <Text style={{ color: 'white', alignSelf: 'flex-end' }}>
                  Active
                </Text>
              ) : (
                  <Text style={{ color: 'red', alignSelf: 'flex-end' }}>
                    Inactive
                </Text>
                )}
              <Text style={styles.itemtxt2}>{this.state.txtItem.property_address}</Text>
              <Text style={styles.itemtxt2}>{this.state.txtItem.property_city}</Text>
              <Text style={styles.itemtxt2}>{this.state.txtItem.property_state}</Text>
          </View>
        </View>
        <View style={{flex:1}}>
          <View
            style={{
              flexDirection: 'row',
              width:'100%',
              borderColor: '#39A2C1',
              borderWidth: 0.5,
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            <Button
              style={this.Change_BtnStyle(this.state.flag_attend)}
              onPress={this.attendees}>
              <Text style={this.Change_TextStyle(this.state.flag_attend)}>
                Attendees
            </Text>
            </Button>
            <Button
              style={this.Change_BtnStyle(this.state.flag_broker)}
              onPress={this.broker}>
              <Text style={this.Change_TextStyle(this.state.flag_broker)}>
                Broker Open House
            </Text>
            </Button>
          </View>
          <View style={{ flex: 3 }}>
            <FlatList
              data={this.state.datasource}
              numColumns={1}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  itemcontainer: {
    width: Dimensions.get('window').width * 0.96 - 15,
    height: Dimensions.get('window').width * 0.6 - 15,
    marginLeft: 14,
    marginBottom: 5,
    marginTop: 5,
  },
  itmeimgcontainer_a: {
    // marginBottom: 10,
    // alignItems:'center',
    width: '90%',
    flexDirection: 'row',
  },
  itemview: {
    width: '100%',
    height: '50%',
    resizeMode: 'stretch',
  },
  itemview1: {
    width: '100%',
    height: '100%',
    borderColor: '#808080',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    margin: '10%',
  },
  itemtxtview_a: {
    width: '80%',
    // marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemimgview_a: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  itemimg_a: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemimg_aa: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderColor: '#808080',
    borderWidth: 0.5,
  },

  itemtxt_a: {
    // textAlign:'center',
    // fontWeight: 'bold',
    fontSize: 14,
  },
  item_style: {
    width: 20,
    height: 20,
  },
  img_style: {
    width: 20,
    height: 20,
  },
  itemtxt2_a: {
    fontSize: 14,
    marginTop: 4,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    position: 'relative',
    padding: 5,
    bottom: 0,
  },
  itemtxtview: {
    
    width: '98%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 22,
    color: 'black',
    padding:2,
  },
  itemtxt2: {
    padding:2,
    fontSize: 22,
    color: 'black',
  },
  details_show: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  itemview_a: {
    flex: 1,
    borderColor: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderBottomColor: '#808080',
    backgroundColor: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
  },
  attendee_btn: {
    width: '50%',
    height: 30,
    backgroundColor: '#39A2C1',
    borderRadius: 0,
    justifyContent: 'center',
  },
  attendee_text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  broker_btn: {
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    justifyContent: 'center',
  },
  broker_text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#39A2C1',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange:Actions.dashboardstatuschange
    },
    dispatch,
  );
}
function mapStateToProps({ login, dashboard, ipad }) {
  return {
    ipad: ipad,
    login: login,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertyViewAttendeesScreen);
