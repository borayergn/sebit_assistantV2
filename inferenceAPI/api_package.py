from inference import Inference
key = "l3v1qaU.s3cPp6IfIJYqKA7BwJ_wzA"

a = Inference(api_key=key)

print(a)
print("User id is {}".format(a.getUser()))

# response = a.predict("Rauntu nereden satın alabilirim")

# print(response)