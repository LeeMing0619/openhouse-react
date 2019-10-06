import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Constants } from '@commons';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation'
class TermsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={()=>navigation.navigate('home')}>
          <Text style={{ color: '#0000ff', fontSize:20, }}>I AGREE</Text>
        </TouchableOpacity>
      ),
    }
  }
  constructor(props) {
    super(props)
  }
  handleBackButton() {
    return true;
  }
  componentDidMount() {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() { }
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
       
        <View style={{ flex: 1 }}>
          <WebView
            style={{
              height: '70%',
              alignSelf: 'center',
              width: '90%',
              marginTop: 10,
            }}
            originWhitelist={['*']}
            source={{ uri: "http://ecaptureinc.com/ecaptureoh/tos.html" }}></WebView>
        </View>
      </View>
    );
  }
}

export default TermsScreen;
