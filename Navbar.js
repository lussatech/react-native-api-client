'use strict';

import React, {
  Component,
  StyleSheet,
  ToastAndroid,
  View
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
});

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={(this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) ? icons.back : undefined}
          onIconClicked={this.goBack.bind(this)}
          logo={icons.logo}
          title={'Example'}
          actions={actions}
          onActionSelected={this.onActionSelected.bind(this)}
        />
      </View>
    );
  }

  onActionSelected(position) {
    ToastAndroid.show(actions[position].title + ' selected.', ToastAndroid.SHORT);
    return null;
  }

  goBack() {
    if (this.props.navigator) this.props.navigator.pop();
    return null;
  }
}
