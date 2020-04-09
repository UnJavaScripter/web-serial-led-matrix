#include "LedControl.h"
#include "binary.h"

/*
  DIN connects to pin 12
  CLK connects to pin 11
  CS connects to pin 10
*/
LedControl lc = LedControl(7, 6, 5, 1);

byte incomingByte[3]; // for incoming serial data

void setup() {
  Serial.begin(9600);
  lc.shutdown(0, false);
  lc.setIntensity(0, 1);
  clear();
}

void loop() {
  handleSerial();
}

void handleSerial() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    Serial.readBytes(incomingByte, 3);
    
    if(incomingByte[0] == 99 && incomingByte[1] == 108 && incomingByte[2] == 115) {
      clear();
      return;
    }

    if (incomingByte[0] == 10) {
      return;
    }

    if (incomingByte[0] + incomingByte[2] >= 96 && incomingByte[0] + incomingByte[2] <= 110) {
      if (incomingByte[1] != 44) {
       Serial.println("Wrong separator. Use comma ',' instead: 'col,row'.");
        return;
      }
      
      int col = incomingByte[0] - 48;
      int row = incomingByte[2] - 48;
      paint(col, row);
    } else {
      Serial.println("Index out of bounds. Use numbers from 0 to 7 for both 'row' and 'column' numbers.");
      return;
    }
  }
}

void paint(int col, int row) {
  lc.setLed(0, col, row, HIGH);
}

void clear() {
  lc.clearDisplay(0);
}

