'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet,
  TouchableHighlight,
  BackAndroid,
  ScrollView,
  View,
  Text,
  ToastAndroid
} from 'react-native';

import Client from './Client';
import Navbar from './Navbar';
import Server, {host as Host} from './Server';

export {Client, Navbar, Server, Host};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: false
    };
  }

  render() {
    return (
      <ScrollView>
        <Navbar title={`Home`} onRefresh={() => this.onRefresh()} />
        <View style={styles.container}>
          {this.state.client ? this.renderClient() : this.renderScene()}
        </View>
      </ScrollView>
    );
  }

  renderScene() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'#2bbbad'}
        onPress={() => this.setState({client: !this.state.client})}>
        <Text style={styles.buttonText}>{`Click Me`}</Text>
      </TouchableHighlight>
    );
  }

  renderClient() {
    return <Client />;
  }

  onRefresh() {
    this.setState({client: false});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    backgroundColor: '#26a69a',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
