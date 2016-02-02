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

import Navbar from './Navbar';
import Client from '../Client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    backgroundColor: '#EC7E48',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: undefined
    };
  }

  render() {
    return (
      <ScrollView>
        <Navbar navigator={this.props.navigator} />
        <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigator.replace({name: 'client'})}>
            <Text style={styles.buttonText}>Click Me</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'home'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.FadeAndroid;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'client':
        return <Client />;
        break;
      default:
        return <Home navigator={navigator} />
    }
  }
}
