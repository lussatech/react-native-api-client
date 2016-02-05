### Installation
    npm i react-native-api-client

### Generate Files
Before generate library files to your react-native-project, make sure that `lussatech-cli` is installed globally in your machine, otherwise use this command to install it:

    npm i lussatech-cli -g

If `lussatech-cli` have been installed, change directory to your react-native-project and run this command:

    lussatech generate react-native-api-client

then the library files will be added automatically inside your react-native-project, e.g.

    react-native-project
    |_ ...
    |_ lib
      |_ react-native-api-client
        |_ ...
        |_ index.js
        |_ ...

### Usage
```javascript
...
import APIClient, {     // sample app
/* available components */
  Navbar,               // sample navigation bar
  Client,               // sample client view
/* available constants  */  
  Server,               // sample api end-point
  Host,                 // sample host for api end-point
} from './lib/react-native-api-client';

class Name extends Component {
  render() {
    return (
      <APIClient />     // sample calling component
    );
  }
}
...
```

###### Manage API end-point
To manage api end-point, update `Server.js` based on your api end-point, e.g.

```javascript
# lib/react-native-api-client/Server.js

...
export const host = 'http://example.com'; // host for api url
export default {
  doctor: {
    find: function () {
      let url = `${host}/doctor`,         // api url for browse doctor
          opt = {                         // optional second argument
            method: 'get'                 //  to customize the HTTP request
          };

      return fetch(url, opt);
    },
    ...
  },
  ...
};
...
```

then call api end-point inside your react-native-project, e.g.

```javascript
# lib/react-native-api-client/Client.js

  ...
  componentDidMount() {
    api.doctor.find()             // call api url for browse doctor
      .then((response) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done(() => {
        ...
      });
  }
  ...
```

###### Customize navigation bar
To customize navigation bar, update `Navbar.js` based on your need, e.g.

```javascript
# lib/react-native-api-client/Navbar.js

...
export default class extends Component {
  /* to validate props value */
  static propTypes = {
    onRefresh: PropTypes.func,
    ...
  };
  ...

  /* when a menu is selected */
  onActionSelected(position) {
    switch (position) {
       case 0: this.onSearch(); break;
       case 1: this.onRefresh(); break;
       ...
      default: ToastAndroid.show(`${actions[position].title} selected.`, ToastAndroid.SHORT);
    }
  }
  ...

  /* when selected menu is `Refresh` */
  onRefresh() {
    /* calling onRefresh props action if available */
    this.props.onRefresh && this.props.onRefresh();
  }
  ...
}

/* list of menu */
const actions = [
  {title: 'Search', icon: icons.search, show: 'always'},
  {title: 'Refresh', icon: icons.refresh, show: 'ifRoom'},
  ...
];
...
```

then include the navigation bar inside your react-native-project, e.g.

```javascript
# lib/react-native-api-client/index.js

  ...
  render() {
    return (
      <ScrollView>
        <Navbar title={`Home`} onRefresh={() => this.onRefresh()} />
        <View style={styles.container}>
          ...
        </View>
      </ScrollView>
    );
  }

  onRefresh() {
    ...
  }
  ...
```

###### Customize views
To customize views, update `Client.js` based on your need, e.g.

```javascript
# lib/react-native-api-client/Client.js

  ...
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
  ...
```
