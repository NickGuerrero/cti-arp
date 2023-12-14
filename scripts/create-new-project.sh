#!/bin/bash
# Create a new standalone project
clasp create --rootDir ./src --type standalone --title Accelerate-Recruitment-Processing > ./logs/arp.log
mv ./src/.clasp.json ./.clasp.json

# Push changes to the project (Note: Will override remote project)
clasp push -f
deploy_date=$(date '+%Y-%m-%d %H:%M:%S')
clasp deploy -d "Main Branch $deploy_date" > ./logs/deploy.log # Response has Deployment ID & Version Number

# Store deployment id and version number for future use
mv ./.clasp.json ./logs/.clasp.json

# TODO: Find a way to integrate into GitHub Actions
# Note that the deploy id needs to be hidden from public repository