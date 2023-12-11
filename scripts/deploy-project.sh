#!/bin/bash
# NOTE: This creates a new version, it DOES NOT replace the current deployment or published version
# It is possible to update the current deployment_id/version remotely, but it's very fragile (& somewhat insecure)
# Reference: https://github.com/google/clasp/issues/63#issuecomment-603660004
# To update version after deploying, manually change the version on the scripts you're using.
# Remember to periodically clear out old versions, all versions stem from this repository, so there's no reason to
# hold on to old versions.

cp ./logs/.clasp.json ./.clasp.json # Retrieve the clasp.json
clasp push
current_deployment=$(clasp deployments | tail -n1 | cut -d' ' -f2) # From https://github.com/google/clasp/issues/752
clasp deploy --deploymentId "${current_deployment}" >> './logs/arp-deploy.log'
clasp status >> './logs/arp-deploy.log/'
rm ./.clasp.json # Remove clasp.json from main directory