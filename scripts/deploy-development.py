import os 
import sys

project_name = sys.argv[1]
environment = 'table-development-' + project_name


os.system('cp ./scripts/' + environment +'.clasp.json ./.clasp.json')
os.system('clasp push')     
os.system('clasp deploy >> ./scripts/' + environment + '-deploy.txt')   
os.system('clasp status --json > ./scripts/' + environment + '-deploy-status.json')