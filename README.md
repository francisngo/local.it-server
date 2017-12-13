# Local.it

> Local.it is a mobile based application that recommends activities and businesses one at a time for a user to get excited about and track their likes/dislikes to send more informed suggestions.

![local-it](https://user-images.githubusercontent.com/11182826/33928994-b9577262-df9c-11e7-8f11-2070c4f04bf7.gif)

## Team

  - __Product Owner__: Francis Ngo
  - __Scrum Master__: Scott Schaefer
  - __Development Team Members__: Nick Hattwick, Christine Zimmerman

## Table of Contents

* [Requirements](#requirements)
* [Getting Started](#getting-started)
* [Development](#development)
    * [Installing Dependencies](#installing-dependencies)
* [Contributing](#contributing)

## Requirements

- MongoDB v3.4.7
- Node 6.11.x
- Xcode 8.3.3

## Getting Started

Following these instructions will get you a copy of the project up and running for development purposes.

## Development

### Installing Dependencies

* Fork and clone the repo(s):
  * [Local.it Client](https://github.com/francisngo/local.it-client)
  * [Local.it Server](https://github.com/francisngo/local.it-server)
* Install dependencies from the root of the repo(s) by running:

* From within the server root directory:

```
$ npm install
```

* From within the client root directory:

```
$ npm install
```

* Start the MongoDB server from your terminal

```
$ mongod
```

### Run the Application

* From within the server root directory:

To watch changes to files:
```
$ npm run start:watch
```

To run server once:
```
$ npm run start
```

* From within the client root directory:
```
$ react-native link
$ react-native run-ios
```

* iOS Simulator should open up if you have Xcode installed.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
