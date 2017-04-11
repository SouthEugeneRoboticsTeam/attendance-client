# Attendance-Client

A client interface for SERT's attendance. It is meant to be used for signing into meetings to log hours for both students and mentors. The app for seeing stats and exporting logs is the [Attendance manager](https://github.com/FRCTools/Attendance-Manager).

# Screenshots

![Screenshot/HomeScreen](/screenshots/homeScreen.png?raw=true)
![Screenshot/SignIn](/screenshots/signIn.png?raw=true)



# Using

You can [download the latest release](https://github.com/Scoutomic/Attendance-Client/releases) for your operating system or build it yourself (see below). Once in the app, to create a new student or mentor account, just type in a number and the button will change to open the new user interface.

# Building

To build Attendance-Client from the source code, you'll need to have the LTS version of [Node.js](https://nodejs.org/) installed. Follow the steps below to build and run in dev mode.

```bash
$ git clone https://github.com/Scoutomic/Attendance-Client
$ cd Attendance-Client
$ npm install
$ npm start
```
