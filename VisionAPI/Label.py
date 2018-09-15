
def labels(path):
	import io
	import os

	# Imports the Google Cloud client library
	from google.cloud import vision
	from google.cloud.vision import types

	import urllib

	# Instantiates a client
	client = vision.ImageAnnotatorClient()

	# The name of the image file to annotate
	file_name = os.path.join(
	    os.path.dirname(__file__), path)

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