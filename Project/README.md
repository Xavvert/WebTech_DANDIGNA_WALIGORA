# 👨‍🚀 SpaceChat' - Chat application - WebTech Final project

## Presentation

For this README file, we are first going through a **User Experience** presentation of our SpaceChat', then have a look to the **Usage**, then to the **Author**, the **Tasks** and finally the **Bonus**

### Login Screen 🌌

We created an intuitive and UX design welcome screen where we can login with dex. Moreover, we've made a **infinite gradient background** coupled with an **animation** to render it more '***spacy***' ! The **fonts** has been chosen to match the space ambient. Another cool feature is that the user is able to turn on ([🔊](https://emojipedia.org/speaker-high-volume/)), or turn off ([🔇](https://emojipedia.org/muted-speaker/)), the **ambient music** on the top right corner by clicking on the speaker icon.

![Login](C:\Users\xavie\Downloads\Login.gif)

### Connexion & Welcome Screen 🌌

After being logged, our code **check** if you have already been on this application. If you have already been in this application, you are connected and your email and id are set in the useContext. Else, **if you have never been** on this application, it will **create** a user with your email and an id in the database. 
Here is the code that does this : 

```js
if (!users.filter(user => user.username == payload.email).length){
          // the user doesn't exist, we have to add him in the data base
          const {data: user} = await axios.post('http://localhost:3001/users', {
            username: payload.email
          })
          data.email = user.username
          data.id = user.id 
        } else {
          // the user already exist, but we have to add the id and the email of the user in the cookie
          const theUser = users.find(user => user.username == payload.email)
          data.email = theUser.username
          data.id = theUser.id
        }
```

![Capture1](C:\Users\xavie\Downloads\Capture1.PNG)

The first time you login, you're landing on this page. You have **three choices** here : 

- Create a new channel 
- Check your notifications
- Go to settings

Lets now create a new channel and send some messages... 

### Create a new Channel 🌌

When we create a new channel, we have to **set a name** for the channel 

![Capture2](C:\Users\xavie\Downloads\Capture2.PNG)

Let's now create **three channels**, and TA-DAA, we have now wonderful channels as you can see below 

![Capture3](C:\Users\xavie\Downloads\Capture3.PNG)

We can see all the **channels created** on the left of the screen. Notice that, on an other account, **you won't see** those channels because you were **not** invited. 

### Channel settings 🌌

Once you are in a channel, you can check the **settings of the channel** on the top left corner of the screen

![Capture4](C:\Users\xavie\Downloads\Capture4.PNG)

When you open the settings, a **modal window** open where you can do multiple things...

![image/screenshot6.jpg](image/screenshot6.jpg)

So you can **delete the channel or add new people** to this channel with their email address. Let's add a new people to the channel

![image/screenshot7.jpg](image/screenshot7.jpg)



When we add new people, we can **see all the people we invited in the list** (however these people will have to accept whether they want to join the channel).
Lets now see what happen on **paul.waligora@edu.ece.fr** account: 

![Capture13](C:\Users\xavie\Downloads\Capture13.PNG)

When we go to the other account in notifications page, we can **accept or reject** the invitation to the new channel. On this notification page, we can see the name of the channel and the **person who invited me**. 
If we accept, we become members of the channel and the notification disappear : 

 ![Capture14](C:\Users\xavie\Downloads\Capture14.PNG)

### Delete and modify messages 🌌

In our app, we have the possibility to **change or delete a message**. You can delete a message thanks to the **bin button** on the right or modify it with the **settings button**. 

**Let's go back to the main account**, and write some messages...

![Capture7](C:\Users\xavie\Downloads\Capture7.PNG)

Let's now **delete** the first message

![Capture8](C:\Users\xavie\Downloads\Capture8.PNG)



We also can **modify** a message by clicking on the settings button on the right of the message, like this![Capture9](C:\Users\xavie\Downloads\Capture9.PNG)

And let's **change** this previous message by "How about tomorrow ?"

![Capture10](C:\Users\xavie\Downloads\Capture10.PNG)



###  Settings page 🌌

For the settings page that can be found on the welcome screen. The page is just implemented but nothing is working here. It is just displayed to have an overview, but **not useful for now**, and will be implemented in the near future.

![Capture11](C:\Users\xavie\Downloads\Capture11.PNG)

## Usage 🌌

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/Xavvert/WebTech_DANDIGNA_WALIGORA
  cd ./Project
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make build
  make examples
  ```
* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Note that a `dex-config` is provided but feel free to modify the provided `./dex-config/config.yml` configuration to look like
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end (use yarn or npm)
  yarn start
  ```

## Author 🌌

- Paul Waligora 
- Xavier Dandigna

## Tasks 🌌

In this section, we've detailed our self-assessment to give you a better vision of our project

Project management

* Naming convention   
  1.5/2, we tried to make our code as clearly as possible with easy name of file or variables
* Project structure   
  2/4, we separated everything we could separate in different folders 
* Code quality   
  3/4, we used formater with vs code to help us format our documents to have a better render
* Design, UX   
  4/4, we used material UI for a lot of components, and the style is kinda smooth with a lot of features
* Git and DevOps   
  4/4, We used branch and commit during all the project in order to follow our progression. Furthermore we modified unit test for our project.

Application development

* Welcome screens   
  3,5/4: we made something uncluttered to catch the user eyes at first sight and we can easily access to different pages
* New channel creation   
  6/6, we can create a channel, it persist to the database, we can also set the name of the channel
* Channel membership and access   
  3/4, when we create a new channel, the channel is associated with the Id of the person who created the channel. However, we didn't implemented token access. 
* Ressource access control   
  3/4, the user can access only to his channel or to the channel where he was invited 
* Invite users to channels   
  6/6, we can invite whoever we want with by using their email address 
* Message modification   
  2/2, we can make a modification on a message sent by the owner of the message exclusively
* Message removal   
  2/2, we can also remove a message only by the owner of the message
* Account settings   
  1/4, we have only implemented the graphical interface 
* Gravatar integration   
  1,5/2, we have implemented the service next to the name in a channel conversation but it is the same for everyone. Yet, if the email address does exist, the gravatar will be updated accordingly to the email address associated (though, for the space ambient, we preferred to keep this common gravatar picture)
* Avatar selection   
  0
* Personal custom avatar   
  0

## Bonus 🌌

Here's the list of bonuses that we've done for this project, ranked by importance :

- Notification Page : We have a notification page where we can accept or not if we want to go to a channel

- Emoji integration to the messages : The user can choose a specific emoji from an emoji picker and send his message by pressing 'Enter'

- Particules animation on the first page that create a space atmosphere 

- Infinite background gradient

- Ambient sound on the first page that we can activate with a Button (play/pause)

- Three differents fonts

  ## Last Words 🌌

  We hope that you got a nice journey on our SpaceChat' project and see you for a new mission ! 🚀🚀

