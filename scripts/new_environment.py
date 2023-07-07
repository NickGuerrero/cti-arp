import os 

environments = ['table-development', 'table-production']


for environment in environments:
        clasp_command = 'clasp create --type sheets --rootDir ./src --title ' + environment + ' > ./scripts/' + environment + '.txt'
        os.system(clasp_command)
        os.system('mv ./src/.clasp.json ./scripts/' + environment + '.clasp.json')