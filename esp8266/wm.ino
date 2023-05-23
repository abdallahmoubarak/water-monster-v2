#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClientSecureBearSSL.h>

#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
const int ECHOPIN = 4; //D2
const int TRIGPIN = 5; //D1
int temp_value=0;
int distance = 0;
int sec = 1000;
int interv = 1800;
int base_interv=0;
String serial_number=String("ttosna13rMeWer53b76d879228026fc41aff0b19a67502930dc0536017c550a0dd8f772281d46dWM13");


const char* ssid = "Abdallah"; // The SSID (name) of the ZWi-Fi network you want to connect to
const char* password = "Abdallah1234"; // The password of the Wi-Fi network
String END_POINT = "https://wm02.vercel.app/api/distance";

ESP8266WiFiMulti WiFiMulti;

void setup() {

  Serial.begin(9600);
  // Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 30; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFiManager wifiManager;
Serial.println("Conecting.....");
wifiManager.autoConnect("Water-Monster","oiafdjoih2380jofisa");
Serial.println("connected");


  pinMode(ECHOPIN, INPUT);
  pinMode(TRIGPIN, OUTPUT);
  
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    //client->setFingerprint(fingerprint);
    client->setInsecure();

    HTTPClient https;


    distance = check_distance();
    String string_distance = String(distance);
    Serial.println(String(string_distance+"%"));

    base_interv++;

    if(((abs(temp_value - distance) >50))|| interv == base_interv ){
       Serial.println("yes");
       temp_value=distance;
       base_interv=0;
       String get_req = String(END_POINT + "?distance=" + string_distance + "&serialNumber=" + serial_number);
       Serial.print("[HTTPS] begin...\n");

      if (https.begin(*client, get_req)) {  // HTTPS

        Serial.print("[HTTPS] GET...\n");
        // start connection and send HTTP header
        int httpCode = https.GET();

        // httpCode will be negative on error
        if (httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

          // file found at server
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = https.getString();
            Serial.println(payload);
          }
        } else {
          Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
        }

        https.end();
      } else {
        Serial.printf("[HTTPS] Unable to connect\n");
      }
    }

  }

  Serial.println("Wait 2s before next round...");
  delay(2*sec);
}



// ULTRASONIC
int check_distance(){
    long dist = 0;
    long duration = 0;
    digitalWrite(TRIGPIN,LOW);
    delayMicroseconds(2);

    digitalWrite(TRIGPIN,HIGH);
    delayMicroseconds(20);
    digitalWrite(TRIGPIN,LOW);

    duration = pulseIn(ECHOPIN, HIGH);
    dist = (duration/2) * 0.343;
    Serial.print("dist: ");
    Serial.println(dist);


    return dist; 
}