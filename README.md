# mst-training

This project was done to aid in learning [MobX-State-Tree's](https://mobx-state-tree.js.org/intro/philosophy) core functionality.

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

Use MST and React Native to create a mock e-commerce app. You will only need to build the views necessary to complete the requirements (perhaps a view for the store displaying the items and then a cart view). Use React Navigation to switch between views.

- There should be a store for each resource, grouped under one `rootStore`
- Ensure that there is a single source of truth: Reference data if it alrerady exists somewhere in the store
- Avoid copying store state into local component state
- Use `inject` and `observer` to access stores in components
- Keep business logic in the stores and access it via `views`

## Running

1. Run `yarn install` inside project folder and then `cd ios && pod install` to install required dependencies and Pods.

2. Run either using `yarn ios` or `yarn android`
