# chatapp
chat app boilerplate for react


# How it works

This application is based on a chat app with 2 chat channels on the same browser tab.

The Structure of the application is explained bellow: 

![alt text](https://github.com/balusio/gimmeya/blob/develop/app/assets/tiny-diagram.png)

### Chat Service

The chat service is a general common shared service based on a Publish subscribe pattern, you can take a deeper look at here,
the parent abstract class that uses the publish subscribe is on lib/pubSubLib.js [check more here.](https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213)

### The Context
Preventing overengineering using a the app using Redux for state management, choose a Context to share the service between the app that will be probably consuming websockets, 
preventing use more libraries make the Context pattern viable and depend only on external service with hooks.

### Containers

The containers for the app are React Classes that handle the communication between context to update messages and emit general events

### Components

to avoid the use of react classes among the app, use presentational components is a good approach to use less resources when the websockets or subscribes works during time,
all components should be wrapped into a React container class, and they should pass the mayority of the events avoiding use lifecycle and resource use this
there's a few uses with reactHooks for handle things like inputs and emit events.


### Libs and commons

Inside the lib there's two essential codes that make this app work: 

  - pubSubLib: the heart of the app is a publish subscribe pattern that recieve and send message, is placed here if is needed reuse this approach on other parts of the app
  - chatInterface: the chatInterface is a singleton pattern that generates unique chat instances, pretty much a mocked backend to provide and recieve message on the browser,this instance
    is not needed to make the app work, but it should be replaced with a chat library and make the new library start inside the chat service.

# Building the App

### the app technology 
is a pretty straightforward and trendy 2019 react library with:
  - React v16.9 
  - webpack for bundling
  - Jest and enzyme for testing 
  - eslint
  - node v10 LTS.
  - circleCI for integrations

### to run the app : 
  1. install the dependencies `npm install`
  2. on development mode: `npm run dev` 
  3. for testing with coverage : `npm run test:single`
  4. for linting: `npm run lint`
  5. for building: `npm run build` will create a dist folder with the bundles

# Lint and Testing
the application linting is based on the Airbnb config, all rules are inside the .eslintrc

