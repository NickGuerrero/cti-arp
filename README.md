# Table

## Install
Install google api python client 
`python3 -m pip install google-api-python-client`

Install the gcloud CLI by following 
[google cloud instruction](https://cloud.google.com/sdk/docs/install#linux)

`gcloud auth application-default login --scopes=https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/iam.test`




Install [Clasp](https://github.com/google/clasp)

`npm install -g @google/clasp`

Then enable the Google Apps Script API: 

[https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)

Login to clasp: Default credentials saved to: ~/.clasprc.json.


`clasp login`

Clone the repository
`git clone https://github.com/xxxxxxxxxx/table.git`

`cd table`

From the root directory install the dependency
`npm install`


## Deploy the library
From the root directory, create the development and production spreadsheet environment

Create a new development and production spreadsheet environment
`python scripts/new_environment.py project-name`

Deploy/Redeploy table development spreadsheet environment 
`python scripts/deploy-development.py project-name`

Deploy/Redeploy table production spreadsheet environment
`python scripts/deploy-production.py project-name`

View the table develoopment Google spreadsheet url:
`cat logs/table-development-project-name.txt`

View the table production Google spreadsheet url:
`cat logs/table-production-project-name.txt`

Visit the url in a web browser

## Setup up Canvas
Generate canvas api key
https://xxxx.instructure.com/profile/settings

1. In the table library spreadsheet go to Extensions -> App Script
2. On the left side menu bar, click on Project Settings
3. Under Script Properties, click on Add script property
4. In the Property field enter "canvas_api_key"
5. In the Value field enter your canvas api key
6. Click on Edit script properties
7. Click on Add script property
8. In the Property field enter "canvas_base_domain"
9. In the Value field enter you canvas base domain "https://xxxx.instructure.com/api/v1"
10. Click on Save script properties

## Import the library to your project spreadsheet
Contact the author of the table library spreadsheet and request at least view-level access.
1. In the table library click on the share button


Add the table library to your project spreadsheet

1. a. Get the table development library script id
`cat logs/table-development-project-name.clasp.json`

   b. Get the table production library script id
`cat logs/table-production-project-name.clasp.json `

2. In the project spreadsheet, go to Extensions -> App Script
3. On the left of the App Script Editor, Next to "Libraries", Click on Add a library
4. In the "Script ID" field, paste in the script ID of the table library
5. Click Look up
5. Click the Version dropdown and select the version of the library to use.
6. In the "Identifier" field, set it to "Table"
7. Click Add

## How to use library
You call a method of from the table library as follows:
`Table.libraryMethod()`

The reference documentation for the table library can be opened by following these steps:
At the left of the script editor, next to the library name, click More vertical dots > Open in a new tab.