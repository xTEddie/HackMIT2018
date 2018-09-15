from picamera import PiCamera
from time import sleep

camera = PiCamera()
bob=0
while bob<50:
    camera.start_preview()
    sleep(1)
    camera.capture('/home/pi/Desktop/Active/image-{}.jpg'.format(bob))
    camera.stop_preview()
    #a=os.path.join('home','pi','Desktop','Active','image.png')
    bob+=1


