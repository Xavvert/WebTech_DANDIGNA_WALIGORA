# Lab

The React Context API will simplify how to share data between multiple parts of our application.

We will store the user information inside a context. Create a Context Provider and wrap your application with it. Use the `setOauth` or `setUser` exported by the Provider to share the tokens returned by the OpenId Connect server. Use the `oauth` or `user` exported by the Context in the different sections of your application to display the user information or to get access to the access token. Other properties such as the list of channels are good candidates.



## How to use the app and launch dex with Windows

Clone the version 2.28 then follow the instructions here to launch dex : https://www.adaltas.com/en/2020/11/17/oauth-openid-connect-intro/

To start the app : cd to your front-end folder, install dependencies with "npm install", then launch the app with npm start

