## Requirements:

    lussatech-cli

-----
## Content:
* [Step 1: Get the code](#step1)
* [Step 2: Generate files](#step2)
* [Step 3: Customize files](#step3)

-----
<a name="step1"></a>
### Step 1: Get the code

    npm install react-native-api-client

-----
<a name="step2"></a>
### Step 2: Generate files

    lussatech generate react-native-api-client

-----
<a name="step3"></a>
### Step 3: Customize files

    react-native-project
    ...
    |_ lib
      |_ react-native-api-client
        |_ Navbar.js
        |_ ...
        |_ Client.js
        |_ ...
        |_ Server.js
    ...

#### Setting up your API end-point at `Server.js`, e.g.
```javascript
# lib/react-native-api-client/Server.js

...
export const host = 'http://example.com';
export default {
  doctor: {
    find: function () {
      let url = host + '/doctor',     // API URI for browse doctor
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    ...
  },
  ...
};
...
```

#### Call your API end-point at `Client.js`, e.g.
```javascript
# lib/react-native-api-client/Client.js

...
import api from './Server';

export default class extends Component {
  ...
  componentDidMount() {
    api.doctor.find()                // call API URI for browse doctor
      .then((response) => {
        ...
      })
      .catch((error) => {
        ...
      })
      .done();
  }
  ...
}
...
```

#### Import `react-native-api-client` to your _react-native-project_, e.g.
```javascript
# index.android.js

...
import Client from './lib/react-native-api-client';

class Name extends Component {
  render() {
    return <Client />;
  }
}
```
