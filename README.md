# mst-training

This example project helps you learn [MobX-State-Tree's](https://mobx-state-tree.js.org/intro/philosophy) core functionality.

## API

The following REST endpoints are defined on the api at https://5f6c842e34d1ef0016d58307.mockapi.io/api/v1

The API will auto-increment the `id` and `status` when adding CartItems. The API will also randomize the `createdAt` property. The images currently aren't loading for products. When retrieving data from the API use the [axios](https://www.npmjs.com/package/axios) HTTP client.

#### Users

- GET `/users`
- GET `/users/:id`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`

#### Items

- GET `/items`
- GET `/items/:id`
- POST `/items`
- PUT `/items/:id`
- DELETE `/items/:id`

#### CartItems

- GET `/cartItems`
- GET `/cartItems/:id`
- POST `/cartItems`
- PUT `/cartItems/:id`
- DELETE `/cartItems/:id`

## Required Software

Before you get started, please ensure you have the latest versions of the following software installed:

- [Brew](https://brew.sh/)
- [n](https://github.com/tj/n) or similar
- Node (installed through n, either LTS or latest)
- [Yarn](https://classic.yarnpkg.com/en/)
- [CocoaPods](https://formulae.brew.sh/formula/cocoapods)
- Xcode via the AppStore
- [Visual Studio Code](https://code.visualstudio.com/) (not required but recommended)
- Optional Visual Studio Code extensions
  - React Native Tools
  - npm Intellisense
  - EditorConfig for VS Code
  - GitLens
  - Prettier

## General

In this project, you will use MST and React Native to create a mock e-commerce app. You will only need to build the views necessary to complete the requirements (perhaps a view for the store displaying the items and then a cart view). Use React Navigation to switch between views.

- There should be a store for each resource, grouped under one `rootStore`
- Ensure that there is a single source of truth: Reference data if it alrerady exists somewhere in the store
- Avoid copying store state into local component state
- Use `inject` and `observer` to access stores in components
- Keep business logic in the stores and access it via `views`

## Tasks

1. Run `yarn install` insider project folder and then `cd ios && pod install` to install required dependencies and Pods.

2. Setup a clean React project and add a [basic MobX-State-Tree setup](#rootstore--storeprovider) with a `rootStore` and a `StoreProvider`.

3. Get all `items`, store them in a store, and display them with the data they contain. Use a `flow action` to get the data with the `afterCreate` lifecycle hook and `views` to display a computed data, like a string of `price` + `currency`.

4. Normalize (pull it into its own model and reference it) the `department` property and add a `department` filter select box that filters based on the departments. By default that filter selects `All Departments`.

5. Build a user selector on the left in the top nav where a visitor can select one of the existing users and will then execute all further actions based on the selected user. Store all users and the currently selected user in the store.

6. Add an admin user to the selector and an admin view where the user can edit one of the store item properties (name, price, or department).

7. Add a cart button to each item, so the user can add `items` to his cart. Once clicked, the `item` will be added to the `cartItems` both in the store and then saved to the API with the `PUT` method. Get the `userId` by accessing the currently selected user in the `userStore` via the `rootStore`.

8. When a user is selected, show a cart symbol on the right in the top nav at all times with a number indicating the amount of items in the cart (use a `view`). Clicking the cart icon brings you to the cart view which will list all of the user's `cartItems`.

9. Add a delete button to each cart item that will delete the item from the cart both in the store and on the API with the `DELETE` method.

10. Use composition to add a `model` helper function that will add a `view` which returns the relative time since the models `createdAt` property using the [javascript-time-ago](https://github.com/catamphetamine/javascript-time-ago) library. Display this relative time to indicate when items were added to the cart.

11. Add a `updatedAt` property to the model helper created before and add a function that allows the model to save the current time in the `updatedAt` property (so a function called `saveUpdatedDate` that is available for all models that implement the helper). Use this helper when an admin updates one of the store item properties.

## rootStore && StoreProvider

In a folder called stores, include an index.js and rootStore.js.

### stores/rootStore.js example

The rootStore will define all the stores that your app will be able to access.

```Javascript
import {types} from 'mobx-state-tree';
import {UserStore} from './models/UserStore';

const RootStore = types.model('RootStore').props({
  userStore: types.optional(UserStore, {}),
});

export default RootStore;
```

### stores/index.js example

The file will return a react component that will ultimately wrap your entire app component for your app to have access to the store.

```Javascript
import React, {useState, useEffect, Fragment} from 'react';
import {Provider} from 'mobx-react';

import RootStore from './rootStore';

async function createRootStore(setRootStore) {
  const rootStore = await RootStore.create({});
  setRootStore(rootStore);
}
const StoreProvider = ({children}) => {
  const [rootStore, setRootStore] = useState(null);
  useEffect(() => {
    if (rootStore === null) {
      createRootStore(setRootStore);
    }
  }, [rootStore]);
  if (rootStore === null) {
    return <Fragment />;
  }
  return (
    <Provider rootStore={rootStore} {...rootStore}>
      {children}
    </Provider>
  );
};
export default StoreProvider;
```

### app.js example

```javascript
const App = () => {
  return <StoreProvider>// app contents here</StoreProvider>;
};
```
# ecomm-shopping-cart
# ecomm-shopping-cart
