import RPi.GPIO as GPIO
import time
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from dotenv import load_dotenv
import os


load_dotenv()

KY028_DO_PIN = 17

RELAY_PIN = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(KY028_DO_PIN, GPIO.IN)
GPIO.setup(RELAY_PIN, GPIO.OUT)


pnconfig = PNConfiguration()
pnconfig.publish_key = os.getenv("PUBNUB_PUBLISH_KEY")
pnconfig.subscribe_key = os.getenv("PUBNUB_SUBSCRIBE_KEY")
pnconfig.uuid = os.getenv("PUBNUB_UUID")

pubnub = PubNub(pnconfig)

def publish_callback(result, status):
    if not status.is_error():
        print("Data published successfully!")
    else:
        print("Failed to publish data:", status.error_data.information)

try:
    
    threshold = 23

    temperature_status = GPIO.input(KY028_DO_PIN)

    if temperature_status == GPIO.LOW:
        print(f"Temperature is below {threshold}°C. Heater ON.")
        heater_status = "Heater ON"
        GPIO.output(RELAY_PIN, GPIO.HIGH)  
    else:
        print(f"Temperature is above {threshold}°C. Heater OFF.")
        heater_status = "Heater OFF"
        GPIO.output(RELAY_PIN, GPIO.LOW) 

    pubnub.publish().channel("pi-channel").message({
        "temperature_status": "Low" if temperature_status == GPIO.LOW else "High",
        "heater_status": heater_status
    }).pn_async(publish_callback)

    print("Publish request sent.")

except KeyboardInterrupt:
    print("Program stopped by the user.")

except Exception as error:
    print(f"An unexpected error occurred: {error}")

finally:
    GPIO.cleanup()
