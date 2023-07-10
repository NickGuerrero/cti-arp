import os 
import sys

project_name = sys.argv[1]
environment = 'table-development-' + project_name


os.system('cp ./logs/' + environment +'.clasp.json ./.clasp.json')
os.system('clasp push')     
os.system('clasp deploy >> ./logs/' + environment + '-deploy.txt')   
os.system('clasp status --json > ./logs/' + environment + '-deploy-status.json')