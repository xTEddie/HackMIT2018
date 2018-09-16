import io
import os
import urllib
from google.cloud import vision
from google.cloud.vision import types


def get_tags(file_name):
	# Instantiates a client
	client = vision.ImageAnnotatorClient()

	# Loads the image into memory
	with io.open(file_name, 'rb') as image_file:
		content = image_file.read()

	image = types.Image(content=content)

	# Performs label detection on the image file
	response = client.label_detection(image=image)
	labels = response.label_annotations

	ret = []
	for label in labels:
	    ret.append(label.description)
	return ret