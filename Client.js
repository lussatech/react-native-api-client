'use strict';

import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  ToastAndroid
} from 'react-native';

import api from './Server';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nope: true,
      load: false,
      data: undefined
    };
  }

  componentDidMount() {
    api.doctor.find()
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        this.setState({
          nope: responseData.length > 0 ? false : true,
          load: true,
          data: responseData
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.LONG);
      })
      .done();
  }

  render() {
    if (!this.state.load) return this.renderLoading();
    if (this.state.nope) return this.renderEmpty();

    return this.renderScene();
  }

  renderScene() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <Text>fetching data...</Text>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>no result found</Text>
      </View>
    );
  }
}
