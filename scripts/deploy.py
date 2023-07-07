import os 

environment = 'table-development'

os.system('cp ./scripts/' + environment +'.clasp.json ./.clasp.json')
os.system('clasp push')