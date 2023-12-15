These scripts are used to create a new project, deploy new versions, and fetch HEAD changes from the Google Apps Script
Online Editor. For the latter two functions, you'll need the appropriate .clasp.json file (and account permissions).
Currently, .clasp.json is stored in the logs folder (as it's generated from a response).

Notes:
- Project uses JS files, as it allows use of the Google Script Online Editor (especially useful for debugging). Perhaps a future release will make Typescript development easier. See: https://github.com/google/clasp/blob/master/docs/typescript.md