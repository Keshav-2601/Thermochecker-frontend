import time
import board
import adafruit_dht
import RPi.GPIO as GPIO

# Setup for LED and DHT22
LED_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)

# Initialize the DHT device, with data pin connected to:
dhtDevice = adafruit_dht.DHT22(board.D4)  # Replace 'D4' with the correct pin if needed

try:
    while True:
        try:
            # Print the values to the serial port
            temperature = dhtDevice.temperature
            humidity = dhtDevice.humidity
            print(f"Temp: {temperature:.1f} C  Humidity: {humidity:.1f}% ")

            if temperature > 40:
                print("Temperature is above 40°C, LED blinking...")
                GPIO.output(LED_PIN, GPIO.HIGH)
                time.sleep(1)
                GPIO.output(LED_PIN, GPIO.LOW)
                time.sleep(1)
            else:
                print("Temperature is below 40°C, LED off")
                GPIO.output(LED_PIN, GPIO.LOW)
                time.sleep(1)

        except RuntimeError as e:
            # Errors happen fairly often, DHT's are hard to read, just keep going
            print("Reading from DHT failure: ", e.args)
            time.sleep(2.0)
        except Exception as error:
            dhtDevice.exit()
            raise error

finally:
    GPIO.cleanup()  # Make sure you clean up GPIO on exit
