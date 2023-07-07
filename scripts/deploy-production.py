import os 

environments = ['table-production']


for environment in environments:
        os.system('cp ./scripts/' + environment +'.clasp.json ./.clasp.json')
        os.system('clasp push')