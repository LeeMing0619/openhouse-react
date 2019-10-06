import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text, Image, Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput,Alert,ScrollView,BackHandler,
} from 'react-native';

import {Button, Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import {Images,Fonts,Constants} from '@commons';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

let focusid = 0;
class CreateAccountReviewScreen extends Component {

    static navigationOptions =({navigation})=> {
        return {
            title: 'Review Your Information',
            headerTitleStyle: { fontSize: 16,fontWeight:'bold',alignSelf:'center' ,
                textAlign:"center",
                flex:1 },
            headerRight:(
                <View/>
            )
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            email:Constants.create_useremailaddress,
            firstname:Constants.create_userfirstname,
            lastname:Constants.create_userlastname,
            cellphone:Constants.create_userephoneNumber,
            officename:Constants.officename,
            company_logo_url:Constants.logo_url,
            title:(props.createaccount.title)?props.createaccount.title:'',
            mls:(props.createaccount.orgitem !== null && props.createaccount.orgitem.mls_organization_name) ? props.createaccount.orgitem.mls_organization_name : '',
            mlsorganizationid:(props.createaccount.orgitem !== null && props.createaccount.orgitem.mls_organization_id) ? props.createaccount.orgitem.mls_organization_id : '',
            password:Constants.create_userpassword ,
            device: Platform.OS === 'android' ? 'ANDROID':'IOS',
            officetelephone:"",
            appid:'com.ecaptureinc.open',
            spinner:false,
            loadingtxt:'Creating Account',
            uniqueid:'',
        };
    }
    handleBackButton() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
        UUIDGenerator.getRandomUUID((uuid) => {
            this.setState({uniqueid:uuid});
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.createaccount.newaccountstatus >=200 && this.state.spinner === true){
            this.setState({spinner: false});
            if(this.props.createaccount.newaccountstatus === 200){
                Alert.alert(
                    'Please Login',
                    'Welcome to the Open House Marketing System',
                    [
                        {text: 'OK', onPress: this.gosiginscreen},
                    ],
                );

            }
            else if(this.props.createaccount.newaccountstatus === 500){
                Alert.alert(
                    'An account with this email address is already in our system.',
                    'Error Creating Account',
                )
            }
            else {
                Alert.alert(
                    'Unable to create an account at this time.',
                    'Application Error',
                )
            }
        }

    }
    gosiginscreen=()=>{
        Constants.create_userfirstname = '';
        Constants.create_userlastname = '';
        Constants.create_userephoneNumber = '';
        Constants.create_userpassword = '';
        Constants.create_useremailaddress = '';
        this.props.navigation.navigate('signinScreen');
    }

    gonext=()=>{
        const {firstname,lastname,cellphone,officetelephone,title,email,uniqueid,officename,password,company_logo_url,device,appid} = this.state;
        this.props.createnewaccount(Constants.create_userfirstname,Constants.create_userlastname,Constants.create_userephoneNumber,officetelephone,title,email,uniqueid,officename,password,company_logo_url,device,appid);
        this.setState({spinner:true});
    }

    render() {

        return (
            <View
                style={{flex:1,}}
            >
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.container}>
                    {/*<View style={styles.container}>*/}
                    <View style={styles.txtrow}>
                        <View style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>First Name</Label>
                            {/* <Input disabled  value={Constants.create_userfirstname} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{Constants.create_userfirstname}</Text>
                        </View>
                        <View  style={styles.txtviewitem} >
                            <Label style={styles.txtlabel}>Last Name</Label>
                            {/* <Input disabled  value={Constants.create_userlastname} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{Constants.create_userlastname}</Text>
                        </View>
                        <View  style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Title</Label>
                            {/* <Input disabled  value={this.state.title} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{this.state.title}</Text>
                        </View>
                        <View  style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Email</Label>
                            {/* <Input disabled  value={Constants.create_useremailaddress} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{Constants.create_useremailaddress}</Text>
                        </View>
                        <View  style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Phone Number</Label>
                            {/* <Input disabled  value={Constants.create_userephoneNumber} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{Constants.create_userephoneNumber}</Text>
                        </View>
                        <View  style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Broker Name</Label>
                            {/* <Input disabled  value={this.state.officename} style={styles.txtitem}/> */}
                            <Text style={styles.txtitem}>{this.state.officename }</Text>
                        </View>
                      
                    </View>

                    <View style={styles.txtrow}>
                        <Button
                            block
                            style={styles.btn}
                            onPress = {()=>this.gonext()}
                        >
                            <Text style={styles.btntxt}>Confirm</Text>
                        </Button>
                    </View>
                    {/*</View>*/}
                </View>
            </View>
        );

    }
}

const styles = {
    container: {
        flex: 1,
    },
    txtinput:{
        height: 50,
        borderColor: '#CDCECD',
        borderRadius: 5,
        borderWidth: 0.2,
        backgroundColor:'white',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        fontWeight:'bold',
        paddingLeft: 10,
        fontSize: 18,

    },
    txtrow:{
        marginTop: 20,
    },
    txtbtn:{
        color:'#0520F1',
        fontWeight:'bold',
        marginTop: 10,
        marginRight: 10,
    },
    txtbtnview:{
        width: '50%',
        flexDirection: 'row-reverse',
    },
    btn:{
        backgroundColor: '#38a2c2',
        height: 60,
        marginLeft: 10,
        marginRight:10,
    },
    btntxt:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },
    spinnerTextStyle: {
        color: '#FFF'
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
    txtviewitem:{
        marginRight: 10,
        marginLeft: 10,
        padding: 0,
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        marginBottom: 1,
        // backgroundColor: 'red',
    },
    txtlabel:{
        fontSize: 14,
        fontWeight:'bold',
        color:'red',
        marginLeft:5,

    },
    txtitem:{
        fontSize: 20,
        fontWeight:'normal',
        marginLeft:5,
       
    }


};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addnewaccountinfo : Actions.addnewaccountinfo,
        initauth : Actions.initauth,
        createnewaccount : Actions.createnewaccount,
    }, dispatch);
}

function mapStateToProps({login,createaccount})

{
    return {
        login: login,
        createaccount:createaccount,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountReviewScreen);
