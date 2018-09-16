import os 
import requests
from picamera import PiCamera
from time import sleep

WAIT_TIME = 1
camera = PiCamera()
max_count = 50
count = 0

# Server settings 
API_HOST = 'http://localhost:8000'
api_url = '{}/videoframe/new'.format(API_HOST)
camera_name = 'Pi Cam 1'
tag_name = 'gun'

data = dict(
    camera_name=camera_name,
    tag_name=tag_name
)

while count < max_count:
    camera.start_preview()
    sleep(WAIT_TIME)
    image_path = os.path.join('home','pi','Desktop','Active','image-{}.png'.format(count))
    camera.capture(image_path)

    # Send image to server 
    files = dict(
        file=open(image_path, 'rb')
    ) 
    response = requests.post(api_url, files=files, data=data, verify=False)
    print(response.status_code)

    camera.stop_preview()    
    count += 1


