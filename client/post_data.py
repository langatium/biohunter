'''
Created on 12.03.2014

@author: heinz-peterlang
'''
import requests
import json

url = 'https://biohunterp1940459638trial.hanatrial.ondemand.com/biohunter/BarcodeDataServlet'

data = {'longitude': '45,23',
        'latitude': '12,32',
        'captureDate': '2014-03-12',
        'userId': '10',
        'description': 'hello world',
        'score': '23.4',
        'imageUrl': 'http://irgendwas',
        'qrCode': 'EMBL_SAMPLE_03'}

data = [{'longitude': '52.408892',
        'latitude': '9.853201',
        'captureDate': '2014-03-12',
        'userId': '1',
        'description': 'place 1',
        'score': '23.4',
        'imageUrl': 'http://irgendwas',
        'qrCode': 'EMBL_SAMPLE_03'},
#         {'longitude': '52.345892',
#         'latitude': '9.73201',
#         'captureDate': '2014-03-12',
#         'userId': '2',
#         'description': 'place 2',
#         'score': '23.4',
#         'imageUrl': 'http://irgendwas',
#         'qrCode': 'EMBL_SAMPLE_03'},
#         {'longitude': '52.38892',
#         'latitude': '9.700201',
#         'captureDate': '2014-03-12',
#         'userId': '3',
#         'description': 'place 3',
#         'score': '23.4',
#         'imageUrl': 'http://irgendwas',
#         'qrCode': 'EMBL_SAMPLE_03'},
        ]


# url = 'https://biohunterp1940459638trial.hanatrial.ondemand.com/biohunter/UserServlet'
# 
# users = [{'userName': 'Ben', 'description': 'hello world'},
#         {'userName': 'Bernd', 'description': 'hello world'},
#         {'userName': 'Chad', 'description': 'hello world'},
#         {'userName': 'David', 'description': 'hello world'},
#         {'userName': 'Ehsan', 'description': 'hello world'},
#         {'userName': 'Heinz', 'description': 'hello world'},
#         {'userName': 'Monika', 'description': 'hello world'},
#         {'userName': 'Patrick', 'description': 'hello world'},
#         {'userName': 'Niraj', 'description': 'hello world'},
#         {'userName': 'Romil', 'description': 'hello world'},]

headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'text/plain'}
 
for d in data: 
    r = requests.post(url, data=d, headers=headers)
    print r.text
    
# r = requests.get(url, params={'userId': '9'})
# print r.text