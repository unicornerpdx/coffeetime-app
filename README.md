CoffeeTime Ionic App
====================

CoffeeTime is an [Ionic](http://ionicframework.com/) app for keeping score of coffee debt in an organization.

## Install Dependencies

First, you should probably have ionic:

```bash
$ npm install -g ionic
```

Then install bower, if you don't already have it:

```
$ npm install -g bower
```

Next, you'll need gulp for compiling sass:

```
$ npm install -g gulp
```

## Setup Project

Run:

```
$ npm install
```

and

```
$ gulp init
```

This will download the most recent Ionic release from bower, and copy over the SCSS files into `./sass` for future editing..

## Development

There are several ways to develop an Ionic project. The most familiar to front-end web developers will be to use a web browser to preview your work. To do that, you need to do the following:

1. Run ```gulp watch``` from the project directory to start watching your sass files.

2. Go into the `www` directory of the project and startup a simple web server. You can use whatever you're most comfortable with to do this, but we recommend either [Anvil](http://anvilformac.com/) or [http-server](https://github.com/nodeapps/http-server).

## Mobile

You can also run the project in the ios simulator or on an actual android device. A simple way to do the ios simulator is to go into the project directory and type:

```
$ ionic emulate
```

If that fails, try running ```ionic platform ios``` and running the above command again.

