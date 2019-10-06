import React, { Component } from 'react';
import {
  View, Dimensions, StyleSheet, TouchableOpacity, Image, Text, Alert,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Images, Fonts, Constants } from '@commons';
import {
  PropertyScreenPad,
  DashboardScreenPad,
  EventScreenPad, LeadManagementPad,
  OpenHouseScreenPad,
  MyBoardScreenPad,
  ProfileScreenPad,
  MortgageScreenPad,
  Detail_AttendeeScreenPad,
  Detail_BrokerScreenPad,
  PDFViewScreenPad,
  CreatePropertyScreenPad,
  PropertyViewAttendeesScreenPad,
  CreateEventScreenPad,
  EventViewAttendeesScreenPad,
  SelectMLSScreenPad,BackHandler,
} from '../../screens';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../../store/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatList } from 'react-native-gesture-handler';
import Orientation from "react-native-orientation"
class ContainerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      title: 'Properties',
      status: 0,
      viewsplitstatus: false,
      loadingtxt: '',
      leftheader: false,
      rightheader: false,
      dashboardstatus: 0,
      propertydat: '',
      attendeData: '',
      brokerData: '',
      attendeurl: '',
    }
    Orientation.lockToLandscape();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
      this.props.dashboard.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (this.props.dashboard.status === 100 && !this.state.spinner) {
      this.setState({ spinner: true });
    }
    if (this.props.dashboard.status === 210 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Lead Management' })
    }
    if (this.props.dashboard.status === 220 &&
      prevProps.dashboard.status !== 220) {
      this.setState({ title: 'Manage Question' })
    }
    if (this.props.dashboard.status === 230 &&
      prevProps.dashboard.status === 100) {
      Constants.loadLMSflag = 1;
      this.setState({ title: 'Linked MLS Accounts' })
    }
    if (this.props.dashboard.status === 240 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Events' })
    }
    if (this.props.dashboard.status === 260 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Select Partner' })
    }
    if (this.props.dashboard.status === 280) {
      this.refs.modalProfile.open();
    }
    if (
      this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
      this.props.dashboard.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (this.props.dashboard.status === 200 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Properties' })
    }
    if (
      this.props.dashboard.status >= 200 &&
      prevProps.dashboard.status === 100 &&
      this.state.spinner
    ) {
      this.setState({ spinner: false });
    }
    if (this.props.ipad.dashboardstatus === 707 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startOpenHouseOneScreen');
    }
    if (this.props.ipad.dashboardstatus === 708 && prevProps.ipad.dashboardstatus === 70) {
      this.setState({ viewsplitstatus: true })
      this.setState({ title: 'Buyer' })
      this.setState({ leftheader: true })
      this.setState({ rightheader: true })
    }
    if (this.props.ipad.dashboardstatus === 709 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.modalProfile.close();
    }

    if (this.props.ipad.dashboardstatus === 710 && prevProps.ipad.dashboardstatus === 70) {
      this.setState({ viewsplitstatus: true })
      this.setState({ title: this.props.ipad.data.agent_fullname })
      this.setState({ leftheader: true })
      this.setState({ rightheader: true })
    }
    if (this.props.ipad.dashboardstatus === 711 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 200) {
      this.refs.addProperty.open();
    }
    if (this.props.ipad.dashboardstatus === 712 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 200) {
      this.refs.addProperty.close();
    }
    if (this.props.ipad.dashboardstatus === 713 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 200) {
      this.setState({ propertydata: this.props.ipad.propertydata });
      this.setState({ attendeData: this.props.ipad.attendeData });
      this.setState({ brokerData: this.props.ipad.brokerData })
      this.setState({ dashboardstatus: 6 });
      this.setState({ leftheader: true });
      this.setState({ rightheader: true });
    }
    if (this.props.ipad.dashboardstatus === 714 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 240) {
      this.refs.addEvent.open();
    }
    if (this.props.ipad.dashboardstatus === 716 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 240) {
      this.setState({ dashboardstatus: 7 });
      this.setState({ leftheader: true })
      this.setState({ rightheader: true })
    }
    if (this.props.ipad.dashboardstatus === 715 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 240) {
      this.refs.addEvent.close();
    }
    if (this.props.ipad.dashboardstatus === 716 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 230) {
      this.setState({ dashboardstatus: 8 });
    }
    if (this.props.ipad.dashboardstatus === 717 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startOpenHouseOneScreen');
    }
    if (this.props.ipad.dashboardstatus === 718 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startEventScreen');
    }
    if (this.props.ipad.dashboardstatus === 719 && prevProps.ipad.dashboardstatus === 70) {
      this.props.myboard();
      this.setState({ title: 'Linked MLS Accounts' })
      this.setState({ dashboardstatus: 4 });
    }
    if (this.props.ipad.dashboardstatus >= 700 && this.props.ipad.dashboardstatus <= 705 && prevProps.ipad.dashboardstatus === 70) {
      if (this.props.ipad.dashboardstatus === 702) { this.setState({ rightheader: true }); this.setState({ leftheader: false }) }
      else { this.setState({ rightheader: false }); this.setState({ leftheader: false }) }
      this.setState({ dashboardstatus: this.props.ipad.dashboardstatus - 700 });
    }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    switch (this.props.dashboard.status) {
      case 200:
        this.setState({ title: 'Properties' })
        this.setState({ dashboardstatus: 0 });
        break;
      case 210:
        this.setState({ title: 'Lead Management' })
        this.setState({ dashboardstatus: 2 });
        break;
      case 220:
        this.setState({ title: 'Manage Question' })
        this.setState({ dashboardstatus: 3 });
        break;
      case 230:
        this.setState({ title: 'Linked MLS Accounts' })
        this.setState({ dashboardstatus: 4 });
        break;
      case 240:
        this.setState({ title: 'Events' })
        this.setState({ dashboardstatus: 1 });
        break;
      case 250:
        this.setState({ title: 'Properties' })
        this.setState({ dashboardstatus: 0 });
        break;
      case 260:
        this.setState({ title: 'Select Partner' })
        this.setState({ dashboardstatus: 5 });
        break;

      default:
        break;
    }
  }
  detailView = () => {
    switch (this.state.dashboardstatus) {
      case 0:
        return (
          <PropertyScreenPad></PropertyScreenPad>
        )
        break;
      case 1:
        return (
          <EventScreenPad></EventScreenPad>
        )
        break;
      case 2:
        return (
          <LeadManagementPad></LeadManagementPad>
        )
        break;
      case 3:
        return (
          <OpenHouseScreenPad></OpenHouseScreenPad>
        )
        break;
      case 4:
        return (
          <MyBoardScreenPad></MyBoardScreenPad>
        )
        break;
      case 5:
        return (
          <MortgageScreenPad></MortgageScreenPad>
        )
        break;
      case 6:
        return (
          <PropertyViewAttendeesScreenPad></PropertyViewAttendeesScreenPad>
        )
        break;
      case 7:
        return (
          <EventViewAttendeesScreenPad></EventViewAttendeesScreenPad>
        )
        break;
      case 8:
        return (
          <SelectMLSScreenPad></SelectMLSScreenPad>
        )
        break;
      default:
        return (
          <PropertyScreenPad></PropertyScreenPad>
        )
        break;
    }
  }
  part2 = () => {
    if (!this.state.viewsplitstatus) {
      return (
        <View style={{ flex: 2 }}>
          {this.detailView()}
        </View>
      )
    } else {
      if (this.props.ipad.dashboardstatus === 710) {
        return (
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <Detail_BrokerScreenPad></Detail_BrokerScreenPad>
          </View>
        )
      } else if (this.props.ipad.dashboardstatus === 708) {
        return (
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Detail_AttendeeScreenPad></Detail_AttendeeScreenPad>
            </View>
            {(this.props.ipad.data.pdf_url !== undefined) && <View style={{ flex: 1 }}>
              <PDFViewScreenPad></PDFViewScreenPad>
            </View>}
          </View>
        )
      } else {
        return (
          <View style={{ flex: 2 }}>
            {this.detailView()}
          </View>
        )
      }
    }
  }
  Export = () => {
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 713) {
      this.props.dashboardstatuschange(21);
    }
    if (this.props.ipad.dashboardstatus === 702 && this.props.dashboard.status === 210) {
      this.props.dashboardstatuschange(20);
    }
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 708) {
      this.props.dashboardstatuschange(22);
    }
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 710) {
      this.props.dashboardstatuschange(23);
    }
    if (this.props.dashboard.status === 210 && this.props.ipad.dashboardstatus === 708) {
      this.props.dashboardstatuschange(22);
    }
    if (this.props.dashboard.status === 210 && this.props.ipad.dashboardstatus === 710) {
      this.props.dashboardstatuschange(23);
    }
  }
  Back = () => {
    if (this.props.dashboard.status === 240 && this.props.ipad.dashboardstatus === 716) {
      this.setState({ dashboardstatus: 1 })
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
    }
    if (this.props.dashboard.status === 200 && (this.props.ipad.dashboardstatus === 708 || this.props.ipad.dashboardstatus === 710)) {
      this.setState({ dashboardstatus: 0 })
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
      // this.props.dashboardstatuschange(13,{propertydata:this.state.propertydata,attendeData:this.state.attendeData, brokerData:this.state.brokerData});
    }
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 713) {
      this.setState({ dashboardstatus: 0 })
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
    }
    if (this.props.dashboard.status === 210 && (this.props.ipad.dashboardstatus === 708 || this.props.ipad.dashboardstatus === 710)) {
      this.props.dashboardstatuschange(2);
    }
  }
  _onLayout = event => {
    Orientation.lockToLandscapeLeft();
  }
  logout = () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      { text: 'NO' },
      { text: 'YES', onPress: this.logouthandle },
    ]);
  };
  logouthandle = () => {
    this.props.logout();
    if (Constants.device_Pad) {
      this.props.navigation.navigate('signinScreenPad');
    } else {
      this.props.navigation.navigate('signinScreen');
    }

  };
  render() {
    return (
      <View style={{ flex: 1, }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.NavBar}>
          <TouchableOpacity
            style={{ margin: 25, height: 40, width: 40, }}
            onPress={() => this.logout()}
          >
            <Image
              source={Images.logout}
              imageStyle={{ width: 30, height: 30 }}
              style={{ width: 30, height: 30, }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}><Text
              style={{
                fontSize: 26,
                fontWeight: 'bold',
                padding: 15,
                paddingRight: 0,
              }}>
              Open
            </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 10,
                  fontWeight: 'bold'
                }}>
                TM
            </Text></View>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>
              <View
                style={{
                  width: 50,
                  marginLeft: 15,
                  justifyContent: 'center',
                }}>
                {this.state.leftheader && <TouchableOpacity onPress={() => this.Back()}>
                  <Image
                    source={Images.backicon}
                    imageStyle={{ width: 40, height: 40 }}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>}
              </View>
              <Text style={{ fontSize: 30, padding: 15, fontWeight: 'bold', }}>{this.state.title}</Text>
              <View style={{
                width: 50,
                marginRight: 20,
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => this.Export()}>
                  {this.state.rightheader && <Image
                    source={Images.ic_upload}
                    imageStyle={{ width: 40, height: 40 }}
                    style={{ width: 40, height: 40 }}
                  />}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <DashboardScreenPad></DashboardScreenPad>
          </View>
          {this.part2()}
        </View>
        <Modal
          style={{ height: '70%', width: '50%' }}
          position={'center'}
          ref={'modalProfile'}>
          <ProfileScreenPad></ProfileScreenPad>
        </Modal>
        <Modal
          style={{ height: '70%', width: '50%' }}
          position={'center'}
          ref={'addProperty'}>
          <CreatePropertyScreenPad></CreatePropertyScreenPad>
        </Modal>
        <Modal
          style={{ height: '60%', width: '50%' }}
          position={'center'}
          ref={'addEvent'}>
          <CreateEventScreenPad></CreateEventScreenPad>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  NavBar: {
    flexDirection: 'row',
    height: 80,
    borderColor: 'white',
    backgroundColor: '#f6f6f6f6',
    borderBottomColor: 'gray',
    borderWidth: 2,
  },
  spinnerTextStyle: {
    color: 'white',
    fontSize: 36,
  },
  txtrow: {
    marginTop: 10,
  },
})
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      dashboardstatuschange: Actions.dashboardstatuschange,
      myboard: Actions.myboard,
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
)(ContainerScreen);


