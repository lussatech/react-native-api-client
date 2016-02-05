'use strict';

import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  ProgressBarAndroid
} from 'react-native';

import api from './Server';

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
        return response.json();
      })
      .then((responseData) => {
        this.setState({
          nope: responseData.length > 0 ? false : true,
          data: responseData
        });
      })
      .catch((error) => {
        this.onError(error);
      })
      .done(() => {
        this.setState({load: !this.state.load});
      });
  }

  render() {
    if (!this.state.load) return this.renderLoading();
    if (this.state.nope) return this.renderEmpty();

    return this.renderScene();
  }

  renderScene() {
    return (
      <View style={styles.container} {...this.props}>
        <Text style={styles.instructions}>{JSON.stringify(this.state.data)}</Text>
      </View>
    );
  }

  renderLoading() {
    return <ProgressBarAndroid />;
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <Text>{`no result found`}</Text>
      </View>
    );
  }

  onError(argument) {
    console.log(argument);
    ToastAndroid.show(String(argument).replace('Error: ',''), ToastAndroid.LONG);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});
