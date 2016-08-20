# Scoutomic-Client

[![Codacy Badge](https://api.codacy.com/project/badge/grade/9a246afa308c49edaa29848054185f60)](https://www.codacy.com/app/dassonville-andrew/Scoutomic-Client)
[![Join the chat at https://gitter.im/Scoutomic/Scoutomic-Client](https://badges.gitter.im/Scoutomic/Scoutomic-Client.svg)](https://gitter.im/Scoutomic/Scoutomic-Client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A client interface for FRC match scouting.

![Screenshot/Mainpage](/screenshots/mainpage.png?raw=true)

# Using

You can [download the latest release](https://github.com/Scoutomic/Scoutomic-Client/releases) for your operating system or build it yourself (see below).

# Building

To build Scoutomic-Client from the source code, you'll need to have the LTS version of [Node.js](https://nodejs.org/) installed (currently at v4.4.4).

```bash
$ git clone https://github.com/Scoutomic/Scoutomic-Client
$ cd Scoutomic-Client
$ npm run setup
$ npm start
```

# Major TODO List

* [ ] Use the newest version of Electron (#18)
* [ ] Create Node.js v6.*.* version
* [ ] Add random form id to requests (#16)
* [ ] Add ability to customize URL to send data to (#13)
* [ ] Create stats graphs (#12)
* [ ] Ask for event when starting application (#11)
