import cv2
import os

# Read the image
img = cv2.imread(r"F:\Desktop\AICTE IBM Skill Build\mypic.jpg")

# Get the secret message and password from the user
msg = input("Enter secret message: ")
password = input("Enter a passcode: ")

# Initialize variables for embedding the message
height, width, _ = img.shape
msg_bin = ''.join(format(ord(c), '08b') for c in msg)  # Convert message to binary
msg_len = len(msg_bin)

# Check if image is large enough to hold the message
if msg_len > height * width * 3:
    print("Image is too small to hold the message!")
    exit()

# Embed the message into the image (LSB)
k = 0
for i in range(height):
    for j in range(width):
        if k < msg_len:
            for z in range(3):  # For each channel (RGB)
                pixel_val = img[i, j, z]
                img[i, j, z] = (pixel_val & 0xFE) | int(msg_bin[k])  # Set LSB to the bit
                k += 1
        else:
            break

# Save the encrypted image
cv2.imwrite("encryptedImage.jpg", img)

# Open the encrypted image
os.system("start encryptedImage.jpg")

# Get the passcode for decryption
pas = input("Enter passcode for Decryption: ")

# Decrypt the message if the passcode is correct
if password == pas:
    # Extract the binary message from the image (LSB)
    extracted_bin = ''
    for i in range(height):
        for j in range(width):
            for z in range(3):  # For each channel (RGB)
                extracted_bin += str(img[i, j, z] & 1)  # Extract LSB
    # Convert binary back to string
    message = ''
    for i in range(0, len(extracted_bin), 8):
        byte = extracted_bin[i:i+8]
        message += chr(int(byte, 2))
    print("Decrypted message: ", message)
else:
    print("YOU ARE NOT AUTHORIZED")
