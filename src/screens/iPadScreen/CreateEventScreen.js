import React, { Component } from 'react';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import { CalendarPicker } from 'react-native-calendar-picker';
import { Images, Fonts, Constants } from '@commons';
import {
  StyleSheet,
  View,
  Text,
  Alert,BackHandler,
} from 'react-native';
import {Button} from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import { Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation'
import Spinner from 'react-native-loading-spinner-overlay';

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountnum:
        props.login.account && props.login.account.account_num
          ? props.login.account.account_num
          : '',
      eventName: '',
      eventDate: '',
      uniqueid: '',
      selectedFlag: 0,
      checkedFlag: 0,
    };
    
    this.CheckDate = this.CheckDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }
  _save = () => {
    const { eventName, eventDate, uniqueid, accountnum } = this.state;
    data = {
      accountnum: accountnum,
      uniqueid: uniqueid,
      eventdate: eventDate,
      eventname: eventName,
    }

    if (eventName === '') {
      Alert.alert('Please Enter Event Name');
    } else if (this.state.selectedFlag === 0) {
      Alert.alert('Please Select Event Date');
    } else if (this.state.checkedFlag === 0) {
      Alert.alert('Please Select Correct Event Date');
    }
    else {
      this.props.createevent(data);
    }
  };
  componentWillUnmount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 450) {

      this.props.navigation.navigate('event');
      Constants.eventflag = 0;


    }
  }
  CheckDate(day) {
    var selectday = day.year + "-" + day.month + "-" + day.day;
    // alert(selectday);
    var now_date = new Date();
    var now_datestr = Moment(now_date).format('YYYY-MM-DD');
    // alert(now_datestr);
    var new_event = new Date(now_datestr);
    //alert(now_date.getFullYear());
    // alert(now_date.getMonth() + 1);
    var now_month = now_date.getMonth() + 1;
    var now_day = new Date().getDate();


    // alert(now_day);
    if (day.year > new_event.getFullYear()) {
      this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
      alert('big');

    } else if (day.year === now_date.getFullYear()) {
      if (day.month > now_month) {
        // alert('big');
        this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
      } else if (day.month === now_month) {
        if (day.day > now_day) {
          // alert('big');
          this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
        } else if (day.day === now_day) {
          // alert('big');
          this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
        } else {
          // alert('low');
          this.setState({ checkedFlag: 0, selectedFlag: 1, eventDate: '' })
        }
      } else {
        // alert('low');
        this.setState({ checkedFlag: 0, selectedFlag: 1, eventDate: '' })
      }


    } else {
      // alert('low');
      this.setState({ checkedFlag: 0, selectedFlag: 1, eventDate: '' })
    }

  }
  onDateChange(date) {
    alert('select');
  }
  render() {
    return (
      <View style={{ flex: 1, borderWidth: 0.5, borderColor: '#808080', borderStyle: 'solid', margin: 20 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{ flex: 1 }}><Text style={{ fontSize: 34, alignSelf: 'center', marginTop:10,}}>Create Event</Text></View>
        <View style={[styles.container,{flex:8}]}>
          <View style={styles.txtrow}>
            <Item stackedLabel style={styles.txtviewitem}>
              <Label style={styles.txtlabel}>Event Name</Label>
              <Input
                value={this.state.eventName}
                style={styles.txtitem}
                placeholder='Event Namte'
                onChangeText={text => this.setState({ eventName: text })}
              />
            </Item>

            <Calendar
              // Calendar type (gregorian, jalaali). Default = gregorian
              type={'gregorian'}
              // Initially visible month. Default = Date()
              current={new Date()}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={'2012-01-01'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={'2999-12-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day, localDay) => {
                console.log('selected day', day, localDay)
                this.CheckDate(day);
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => { console.log('selected day', day) }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => { console.log('month changed', month) }}
              // Hide month navigation arrows. Default = false
              // hideArrows={true}
              // // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={(direction) => (<Arrow />)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={true}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon left. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
            />
          </View>
          <View style={{ flex: 2, flexDirection: 'row', marginTop: 5, }}>
            <Button block style={styles.btn} onPress={() => this._save()}>
              <Text style={[styles.btntxt]}>SAVE</Text>
            </Button>
            <Button block style={styles.btn} onPress={() => { this.props.dashboardstatuschange(15); }}>
              <Text style={[styles.btntxt]}>CANCEL</Text>
            </Button>
          </View>
        </View>
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
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtviewitem: {
    marginRight: 10,
    marginLeft: 10,
    padding: 0,
  },
  txtlabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  txtitem: {},
  pickeritem: {
    height: 50,
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    width:150,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange:Actions.dashboardstatuschange,
      createevent: Actions.createevent,
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
)(CreateEventScreen);
