# Chatzak Chat Application 
Chatzak is a Full Stack Chatting App.
It uses Socket.io for real time communication and stores users details and messages in Mongo DB Database.

## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB

## Demo
Deployed on Render.com at this URL:
https://chatzak.onrender.com/

## Features

- Register user 

- Login user

- Sending realtime messages from one registered user to another, including emojis

- Removing message - clickable own message which can be deleted - "Removed message" appears

- UI online indicator

- Random Robots avatar which can be changed as follows: click on the name of the user - modal is showing and when click on update my avatar - the avatar is changing.


## Run Locally

- clone github repo
git clone https://github.com/plamena-petkova/chatzak_be

- install dependencies
npm install

- go to backend folder and start the server
cd backend 
node backend/src/index.js

- open new terminal and go to frontend folder 
cd frontend

- install the dependencies
npm install

- start the client
npm run start

- reach the app on http://localhost:3000

