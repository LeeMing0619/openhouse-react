import React, { Component } from 'react';
import { Avatar, Text, Image } from 'react-native-elements';
import { View } from 'native-base';
import { Linking, TouchableOpacity, BackHandler, PermissionsAndroid, Platform, } from 'react-native';
import { Images, Constants, } from '@commons';
import { Button } from 'native-base';
import Moment from 'moment';
import email from 'react-native-email';
import Share from 'react-native-share';
import Orientation from 'react-native-orientation'
import { TextInput, } from 'react-native-gesture-handler';
// import {NODATA} from 'dns';
import RNFetchBlob from 'rn-fetch-blob';
class Detail_AttendeeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Buyer',
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
          onPress={navigation.getParam('handelMail')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Image
            source={Images.ic_upload}
            imageStyle={{ width: 28, height: 28 }}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      ),
      // headerLeft: (
      //   <TouchableOpacity
      //     style={{
      //       marginLeft: 15,
      //       flex: 1,
      //       alignSelf: 'center',
      //       justifyContent: 'center',
      //     }}
      //     onPress={() => navigation.goBack()}>
      //     <Image
      //       source={Images.backicon}
      //       imageStyle={{ width: 25, height: 25 }}
      //       style={{ width: 25, height: 25 }}
      //     />
      //   </TouchableOpacity>
      // ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      txtItem: this.props.navigation.state.params.buyer_data,
      filePath: '',
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }

  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
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
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.setParams({ handelMail: this._handelMail });
  }

  _handelMail = () => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'Great ! Download Success ! :O ',
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/attendee.pdf`,
        description: 'A PDFfile',
        mime: 'application/pdf',
        // Make the file scannable by media scanner
        mediaScannable: true
      }
    }).fetch('GET', this.state.txtItem.attendee_pdf_url)
      .then((res) => {
        this.setState({ filePath: 'file://'+res.path() })
        this._handelMail1();
      })
  };

  _handelMail1= () => {
    let options = {
      type: 'application/pdf',
      url: 'file://' + this.state.filePath,// 
      social: Share.Social.EMAIL,
      email: Constants.user_mail,
    }
    Share.open(options);
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
        <View style={{ flex: 9 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 5,
              }}>
              <Avatar
                rounded
                source={Images.avataricon}
                size="medium"
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            </View>
            <View
              style={{
                flex: 5,
              }}>
              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  {this.state.txtItem.attendee_first_name} {this.state.txtItem.attendee_last_name}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Email:</Text>
                <Text style={styles.txtnormal}>{this.state.txtItem.attendee_email}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Phone:</Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_telephone}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Visited:</Text>
                <Text style={styles.txtnormal}>{this.convertStringtoDate(this.state.txtItem.created_at)}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Add To Property Match?</Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_prospect_match} */}
                  {this.Return_Bool(this.state.txtItem.attendee_prospect_match)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do you Currently Own or Rent?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_own_or_rent} */}
                  {this.Return_Bool(this.state.txtItem.attendee_own_or_rent)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Received CMA?:</Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_receive_cma} */}
                  {this.Return_Bool(this.state.txtItem.attendee_receive_cma)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  How Soon Are You Looking to Buy?
                </Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_how_soon_looking_to_buy_or_rent}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Lead Source:</Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_hear_about_listing} :
                  {this.state.txtItem.attendee_how_hear_about_listing_answer}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Are You currently pre-quelified for a mortgage?
                </Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_are_you_prequalified}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  How good is your current credit?:
                </Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_how_good_is_your_credit}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do you currently have a Real Estate Attorney?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_have_real_estate_attorney} */}
                  {this.Return_Bool(this.state.txtItem.attendee_have_real_estate_attorney)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  How would you like to me follow up with you?
                </Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.attendee_follow_up_via}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Note</Text>
              </View>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={{
                  height: 100,
                  borderColor: 'black',
                  borderRadius: 10,
                  paddingLeft: 4,
                  width: '95%',
                  marginTop: 10,
                  borderWidth: 0.5,
                }}
                value={this.state.txtItem.attendee_notes}></TextInput>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginBottom: 40 }}>
          {this.state.txtItem.attendee_pdf_url && (
            <Button
              block style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('pdfViewScreen', { pdf_url: this.state.txtItem.attendee_pdf_url, firstname: this.state.txtItem.attendee_first_name, lastname: this.state.txtItem.attendee_last_name });
              }}>
              <Text style={styles.btntxt}>View Agency Disclosure Form</Text></Button>
          )}
        </View>
      </View>
    );
  }
}
const styles = {
  containertxt: {
    flexDirection: 'row',
    marginTop: 5,
  },
  txtbold: {
    fontSize: 11,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  txtnormal: {
    fontSize: 12,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',

  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
};
export default Detail_AttendeeScreen;
