import json

f = open("demofile3.txt", "w")
import requests
url = "https://filamentcolors.xyz/api/swatch/?format=json&page="
for i in range(1, 16):
    response = requests.get(url + str(i))
    contents = response.json()
    #contents = json.loads(response.json())
    _list = ["PRO", "+", "HTPLA", "Tough", "PolyMax"]
    for c in contents['results']:
        if any(word in str(c['filament_type']['name']) for word in _list):
            f.write(c['hex_color'] + ", " + str(c['mfr_purchase_link']) + ", " + str(c['amazon_purchase_link']) + ", " + str(c['filament_type']['name']) + ", " + str(c['manufacturer']['name']) +", " + str(c['manufacturer']['website'])  + "\n" )
f.close()