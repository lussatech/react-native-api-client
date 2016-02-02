'use strict';

import React, {
  Component,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
  TextInput
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';

const icons = {
    back: require('./ic_menu_back.png'),
    logo: require('./ic_menu_logo.png'),
    menu: require('./ic_menu_option.png'),
  search: require('./ic_menu_search.png'),
};

const actions = [
  {title: 'Search', icon: icons.search, show: 'always'},
  {title: 'Menu A'},
  {title: 'Menu B'},
  {title: 'Menu C'},
  {title: 'Menu D'},
  {title: 'Menu E'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginRight: 177
  },
  title: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: false,
       query: undefined
    };
  }

  render() {
    let title  = <View style={styles.titleContainer}>
                  <Text style={styles.title}>{'Example'}</Text>
                 </View>;

    let search = <View style={styles.titleContainer}>
                  <TextInput ref={'search'} placeholder={'type something . . .'} autoFocus={true} onChangeText={(text) => this.state.query = text} value={this.state.query} />
                 </View>;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={(this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) ? icons.back : undefined}
          onIconClicked={this.goBack.bind(this)}
          logo={icons.logo}
          actions={actions}
          onActionSelected={this.onActionSelected.bind(this)}>
          {this.state.search ? search : title}
        </ToolbarAndroid>
      </View>
    );
  }

  onActionSelected(position) {
    if (this.state.search) return this.onSearch();

    ToastAndroid.show(actions[position].title + ' selected.', ToastAndroid.SHORT);

    if (actions[position].title === 'Search') {
      this.setState({
        search: true
      });
    }
    return null;
  }

  onSearch() {
    ToastAndroid.show(this.state.query + ' not found', ToastAndroid.SHORT);
    setTimeout(() => {
      this.setState({
        search: false
      });
    }, 1000);
  }

  goBack() {
    if (this.props.navigator) this.props.navigator.pop();
    return null;
  }
}
