## [This information comes from source: dordnung.de :](https://dordnung.de/raspberrypi-ledstrip/) Thanks!

</br>

# Introduction
I've already read a lot of tutorials explaining how to control a RGB LED-Strip with a Raspberry Pi. However, these were often unspecific, too technical, or even incorrect. Because of this I've written a short but simple tutorial explaining how to control a LED-Strip. This does not require much effort and even laymen should do it. After each step, there are also pictures of this one. The tutorial should work on all Raspberry Pi models and is available in English as well as in German.

I will show this with a RGB LED-Strip based on SMD5050 LED chips. Each of these chips contains a red, a green and a blue LED. Depending on which colors are activated, the result is a mixed color. If a specific color is set, typically the entire LED-Strip takes that one color.

There are also LED-Strips with SMD3528 LED chips. Each of these chips has exactly one LED and thus only one color, and every third chip usually has the same color. Therefore, SMD3528 LED-Strips cannot be used to create a mixed color, but they can still be controlled according to this tutorial.

The next possibility are LED-Strips with a WS281X controller (e.g. WS2812B), which are also known as Neopixel. They also have SMD5050 chips, which however can be controlled individually. But therefore, a different structure is required, which I'll explain here.

Caution: I'm not responsible for any damage to your LED-Strip or Raspberry Pi or any other damages. Do this at your own risk!

</br>

# What is needed?
Since I was often asked for purchase links, I will offer links for Amazon.com and eBay.com for the required components. Unfortunately, I cannot offer a link for all countries. Of course, local suppliers are also suitable.

The following components are required:
A RGB LED-Strip (with 3 pins for RGB and 1 pin for 12V DC) (Amazon.com | eBay.com)
A breadboard for plugging the components (Amazon.com | eBay.com)
Jumper wires (male to female) for the connection to the Raspberry Pi (Amazon.com | eBay.com)
Jumper wires (male to male) for connecting the components (Amazon.com | eBay.com)
Three N-channel MOSFETs (e.g. IRLZ34N) for controlling the LEDs (Amazon.com | eBay.com)
Important is a gate threshold voltage of max. 3.3V (Usually marked by an 'L' (Logic-Level) in the name)
A suitable power supply for the LED-Strip (12V DC ~2A) (Amazon.com | eBay.com)
A power jack (Amazon.com | eBay.com)
Has to fit with the power supply
I use one with screws, so I can connect the wires more easily
The software PiGPIO installed on the Raspberry Pi
The following packages have to be installed:
sudo apt-get install build-essential unzip wget
PiGPIO can be downloaded and installed via the command chain
wget http://abyz.co.uk/rpi/pigpio/pigpio.zip && unzip pigpio.zip && cd PIGPIO && sudo make install

</br>

# 1. Connecting the MOSFETs

The MOSFETs take over the actual control of the LED-Strip. I do not want to go into the technical details of a MOSFET, as an expert certainly can do this better, but rather describe briefly, how it controls the LED-Strip.

A MOSFET behaves like a switch, but can be controlled via the voltage at the so-called Gate input. If there is no voltage at the gate input, the MOSFET behaves like a very large resistor, which means that no current is flowing and the corresponding color on the LED-Strip will not lighten up. If, on the other hand, 3.3V is applied, the MOSFET behaves like a very small resistor and current can flow. In order for the MOSFET to be fully connected, it is important that it has a Gate Threshold Voltage of maximum 3.3V, as the LED-Strip otherwise will not light with full brightness. The Raspberry Pi now turns a MOSFET on and off very fast, whereby, depending on the speed, the optical effect is that a color seems darker or brighter. Each MOSFET thus controls one of the three colors. The resulting color results from how the brightness of the individual colors is set.

Now the MOSFET can be connected:
Looking at the (IRLZ34N) MOSFET from the front, then:
the first pin from the left is the Gate pin
the second pin is the Drain pin
the third pin is the Source pin
Now all three MOSFETs are plugged onto the breadboard
Then the source pins are connected to the ground bus of the breadboard

</br>

# 2. Connecting the LED-Strip
Next, the LED-Strip is connected to the MOSFETs:
For this, the Drain pin of a MOSFET is connected to one of the three colors of the LED-Strip
Also, a wire from the 12V pin of the LED-Strip is plugged into the supply voltage bus of the breadboard

</br>

# 3. Connecting the Raspberry Pi
Each color of the LED-Strip requires only one GPIO pin of the Raspberry Pi as well as a common ground pin.

Here is an overview of the GPIO pins of the Raspberry Pi:


First, one of the ground pins of the Raspberry Pi is connected to the ground bus of the breadboard
Also, for each color one of the green pins of the Raspberry Pi (see figure above) is connected to the Gate pin of a MOSFET
I will use the following pins:
GPIO17 for red
GPIO22 for green
GPIO24 for blue

</br>

# 4. Connecting the power jack
The power jack is required to enable a secure connection to the power supply. The LED-Strip can consume a few amperes of current, so never touch the wires in operation! It is also important to note that the Raspberry Pi and the LED-Strip need different power supplies and must never be supplied with the same!

One wire is screwed to the ground and one to the voltage contact of the power jack
The ground wire is connected to the ground bus of the breadboard
The voltage cable is connected analogously to the voltage bus of the breadboard
Then the power supply can be plugged into the power jack
Only then the power supply should be plugged into the socket!

</br>

# 5. Finished
That's it! Here are two pictures of the finished setup:

</br>

# 6. Testing
The LED-Strip can now be tested using the PiGPIO software. For this, the brightness of a color is set in a range from 0 (off) to 255 (full brightness).

With the following commands, in the Raspberry Pi terminal, you can light up the LED-Strip:
sudo pigpiod - Starts PiGPIO
pigs p 17 255 - The brightness of red (pin 17) is set to 100% and the LEDs should be red
pigs p 22 128 - The brightness of green (pin 22) is set to 50% and the LEDs should be yellow
pigs p 24 128 - The brightness of blue (pin 24) is set to 50% and the LEDs should be purple