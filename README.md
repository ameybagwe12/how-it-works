# Installation

On terminal run git clone [https://github.com/ameybagwe12/how-it-works.git](https://github.com/ameybagwe12/how-it-works.git)
In root directory open 2 terminals one for frontend and for backend

# Usage

## Frontend Directory

Terminal(1) -> cd ./frontend from how-it-works
From the frontend project directory, you can run:

### `npm install` - Step(1)

Install all the frontend project libraries

### `npm start` - Step(2)

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend Directory

Terminal(2) -> cd ./backend from how-it-works
From the backend project directory, you can run:

### `npm install` - Step(1)

Install all the frontend project libraries

### `nodemon app.js` - Step(2)

Host the localhost server on port 5000

# Design Decisions

## 1. Technology Stack:

Frontend - ReactJs
Backend - NodeJs, ExpressJs
Database - MongoDB
Libraries -
a-[MaterialUi(UI Development)](https://mui.com/material-ui/getting-started/) ,
b-[Animista(Transitions)](https://animista.net/),
c-[LottieFiles(Animations)](https://lottiefiles.com/),
d-Axios(API cals)

## 2. Flow of Project

Add Step -> Input the data and new step will be created serially in sorting format
TextField-1 (Step Number)
TextField-2 (Step Text)

Delete Step ->
TextField-1 (Step Number)