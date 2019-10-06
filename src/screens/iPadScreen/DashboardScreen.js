import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,BackHandler,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import { Images,Constants } from '@commons';
import Spinner from 'react-native-loading-spinner-overlay';
import email from 'react-native-email';


import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
const _keyExtractor = item => item.name;
const screenHeight = Math.round(Dimensions.get('window').height);
const item_height = (screenHeight - 150) / 4;
class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      loadingtxt: '',
      isDialogVisible: false,
      newtitle: '',
      gridtype: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 200 &&prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(0);
  }
    if (this.props.dashboard.status === 240 &&prevProps.dashboard.status === 100) {
        this.props.dashboardstatuschange(1);
    }
    if (this.props.dashboard.status === 210 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(2);
    }
    if (this.props.dashboard.status === 220) {
      this.props.dashboardstatuschange(3);
    }
    if (this.props.dashboard.status === 230&&prevProps.dashboard.status === 100) {
      Constants.loadLMSflag = 1;
      this.props.dashboardstatuschange(4);
    }
    if (this.props.dashboard.status === 280) {
      this.props.dashboardstatuschange(6);
    }
    if (this.props.dashboard.status === 260 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(5);
    }
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);}
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemcontainer}
        onPress={() => this.godetail(item.img)}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              <Avatar
                rounded
                size={Dimensions.get('window').width/3*0.2}
                source={Images[item.img]}
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt}>{item.name}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };
  godetail = txt => {
    if (txt === 'property') {
      this.props.getproperties();
    }
    if (txt === 'event') {
      this.props.getevent();
    }
    if (txt === 'lead') {
      this.props.getlead();
    }
    if (txt === 'question') {
      this.props.getopenhouse();
    }
    if (txt === 'mls') {
      this.props.myboard();
    }
    if (txt === 'profile') {
      this.props.getprofile();
    }
    if (txt === 'mortgage') {
      this.props.getmortgage();
    }
    if (txt === 'support') {
      this.handleEmail();
    }
  };

  handleEmail = () => {
    const to = ['support@openhousemarketingsystem.com'];
    email(to, {
      cc: [Constants.user_mail], 
      subject: 'Open House Support',
      body: '',
    }).catch(console.error);
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: '#f6f6f6'}}>
          <Spinner
            visible={this.state.spinner}
            textContent={this.state.loadingtxt}
            textStyle={styles.spinnerTextStyle}
          />
          <FlatList
            data={
              this.props.login && this.props.login.homedata
                ? this.props.login.homedata
                : []
            }
            numColumns={2}
            keyExtractor={_keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#DFE0DF',
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
    width: '50%',
    height: item_height,
    justifyContent: 'center'
  },
  itemview: {
    flex: 1,
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
    borderColor: '#808080',
    alignItems: 'center',
    borderWidth: 0.2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    marginTop: 5,
  },
  itemimgview: {
    height:Dimensions.get('window').width/3*0.2,
    width: Dimensions.get('window').width/3*0.2,
    borderRadius:Dimensions.get('window').width/6*0.2,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  itemtxt: {
    textAlign: 'center',
    fontSize: 14,
  },
  itmeimgcontainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '90%',
  },
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange:Actions.dashboardstatuschange,
      getlead: Actions.getlead,
      getevent: Actions.getevent,
      event: Actions.getevent,
      getopenhouse: Actions.getOpenHouse,
      myboard: Actions.getMyboard,
      getprofile: Actions.getprofile,
      getmortgage: Actions.getmortgage,
      getproperties: Actions.getproperties,
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
  mapStateToProps,mapDispatchToProps,
)(DashboardScreen);
