from gpiozero import LED
from time import sleep

# Initialize the LED on GPIO17
led = LED(17)

# Blink the LED
while True:
    led.on()    # Turn LED on
    print("LED is ON")
    sleep(1)    # Wait for 1 second
    led.off()   # Turn LED off
    print("LED is OFF")
    sleep(1)    # Wait f