# NodeJS_RaspPI_Ledstrip
 ESP32 and ESP8266 Async Webserver

&nbsp;<br>
[
    ![Open source](
        https://img.shields.io/badge/Open%20Source-Yes-green?style=plastic
    )
    ](
        https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver
    )
[
    ![License: Mit](
        https://img.shields.io/badge/license-MIT-green.svg?style=plastic)
    ](
        https://en.wikipedia.org/wiki/MIT_License
    )
[
    ![Contributors](
        https://img.shields.io/github/contributors/dannyvanlierop/Cpp_ESPX_Async_Webserver?style=plastic)
    ](
        https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver/graphs/contributors
    )
[
    ![Forks](
        https://img.shields.io/github/forks/dannyvanlierop/Cpp_ESPX_Async_Webserver?style=plastic)
    ](
        https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver/network/members
	)
[
    ![Stars](
        https://img.shields.io/github/stars/dannyvanlierop/Cpp_ESPX_Async_Webserver?style=plastic)
  ](
        https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver/stargazers
	)
[
    ![Issues](
        https://img.shields.io/github/issues/dannyvanlierop/Cpp_ESPX_Async_Webserver?style=plastic)
  ](
        https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver/issues
	)

&nbsp;<br>
## Use:
<hr>

Upload ino file to your device.

&nbsp;<br>
## License:
<hr>

For more details,
see the [LICENSES](https://github.com/dannyvanlierop/Cpp_ESPX_Async_Webserver/blob/master/LICENSE) file.

<br>&nbsp;








</br>

# Introduction
I've already read a lot of tutorials explaining how to control a <b>RGB LED-Strip</b> with a Raspberry Pi. However, these were often unspecific, too technical, or even incorrect. Because of this I've written a short but simple tutorial explaining how to control a LED-Strip. This does not require much effort and even laymen should do it. After each step, there are also pictures of this one. The tutorial should work on all <b>Raspberry Pi</b> models.

I will show this with a RGB LED-Strip based on <b>SMD5050</b> LED chips. Each of these chips contains a red, a green and a blue LED. Depending on which colors are activated, the result is a mixed color. If a specific color is set, typically the entire LED-Strip takes that one color.

There are also LED-Strips with <b>SMD3528</b> LED chips. Each of these chips has exactly one LED and thus only one color, and every third chip usually has the same color. Therefore, SMD3528 LED-Strips cannot be used to create a mixed color, but they can still be controlled according to this tutorial.

The next possibility are LED-Strips with a WS281X controller (e.g. WS2812B), which are also known as Neopixel. They also have SMD5050 chips, which however can be controlled individually. But therefore, a different structure is required.

<b>Caution:</b> I'm not responsible for any damage to your LED-Strip or Raspberry Pi or any other damages. <b>Do this at your own risk!</b>

</br>

# What is needed?
Since I was often asked for purchase links, I will offer links for Amazon.com and eBay.com for the required components. Unfortunately, I cannot offer a link for all countries. Of course, local suppliers are also suitable.

The following components are required:

- A RGB LED-Strip (with <b>3 pins for RGB</b> and <b>1 pin for 12V DC</b>) ([Amazon.com](https://amzn.to/2zBZDTa) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2F5M-RGB-5050-Waterproof-LED-Strip-light-SMD-44-Key-Remote-12V-US-Power-Full-Kit-%2F252791261220))
- A breadboard for plugging the components ([Amazon.com](https://amzn.to/2l1aSSd) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FSolderless-Breadboard-Protoboard-2-buses-Tie-point-830-%2F270763676246))
- Jumper wires (male to female) for the connection to the Raspberry Pi ([Amazon.com](https://amzn.to/2yAR8JM) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2F40-Wire-40p-Male-Female-Breadboard-Jumper-Ribbon-Wires-20cm-for-Arduino-US-SHIP-%2F171306379102))
- Jumper wires (male to male) for connecting the components ([Amazon.com](http://amzn.to/2DDdGJV) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FMale-to-Male-Solderless-Flexible-Breadboard-Jumper-Cable-Wires-60Pcs-for-Arduino-%2F322643398340))
- Three N-channel MOSFETs (e.g. <b>IRLZ34N</b>) for controlling the LEDs ([Amazon.com](https://amzn.to/2id8Fyv) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2F5Pcs-IRLZ44N-PBF-Power-MOSFET-Logic-Level-N-Channel-0-022OHM-TO-220-IC-Chip-%2F272567929266))
    - Important is a gate threshold voltage of max. 3.3V</br>
    (Usually marked by an 'L' (Logic-Level) in the name)

- A suitable power supply for the LED-Strip (<b>12V DC ~2A</b>) ([Amazon.com](https://amzn.to/2xREu5l) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2F12V-2A-24W-AC-to-DC-Adapter-Power-Supply-for-5050-Flexible-LED-Light-Strip-3528%2F391128328033))
- A power jack ([Amazon.com](http://amzn.to/2GmNo0o) | [eBay.com](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5338083477&mpre=https%3A%2F%2Fwww.ebay.com%2Fitm%2FDC-Power-Female-Plug-Jack-Adapter-Connector-Socket-Plug-for-LED-Strip-Light%2F201483627692))
    - Has to fit with the power supply
    - I use one with screws, so I can connect the wires more easily

- The software [<b>PiGPIO</b>](http://abyz.co.uk/rpi/pigpio/download.html) installed on the Raspberry Pi
    - The following packages have to be installed:</br>
    `sudo apt-get install build-essential unzip wget`
    - PiGPIO can be downloaded and installed via the command chain</br>
    `wget http://abyz.co.uk/rpi/pigpio/pigpio.zip && unzip pigpio.zip && cd PIGPIO && sudo make install`
    
</br>

# 1. Connecting the MOSFETs

The MOSFETs take over the actual control of the LED-Strip. I do not want to go into the technical details of a MOSFET, as an expert certainly can do this better, but rather describe briefly, how it controls the LED-Strip.

A <b>MOSFET</b> behaves like a switch, but can be controlled via the voltage at the so-called Gate input. If there is no voltage at the <b>gate</b> input, the MOSFET behaves like a very large resistor, which means that no current is flowing and the corresponding color on the LED-Strip will not lighten up. If, on the other hand, 3.3V is applied, the MOSFET behaves like a very small resistor and current can flow. In order for the MOSFET to be fully connected, it is important that it has a </b>Gate Threshold Voltage</b> of maximum 3.3V, as the LED-Strip otherwise will not light with full brightness. The Raspberry Pi now turns a MOSFET on and off very fast, whereby, depending on the speed, the optical effect is that a color seems darker or brighter. Each MOSFET thus controls one of the three colors. The resulting color results from how the brightness of the individual colors is set.

Now the MOSFET can be connected:
  - Looking at the (IRLZ34N) MOSFET <b>from the front</b>, then:
    - the first pin from the left is the <b>Gate</b> pin
    - the second pin is the <b>Drain</b> pin
    - the third pin is the<b>Source</b> pin
  - Now all three MOSFETs are plugged onto the breadboard
  - Then the source pins are connected to the ground bus of the breadboard

</br>

# 2. Connecting the LED-Strip
Next, the LED-Strip is connected to the MOSFETs:
For this, the <b>Drain</b> pin of a MOSFET is connected to one of the three colors of the LED-Strip
Also, a wire from the 12V pin of the LED-Strip is plugged into the supply voltage bus of the breadboard

</br>

# 3. Connecting the Raspberry Pi
Each color of the LED-Strip requires only one GPIO pin of the Raspberry Pi as well as a common ground pin.

Here is an overview of the GPIO pins of the Raspberry Pi:


First, one of the ground pins of the Raspberry Pi is connected to the ground bus of the breadboard
Also, for each color one of the green pins of the Raspberry Pi (see figure above) is connected to the <b>Gate</b> pin of a MOSFET
  - I will use the following pins:
    - GPIO17 for red
    - GPIO22 for green
    - GPIO24 for blue

</br>

# 4. Connecting the power jack
The power jack is required to enable a secure connection to the power supply. The LED-Strip can consume a few amperes of current, so <b>never touch</b> the wires in operation! It is also important to note that the Raspberry Pi and the LED-Strip need <b>different power supplies</b> and must never be supplied with the same!

- One wire is screwed to the ground and one to the voltage contact of the power jack
- The ground wire is connected to the ground bus of the breadboard
- The voltage cable is connected analogously to the voltage bus of the breadboard
- Then the power supply can be plugged into the power jack
- <b>Only</b> then the power supply should be plugged into the socket!

</br>

# 5. Finished
That's it! Here are two pictures of the finished setup:

</br>

# 6. Testing
The LED-Strip can now be tested using the <b>PiGPIO</b> software. For this, the brightness of a color is set in a range from 0 (off) to 255 (full brightness).

With the following commands, in the Raspberry Pi terminal, you can light up the LED-Strip:
- `sudo pigpiod` - Starts PiGPIO
- `pigs p 17 255` - The brightness of red (pin 17) is set to 100% and the LEDs should be red
- `pigs p 22 128` - The brightness of green (pin 22) is set to 50% and the LEDs should be yellow
- `pigs p 24 128` - The brightness of blue (pin 24) is set to 50% and the LEDs should be purple

# What's next?

Now you can do nearly everything with your RGB LED-Strip. For example, use <b>Python</b> to light up the LED-Strip, which can also be done with the PiGPIO software.

The brightness of a color can be set with the following commands, where <b>BRIGHTNESS</b> should be specified in the range from 0 to 255, as already mentioned, and <b>PIN</b> is set to the GPIO pin number of one of the three colors. Here is a code example:


    import pigpio
    pi = pigpio.pi()
    pi.set_PWM_dutycycle(PIN, BRIGHTNESS)
    …
    pi.stop()


