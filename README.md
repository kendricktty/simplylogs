# SimplyLogs #

#### Created by ####
* Bryan Tan Jia Jun (github.com/BryanTJJ99)
* Kendrick Teo Tze Yu (github.com/kendricktty)
* Ooi Jing Kai (github.com/ooijingkai10)
* Tan Yi Peng (github.com/tanyipeng834)
* Wong Zheng Da (github.com/zdwong9)

For HEAP 2022, SMU .Hack

## Contents ##
* Introduction
* Installation
* 


## Introduction ##
SimplyLogs is our attempt at creating a more user-friendly and powerful inventory tracking application. Our prototype aims to improve the experience and accessibility of inventory/asset tracking by automating key processes like serialising, invoice generation and accounting, introducing a cleaner, more aesthetically pleasing user interface, and allowing for easy customisation of item serial numbers commonly used to organise inventory items.

## Key features ##


## Installation ##

Before cloning this repository, do ensure that you have NodeJS installed on your machine. If you do not already have it installed, please visit the official NodeJS website for installation instructions: https://nodejs.org/en/download/

The backend and frontend servers are each located in its own namesake folder, and need to be built and activated separately, one after the other, for this application to run correctly. After installing the required dependencies, the backend application needs to be activated first, and then the frontend application.

### macOS and Linux ###
1. Open a new Terminal window, `cd` into a directory of your choice, and clone the repository:

    `git clone https://github.com/kendricktty/group17_projmamadiam`

    Alternatively, use the GitHub UI to download the repository to a directory of your choice.

2. From the working directory containing the cloned repository you `cd`-ed into in Step 1, `cd` into the `inventoryapp-backend` folder.
   
3. Install the NodeJS dependencies for the backend server using this command:

    `npm install`

4. After setting up the backend server, `cd` into the `inventoryapp-frontend` folder and repeat Step 3.
   
5. After completing steps 1 through 4, refer to the respective sections below to create a `.env` file and a database server.

### Windows ###

### Creating your environment variables ###
The backend application requires a custom-made `.env` file. Run the following command from inside `inventoryapp-backend` to create your new `.env` file:

* macOS/Linux: `touch .env`
* Windows: `echo.> .env`

You may leave your `.env` file blank for now as we move on to the next section.

### Setting up your database server ###


## Dependencies ##
To build and run `SimplyLogs`, you will need:

* NodeJS
* A MongoDB 

## About us ##