import adafruit_dht
import board
import time

dht_device = adafruit_dht.DHT22(board.D17)

try:
    
    temperature = dht_device.temperature
    humidity = dht_device.humidity

    if temperature is not None and humidity is not None:
        # Store the values in variables
        temperature_value = temperature
        humidity_value = humidity
        print(f"Temperature: {temperature_value:.1f}°C")
        print(f"Humidity: {humidity_value:.1f}%")
    else:
        print("Failed to retrieve data from the sensor")
    
    print("temperature and Humidity is :",temperature,humidity);

except RuntimeError as error:
   
    print(f"Error reading sensor: {error.args[0]}")

except Exception as error:
   
    dht_device.exit()
    print("An error occurred:", error)

dht_device.exit()
