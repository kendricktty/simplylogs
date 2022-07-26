# SimplyLogs #
A working implementation can be found here: https://simplylogs-app.herokuapp.com/

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
* Installation

## Introduction ##
SimplyLogs is our attempt at creating a more user-friendly and powerful inventory tracking application. Our prototype aims to improve the experience and accessibility of inventory/asset tracking by automating key processes like serialising, invoice generation and accounting, introducing a cleaner, more aesthetically pleasing user interface, and allowing for easy customisation of item serial numbers commonly used to organise inventory items.

## Key features ##
* Dashboard - for users to view recent changes to their inventory, like orders and sales, at a glance.
* Clean, spacious UI - A modern user interface flanked with a sidebar menu, coloured buttons, graphic icons and reduced clutter provides a more pleasant user experience.
* User-customisable product ID - The ProductID field is user-customisable, allowing for users to create and implement unique IDs based on their business needs.
* Barcodes - Unique barcodes for each product can be generated to aid in stocktaking. The “generate” button generates a unique barcode storing information on the selected inventory item.
* Sales tracking - Detailed information on sales relating to each inventory item is listed on the Sales page. Users who prefer printable spreadsheets may generate a CSV or PDF representation of the sales data.
* Invoice generation - The app generates a standard invoice upon the successful placement of an order, so that the user does not have to manually.

## Dependencies ##
To build and run `SimplyLogs`, you will need:

* NodeJS.
* A MongoDB account.

## Installation ##

Before cloning this repository, do ensure that you have NodeJS installed on your machine. If you do not already have it installed, please visit the official NodeJS website for installation instructions: https://nodejs.org/en/download/

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
The backend application requires a custom-made `.env` file. Run the following command from the root directory of the project to create your new `.env` file:

* macOS/Linux: `touch .env`
* Windows: `echo.> .env`

You may leave your `.env` file blank for now as we move on to the next section.

### Setting up a database server ###
SimplyLogs relies on MongoDB Atlas, the cloud database storage offered by MongoDB, to persist any data processed using the web app. This is achieved using MongooseJS, a schema-based object modelling module. As such, you will need to do the following for the app to work:  

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

#### Linking the backend server with MongoDB using Mongoose ####
This step requires the use of the `.env` file created in an earlier section.

1. Completing Step 12 in the previous section brings you back to the **Database Deployments** screen. Click **Connect**.
2. Choose **Connect your application**.
3. Under "**Select your driver and version**", select **Node.js**, and version **2.2.12 or later**.
4. Take note of the connection string displayed under step 2 that should look something like this:   
   
   `mongodb://<user>:<password>@cluster0.ykwkgt1.mongodb.net/?retryWrites=true&w=majority`  
   
   Replace the generic `<user>` and `<password>` placeholders with your database user ID and password. 
5. In your `.env` file, add the following declaration:   
   `MONGO_URI=`
6. Copy and paste the connection string in Step 4 after the `=` sign at the end of the declaration. After that, remove `+srv` from the connection string. The result should look something like this:   `MONGO_URI=mongodb://<username>:<password>@ac-ce24sdf-shard-00-00.90fz97p.mongodb.net:27017,ac-ce24sdf-shard-00-01.90fz97p.mongodb.net:27017,ac-ce24sdf-shard-00-02.90fz97p.mongodb.net:27017/?ssl=true&replicaSet=atlas-1o28u5-shard-0&authSource=admin&retryWrites=true&w=majority
7. You are now ready to start up the program!

## Running the program ##

Open a terminal or Command Prompt window, `cd` to `inventoryapp-backend`, and then run the following command:
   
   `npm start`

## About this project ##
We're a group of students from Singapore Management University (SMU), and this project was completed as part of the SMU .Hack Enrichment Application Programme (HEAP) 2022.

## Disclaimer ##
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTH LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.