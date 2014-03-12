'''
Created on 12.03.2014

@author: heinz-peterlang
'''
import requests
import json

url = 'https://biohunterp1940459638trial.hanatrial.ondemand.com/biohunter/PersistenceWithJPAServlet'

data = {'longitude': '45,23',
        'latitude': '12,32',
        'captureDate': '2014-03-12',
        'userId': '10',
        'description': 'hello world',
        'score': '23.4',
        'imageUrl': 'http://irgendwas',
        'qrCode': 'nix'}

headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'text/plain'}
r = requests.post(url, data=data, headers=headers)
print r.text