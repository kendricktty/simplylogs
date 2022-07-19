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
* Key features
* Dependencies
* 

## Introduction ##
SimplyLogs is our attempt at creating a more user-friendly and powerful inventory tracking application. Our prototype aims to improve the experience and accessibility of inventory/asset tracking by automating key processes like serialising, invoice generation and accounting, introducing a cleaner, more aesthetically pleasing user interface, and allowing for easy customisation of item serial numbers commonly used to organise inventory items.

## Key features ##

## Dependencies ##
To build and run `SimplyLogs`, you will need:

* NodeJS
* A MongoDB account

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

### Setting up a database server ###
SimplyLogs relies on MongoDB Atlas, the cloud database storage offered by MongoDB, to persist any data processed using the web app. As such, you will need to do the following for the app to work:  

* Register for a MongoDB Atlas account,
* Create and deploy a database cluster,
* Create a database user so as to be able to access the cluster,
* Connect this web app to your cluster.

#### Register for a MongoDB Atlas account ####
1. Refer to this URL for considerations on setting up a new MongoDB Atlas account:   https://www.mongodb.com/docs/atlas/tutorial/create-atlas-account/  The instructions below are derived from the link above.
2. Navigate to the MongoDB Atlas login page.
3. Enter your email address.
4. Click **Next**.
5. Follow the prompts to log in to your account.

#### Create an Atlas Organization ####
If you are setting up your MongoDB account for the first time, you might be asked to create a new Organization and Project. To do so:
1. From the navigation bar, expand the **Organizations** menu, and click **View All Organizations**.
2. Click ***New Organization***, and in the prompt that appears, enter the name for the new organization.
3. Select **Atlas** and click ***Next***.
4. (Optional) Add the usernames of existing Atlas users with whom you would would like to share your database, and specify access permissions for these users.
5. Click ***Create Organization***.

More information on Atlas Organizations: https://www.mongodb.com/docs/atlas/tutorial/manage-organizations/#std-label-create-organization

#### Create a project ####
1. Navigate to the ***Create a Project*** page. Select it from the Organization from which you would like the new project to be created, click the **Leaf** icon in the upper left corner of the page, and click **New Project** at the upper right corner of the page.   Alternatively, you may expand the Projects menu in the navigation bar, and then click **+ New Project**.
2. Give your new project a name and click **Next**.
3. (Optional) Add collaborators and specify access as per Step 4 of the previous section.
4. Click ***Create Project***.

More information on Projects: https://www.mongodb.com/docs/atlas/tutorial/manage-projects/#std-label-create-project

#### Create a database ####
1. Navigate into the project you have just created, and click **Build a Database**.
2. Click **Shared**.
3. Under **Cloud Provider & Region**, select a preferred region.
4. Under **Cluster Tier**, select **M0 Sandbox**, which, at the time of writing, is **free forever**.
5. Should you choose **M2** and above in Step 3, under **Additional Settings**, you may decide whether to back up your data.
6. Under **Cluster Name**, give your cluster a name.
7. Click **Create Cluster**.
8. You will be redirected to the **Security Quickstart** screen.
9. Under "**How would you like to authenticate your connection?**", select **Username and Password**.
10. Create a new user using a username and password. It is strongly advised that your new username and password are different from that of your MongoDB cloud account. You may choose to **Autogenerate Secure Password**, if you like.
11. Under "**Where would you like to connect from?**", select **My Local Environment**, and then select **Add My Current IP Address** to give your local machine access to the database.
12. Click **Finish and Close**.

## Running the program ##


## About us ##