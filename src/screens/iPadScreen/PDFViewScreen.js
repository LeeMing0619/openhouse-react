import React from 'react';
import { View } from 'native-base';
import PDFView from 'react-native-view-pdf';
import connect from 'react-redux/es/connect/connect';
class PDFViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const resourceType = 'url'
    const sources = this.props.ipad.data.pdf_url;
    return (
      <View style={{ flex: 1 }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resourceType={resourceType}
          resource={sources}
        />
      </View>
    );
  }
}
const styles = {
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
)(PDFViewScreen);
