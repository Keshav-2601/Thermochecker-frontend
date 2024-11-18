import adafruit_dht
import board
import time
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

# Initialize the DHT22 sensor
dht_device = adafruit_dht.DHT22(board.D17)

# Configure PubNub with UUID
pnconfig = PNConfiguration()
pnconfig.publish_key = "pub-c-006ed63e-75db-496c-84cb-3730599207ad"
pnconfig.subscribe_key = "sub-c-3f839898-4bca-4559-93e5-44187b29f3aa"
pnconfig.uuid = "testUser1"
pubnub = PubNub(pnconfig)

def publish_callback(result, status):
    if not status.is_error():
        print("Data published successfully!")
    else:
        print("Failed to publish data:", status.error_data.information)
try:
    temperature = dht_device.temperature
    humidity = dht_device.humidity

    if temperature is not None and humidity is not None:
        temperature_value = temperature
        humidity_value = humidity
        print(f"Temperature: {temperature_value:.1f}°C")
        print(f"Humidity: {humidity_value:.1f}%")

        pubnub.publish().channel("pi_channel").message({
            "temperature": temperature_value,
            "humidity": humidity_value
        }).pn_async(publish_callback) 
        print("Publish request sent.")  

    else:
        print("Failed to retrieve data from the sensor")  
    
    print("Temperature and Humidity:", temperature, humidity)

except RuntimeError as error:
    
    if error.args:
        print(f"Error reading sensor: {error.args[0]}")
    else:
        print("Error reading sensor: No additional error details available.")

except Exception as error:
    print("An unexpected error occurred:", error)


del dht_device
