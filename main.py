import board
import adafruit_dht
import time
import RPi.GPIO as GPIO
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# PubNub configuration
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

# Configure the DHT sensor
dht_device = adafruit_dht.DHT22(board.D17)  # GPIO17 (physical pin 11)

# Configure GPIO for the relay
RELAY_PIN = 18  # GPIO18 (physical pin 12)
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# Initial state of the relay (off)
GPIO.output(RELAY_PIN, GPIO.HIGH)

# PubNub channel name
PUBNUB_CHANNEL = "thermochecker"

print("Reading from DHT22 sensor. Press Ctrl+C to exit.")

try:
    while True:
        try:
            # Read temperature and humidity
            temperature = dht_device.temperature
            humidity = dht_device.humidity

            if humidity is not None and temperature is not None:
                print(f"Temp: {temperature:.1f}°C  Humidity: {humidity:.1f}%")

                # Publish data to PubNub
                pubnub.publish().channel(PUBNUB_CHANNEL).message({
                    "temperature": round(temperature, 1),
                    "humidity": round(humidity, 1)
                }).pn_async(publish_callback)

                # Control the heating pad based on temperature
                if temperature < 23.0:
                    print("Temperature below 23°C. Turning ON heating pad.")
                    GPIO.output(RELAY_PIN, GPIO.LOW)  # Turn ON the relay
                else:
                    print("Temperature 23°C or above. Turning OFF heating pad.")
                    GPIO.output(RELAY_PIN, GPIO.HIGH)  # Turn OFF the relay
            else:
                print("Sensor returned None. Retrying...")
        
        except RuntimeError as error:
            # Catch errors and retry
            print(f"RuntimeError: {error.args[0]}. Retrying...")

        # Wait for 2 seconds before the next reading
        time.sleep(2)

except KeyboardInterrupt:
    print("\nExiting...")
finally:
    # Cleanup GPIO pins on exit
    GPIO.output(RELAY_PIN, GPIO.HIGH)  # Ensure the relay is off
    GPIO.cleanup()
    print("GPIO cleaned up.")