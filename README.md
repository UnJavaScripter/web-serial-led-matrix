# Web Serial API

A demo showing the basics of Web Serial API to connect a browser with serial devices.

Check out the blog post on Web Serial API to learn more about it.

## TL;DR

This is demo uses the Web Serial API to control an 8x8 LED matrix using the MAX7219 integrated circuit connected to an Arduino. Wire up your LED matrix to your Arduino using the following pin configuraion:

``` 
 CS  -> pin 5 
 CLK -> pin 6
 DIN -> pin 7
 VCC -> 5V
 GND -> GND
 ``` 

1. Upload the code in `./web_serial_led_matrix.ino` to your Arduino device
1. Wire up your Arduino and LED matrix, then connect it to your computer
1. Enable Chrome's **Experimental Web Platform Features** by visiting [chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)
    > You can skip this part if you're using the hosted version. It includes an [Origin Trial Token](https://www.chromium.org/blink/origin-trials)
1. Run the demo app locally and open it in your browser (Chrome 80+)
1. Use the "Connect to serial port button" of the web app to connect to the right port
1. Go crazy drawing using the canvas
1. Be amazed by the powers of the web platform
