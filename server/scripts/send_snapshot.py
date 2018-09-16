import os
import requests

API_HOST = 'http://localhost:8000'

api_url = '{}/videoframe/new'.format(API_HOST)
image_file = 'test.jpg'
image_path = os.path.join('media', 'images', image_file)
camera_name = 'Pi Cam 1'
tag_name = 'gun'

image_byte = open(image_path, 'rb')
data = dict(
    camera_name=camera_name,
    tag_name=tag_name
)
files = {'file': image_byte}
response = requests.post(api_url, files=files, data=data, verify=False)
print(response.status_code)