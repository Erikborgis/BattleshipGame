# Battleship game in Vite + React

This project was created by Erik Borgström as an assigment from QSoftWerk.

The project is a traditional battleship game where the user can play against another player on the same computer. It is built using Vite + React framework and therefore Vitest for testing purposes. 

The project has been created in about 9 hours of coding with project setup included.

In the setup a pipeline for git was also setup that runs test and linters for each push.

## Continues development

If there was more time for the project, more focus would be placed on testing, there is unfortunately some modules that have been seen past and sadly one of the biggest (gameLogic). I would also focus on refactoring the code a bit as it could be made a little better, shorting down functions and so on. I would also want to comment a bit more.

Otherwise, I am happy with the UI and the functionality of the game, and it runs smoothly. I would however but some focus on making it more dynamic so it works better for different sized screens, as it hasn't even been tested for that as of now.

Overall I am happy about it went considering it was only around 9 hours.

## Required installations

* Git
* Node.js and npm (Node Package Manager)
* Vite https://vitejs.dev/

## Setup
To run the project do the following steps:

### Cloning the Repository

To clone the repository and navigate into the project directory, run the following commands in your terminal:

1. git clone [Repository URL]
2. cd [Repository Name]

### Installing Dependencies

Run **npm install** in the bash terminal or normal terminal to install all of the dependencies.

### Run Linters

Run the linters by typing **npm run lint** in the terminal.

### Run Test

Run the test by typing **npm run test** in the terminal
Run coverage report by typing **npm run coverage** in the terminal to see test coverage. 

### Build and run the web server

1. Type **npm run build** to build the dist folder.
2. Type **npm run preview** to start the server from the dist folder
3. Open up the localhost address given to you in your browser, usually: **http://localhost:4173/**