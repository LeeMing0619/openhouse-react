import React, { Component } from 'react';
import { Avatar, Text, Button } from 'react-native-elements';
import { View } from 'native-base';
import { Linking } from 'react-native';
import { Images } from '@commons';
import { TextInput } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
// import {NODATA} from 'dns';
class Detail_BrokerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtItem: this.props.ipad.data,
    };
  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
    }
  }
  componentDidUpdate() {
    if (this.props.ipad.dashboardstatus === 723 && prevProps.ipad.dashboardstatus === 70) {
      this._handelMail();
    }
  }
  _handelMail = () => {
    const shareOptions = {
      title: 'Share via',
      email: Constants.user_mail,
      message: 'Disclosure Form',
      social: Share.Social.EMAIL
    };
    Share.shareSingle(shareOptions);
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
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
                <Text style={styles.txtbold}>{this.state.txtItem.agent_fullname}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Email:</Text>
                <Text style={styles.txtnormal}>{this.state.txtItem.agent_email}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Phone:</Text>
                <Text style={styles.txtnormal}>{this.state.txtItem.agent_telephone}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>Visited:</Text>
                <Text style={styles.txtnormal}>{this.state.txtItem.created_at}</Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  What is The Best Selling Features Of This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {this.state.txtItem.bestsellingfeatures}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  In Your Opinion, The Listing price is...?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_own_or_rent} */}
                  {this.state.txtItem.whatdoyouthinkaboutthelistingprice}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You have Any Potential Buyers For This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.attendee_receive_cma} */}
                  {this.Return_Bool(this.state.txtItem.anysuggestions)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You Have Any Feedback About This Property?
                </Text>
                <Text style={styles.txtnormal}>
                  {/* {this.state.txtItem.willreferproperty} */}
                  {this.Return_Bool(this.state.txtItem.willreferproperty)}
                </Text>
              </View>

              <View style={styles.containertxt}>
                <Text style={styles.txtbold}>
                  Do You Want To Kept Informed?(Price Changes, OpenHouses, Etc)
                </Text>
                <Text style={styles.txtnormal}>
                  {this.Return_Bool(this.state.txtItem.keepinform)}
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

function mapStateToProps({ login, dashboard, ipad }) {
  return {
    ipad: ipad,
    login: login,
    dashboard: dashboard,
  };
}
export default connect(
  mapStateToProps,
)(Detail_BrokerScreen);
