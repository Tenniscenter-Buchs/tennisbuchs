# tennisbuchs
The entire tennis-buchs.ch web framework in one project

## Introduction
This repository contains the entire web framework of Tenniscenter Buchs in one Node.js project. It defines a REST API which is openly accessible, you may thus feel free to integrate our API-endpoints into your own projects. Everything according to the terms of the GPL-3.0 license as defined in [LICENSE](https://github.com/Tenniscenter-Buchs/tennisbuchs/blob/master/LICENSE), of course.

The project has just recently been started and is currently under active development. The webapp is hosted from the Heroku Cloud and thus scales infinitely. Its production environment is freely accessible directly from [tennisbuchs-production.herokuapp.com](https://tennisbuchs-production.herokuapp.com). 
A separate environment for testing open-beta features (nicknamed 'staging') is live at [tennisbuchs-staging.herokuapp.com](https://tennisbuchs-staging.herokuapp.com).

The front-end user interface is built using [ReactJS](https://reactjs.org/), the back-end API-server is controlled through [ExpressJS](https://expressjs.com/). The choice for React as the front-end driver was strategical as it is planned to release Tenniscenter Buchs Android and iOS Apps in the near future. Using React and [React Native](https://reactnative.dev/), a large portion of the web interface code can directly be used for these mobile apps.

### Technical Introduction
The application is backed by a PostgreSQL relational database. Queries are made with bare SQL (Structured Query Language) from the API-server and from the API-server only. Connections are acquired from an existing pool of connections (aka. the connections are pooled). This is in order to prevent opening a new connection client everytime a user requests a resource through the API-server, preventing server- and database-side overhead.

The application uses Bearer authentication, which is token-based.

Heroku continuously deploys the two main branches of the repository: [tennisbuchs-production](https://github.com/Tenniscenter-Buchs/tennisbuchs/deployments/activity_log?environment=tennisbuchs-production) tracks the [master](https://github.com/Tenniscenter-Buchs/tennisbuchs/commits/master)-branch whereas [tennisbuchs-staging](https://github.com/Tenniscenter-Buchs/tennisbuchs/deployments/activity_log?environment=tennisbuchs-staging) tracks the [develop](https://github.com/Tenniscenter-Buchs/tennisbuchs/commits/develop)-branch. A new deployment is triggered whenever a new commit gets pushed to the respective branch.

Active development is carried out through feature resp. change branches, which are prefixed accordingly. Once a feature/change has been carefully tested by the developer locally, to the best of their abilities, it gets merged to the develop branch. It is then retested thorougly on staging before the development branch gets merged to master, triggering a new production deployment.

Staging and Production do not use the same database. The staging-database is performance-wise dramatically worse than the production one, which is on purpose. Always test software on slow systems and then deploy to production on more powerful ones, as a rule of thumb. 

The production enviroment is auto-scaled, based on usage. It can be scaled infinitely in the Heroku Cloud.

### Repository structure
The code for the front-end is located under the [client](https://github.com/Tenniscenter-Buchs/tennisbuchs/tree/master/client) directory.

The API-routes are defined under the [routes](https://github.com/Tenniscenter-Buchs/tennisbuchs/tree/master/routes) directory.

The API-endpoint controllers are located in [controllers](https://github.com/Tenniscenter-Buchs/tennisbuchs/tree/master/controllers).

All database-query related stuff is in [queries](https://github.com/Tenniscenter-Buchs/tennisbuchs/tree/master/queries).

## Local installation

### Dependencies
To run a local, small-scale copy of the application you need to have the following dependencies installed on your system:

 - [ ] Node.js (>v14.12.0 is advised, backwards compatibility has not been tested)
 - [ ] npm (>v6.14.7 is advised, backwards compatibility has not been tested)

All dependencies are easily installed through `npm` (node package manager) by running:

    npm install
    cd client/
    npm install

### Running locally
The app can be run on your local machine in multiple ways:

#### Running production setup
The serve package is required to run this app in production mode:

    npm run build
    npm install -g serve    # Note: this command may require root privileges to successfully complete,
                            # if you run into errors, run: sudo npm install -g serve
    serve -s client/build

The output of the last command will give you the local url and port where the web app is accessible.
Just open this link in a browser and you should see the application running.

#### Running development setup (for testing local changes)
Simply run:

    npm run dev

This will use the node package `concurrently` to run both the API-server and the UI on your local machine.
By default, this setup exposes the frontend on [http://localhost:3000](http://localhost:3000).
