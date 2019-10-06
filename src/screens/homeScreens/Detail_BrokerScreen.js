import React, {Component} from 'react';
import {Avatar, Text, Button} from 'react-native-elements';
import {View} from 'native-base';
import {Linking,BackHandler,} from 'react-native';
import Moment from 'moment';
import {Images,Constants} from '@commons';
import {TextInput} from 'react-native-gesture-handler';
// import {NODATA} from 'dns';
import Orientation from 'react-native-orientation'
class Detail_BrokerScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      title: params.buyer_data.agent_fullname,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,

        
        marginRight:70,
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
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
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
    }
  }
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
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
  render() {
    const txtItem = this.props.navigation.state.params.buyer_data;
    return (
      <View style={{flex: 1}} onLayout={this._onLayout}> 
        <View style={{flex: 9}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft:15,
              }}>
              <Avatar
                rounded
                source={Images.avataricon}
                size="large"
                overlayContainerStyle={{backgroundColor: '#ffffff'}}
                activeOpacity={0.7}
              />
            </View>
            <View
              style={{
                flex: 6,
              }}>
              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>{txtItem.agent_fullname}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Email:</Text>
                <Text style={styles.txtnormal}>{txtItem.agent_email}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Phone:</Text>
                <Text style={styles.txtnormal}>{txtItem.agent_telephone}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Visited:</Text>
                <Text style={styles.txtnormal}>{this.convertStringtoDate(txtItem.created_at)}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  What is The Best Selling Features Of This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {txtItem.bestsellingfeatures}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  In Your Opinion, The Listing price is...?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {txtItem.attendee_own_or_rent} */}
                  {txtItem.whatdoyouthinkaboutthelistingprice}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You have Any Potential Buyers For This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {txtItem.attendee_receive_cma} */}
                  {this.Return_Bool(txtItem.anysuggestions)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You Have Any Feedback About This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {txtItem.willreferproperty} */}
                  {this.Return_Bool(txtItem.willreferproperty)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You Want To Kept Informed?(Price Changes, OpenHouses, Etc)
                </Text>
                <Text style={styles.txtnormal}>
                  {this.Return_Bool(txtItem.keepinform)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  containertxt: {
    flexDirection: 'row',
    marginTop: 10,
  },
  txtbold: {
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  txtnormal: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 10,
  },
};
export default Detail_BrokerScreen;
