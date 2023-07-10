import os 
import sys

project_name = sys.argv[1]
environments = ['','']
environments[0] = 'table-development-' + project_name
environments[1] = 'table-production-' + project_name


for environment in environments:
        clasp_command = 'clasp create --type sheets --rootDir ./src --title ' + environment + ' > ./logs/' + environment + '.txt'
        os.system(clasp_command)
        os.system('mv ./src/.clasp.json ./logs/' + environment + '.clasp.json')