# CRM-Dashboard [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is a collabaration between Hudson Pepper (https://github.com/hudsonpepper), Ryan Hemlock (https://github.com/rhemlock7) and Brendan Daly (https://github.com/bdaly101).

This applicaztion is a basic CRM (customer relationship management) that allows users to store contact information in a database, as well as store custom notes about that contact that they can add, delete and edit. The user can also view the total number of contacts as well as the number of contacts added for that day and a graaph showing how those numbers have changed over time.

The deployed site can be accessed at: https://crm-dashboard-dab4d4caa095.herokuapp.com/login

## User Story
	```
	AS A Professional with a large network and many contacts
	I WANT to be able to keep track of my contacts as well as information about them and data about how I am growing my network
	SO THAT I store important information about my contacts and get better insight as to how well I am growing my network
	```
## Acceptance Criteria
	```
	GIVEN I store contact information and view data about my network
	THEN I need to create a CRM 
	WHEN I go to the login page 
	THEN I with a sign-up and login option
	WHEN I use the sign-up option
	THEN a new user profile is created with the username, name, last name, email and password I entered
	WHEN I use the login option
	THEN I enter my saved username and password
	WHEN I login
	THEN I am presented a table of saved contacts with the contact's name, email, phone number, company and the last time I made changes to that contact's information
	WHEN I select a contact
	THEN I am given the option to delete that contact
	WHEN I click on the "Create Contact" button
	THEN I am given the option to create a new contact and enter their name, email, phone number and company
	WHEN I click on a contact's name
	THEN I am brought to that contact's information page
	WHEN I enter a note into the note text box and click "Enter"
	THEN a new note is created for that contact
    WHEN I click the "Delete" button under the note
	THEN the note is deleted
    WHEN I click the "Edit" button under the note
	THEN I can edit the note and the changes are saved
    WHEN I click the "CRM" button at the top of the page
	THEN I am directed back to the table of contacts
    WHEN I click the "Dashboard" button at the top of the page
	THEN I am directed to a graph that displays the total number of my contacts and the number of contacts I have added today
    WHEN I click the "Logout" button at the top of the page
	THEN I am logged out of my profile and redirected back to the login/ sign-up page
	```
## Technologies Used:

1. HTML
2. CSS
3. JavaScript
4. Node.js
5. Tailwind CSS
6. Express
7. Heroku
8. JAWSDB (Heroku add-on)
9. ApexCharts
10. GitHub
11. Handlebars
12. mysql
13. Sequalize
14. nodemon

## Credit

We would like to credit the creators of the technologies used above. 