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

A fully functioning hosted demo of this application can be found here: https://simplylogs-app.herokuapp.com/

## Key features ##
* Dashboard - for users to view recent changes to their inventory, like orders and sales, at a glance.
* Clean, spacious UI - A modern user interface flanked with a sidebar menu, coloured buttons, graphic icons and reduced clutter provides a more pleasant user experience.
* User-customisable product ID - The ProductID field is user-customisable, allowing for users to create and implement unique IDs based on their business needs.
* Barcodes - Unique barcodes for each product can be generated to aid in stocktaking. The “generate” button generates a unique barcode storing information on the selected inventory item.
* Sales tracking - Detailed information on sales relating to each inventory item is listed on the Sales page. Users who prefer printable spreadsheets may generate a CSV or PDF representation of the sales data.
* Invoice generation - The app generates a standard invoice upon the successful placement of an order, so that the user does not have to manually.

## Installation ##

Before cloning this repository, do ensure that you have NodeJS installed on your machine. If you do not already have it installed, please visit the official NodeJS website for installation instructions: https://nodejs.org/en/download/

1. Open a new Terminal window, `cd` into a directory of your choice, and clone the repository:

    `git clone https://github.com/kendricktty/group17_projmamadiam`

    Alternatively, use the GitHub UI to download the repository to a directory of your choice.

2. Install the NodeJS dependencies for the backend server using this command:

    `npm install`

3. After setting up the backend server, `cd` into the `client` folder and repeat Step 3.

4. In the root of the project directory create a `.env` file and populate with your `MONGO_URI`, `JWT_SECRET` using https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx and set `JWT_LIFETIME=30d`.

5. Open a second terminal window, `cd` into the root of the project directory and run `npm start`. **It is imperative to run this step first before running Step 6.**
   
6. In the first terminal window, while still working from the `client` directory, run `npm start`.

## About this project ##
We're a group of students from Singapore Management University (SMU), and this project was completed as part of the SMU .Hack Enrichment Application Programme (HEAP) 2022.

## Disclaimer ##
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTH LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.