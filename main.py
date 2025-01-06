import board
import adafruit_dht
import time
import RPi.GPIO as GPIO

# Configure the DHT sensor
dht_device = adafruit_dht.DHT22(board.D17)  # GPIO17 (physical pin 11)

# Configure GPIO for the relay
RELAY_PIN = 18  # GPIO18 (physical pin 12)
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)

# Initial state of the relay (off)
GPIO.output(RELAY_PIN, GPIO.HIGH)

print("Reading from DHT22 sensor. Press Ctrl+C to exit.")

try:
    while True:
        try:
            # Read temperature and humidity
            temperature = dht_device.temperature
            humidity = dht_device.humidity

            if humidity is not None and temperature is not None:
                print(f"Temp: {temperature:.1f}°C  Humidity: {humidity:.1f}%")

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