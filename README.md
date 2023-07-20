# Table

## Install

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

From the root directory, create the development and production spreadsheet environment

Create a new development and production spreadsheet environment
`python scripts/new_environment.py project-name`

Deploy table development spreadsheet environment 
`python scripts/deploy-development.py project-name`

Deploy table production spreadsheet environment
`python scripts/deploy-production.py project-name`

View the table develoopment Google spreadsheet url:
`cat logs/table-development-project-name.txt`

View the table production Google spreadsheet url:
`cat logs/table-production-project-name.txt`

Visit the url in the logs directory

## How to use library
Create a versioned deployment of the library
1. Open your library script project.
2. At the top, click Deploy > Manage deployments.
3. Click on Create deployment
4. Click on the gear next to Select type
5. Click on Library
6. In the Version section, select New Version
7. In the Description, put in the library version
8. Click Deploy


Gain access to the library spreadsheet
    1. Contact the author of library spreadsheet and request at least view-level access.
Get Library script id
    1. In the library spreadsheet go to Extensions -> App Script
    2. Go to Project Settings and under IDs, copy Script ID
Add the library to your project spreadsheet
1. In your project spreadsheet go to Extensions -> App Script
2. At the left of the App Script editor, next to "Libraries", click Add a library
3. In the "Script ID" field, paste in the script ID of the library
4. Click Look up
5. Click the Version dropdown and select the version of the library to use.
6. In the "Identifier" field, set it to Table then you call a method of that library as follows:
Table.libraryMethod()
7. Click Add

Setup up Canvas
1. In the library spreadsheet go to Extensions -> App Script
2. At the left of menu bar, click on Project Settings
3. Under Script Properties, click on Add script property
4. In the Property field enter "canvas_api_key"
5. In the Value field enter your canvas api key
6. Click on Edit script properties
7. Click on Add script property
8. In the Property field enter "canvas_base_domain"
9. In the Value field enter you canvas base domain "https://xxxx.instructure.com/api/v1"
10. Click on Save script properties

Use the library
The reference documentation for an included library can be opened by following these steps:

At the left of the script editor, next to the library name, click More more_vert > Open in a new tab.

