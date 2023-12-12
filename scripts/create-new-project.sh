#!/bin/bash
# Create a new standalone project
clasp create --rootDir ./src --title Accelerate-Recruitment-Processing > ./logs/arp.log

# Push changes to the project (Note: Will override remote project)
clasp push -f
deploy_date=$(date '+%Y-%m-%d %H:%M:%S')
clasp deploy -d "Main Branch $deploy_date" > ./logs/deploy.log # Response has Deployment ID & Version Number

# Store deployment id and version number for future use
# Note: While we do need the clasp.json, we can grab the deploy_id from clasp deployment
mv ./src/.clasp.json ./logs/.clasp.json
mv ./deploy.log ./logs/deploy.log

# TODO: Find a way to integrate into GitHub Actions
# Note that the deploy id needs to be hidden from public repository