#!/bin/bash
# Goal: Fetch whatever's in the head repository and move it to a branch on the repository
# The branch should be the same every time, if ran multiple times, it will always be the same branch

# Create a new branch to store Clasp HEAD changes (Not a Git Branch Head)
git branch -f HEAD-Changes
git checkout HEAD-Changes

# Connect these changes
clasp pull
git add .
git commit -m "Fetch data from Clasp Head" --allow-empty

# Note: There was consideration to push the branch to the remote repository, but it makes more sense to
# operate maintenance locally, and use the GitHub repository as the back-up & source.