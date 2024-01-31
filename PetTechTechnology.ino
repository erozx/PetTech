/*
 * PetTech v1.0.0
 * Copyright 2024 SRN PetTech
 * Licensed under MIT (https://github.com/SANSDESU/PetTech/blob/main/LICENSE)
 */

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>
#include <Servo.h>

Servo servo;  

int one = 0;
const int ledPin = D1;
const int feedPin = D2;

unsigned long lastExecutionTime = 0;

IPAddress defaultIp(29, 13, 17, 1);

// Create WebServer object on port 80
ESP8266WebServer server(80);

// JSON configuration document
StaticJsonDocument<256> doc;

void printConfig() {
  Serial.println("Current Configuration:");
  Serial.print("uptime: ");
  Serial.println(doc["uptime"].as<int>());
  Serial.print("status: ");
  Serial.println(doc["status"].as<const char*>());
  Serial.print("freq: ");
  Serial.println(doc["freq"].as<int>());
  Serial.print("feedtype: ");
  Serial.println(doc["feedtype"].as<const char*>());
  Serial.print("feedtimehour: ");
  Serial.println(doc["feedtimehour"].as<int>());
  Serial.print("feedtimeday: ");
  Serial.println(doc["feedtimeday"].as<int>());
  Serial.print("ssid: ");
  Serial.println(doc["ssid"].as<const char*>());
  Serial.print("passwordwifi: ");
  Serial.println(doc["passwordwifi"].as<const char*>());
  Serial.print("IP: ");
  Serial.println(defaultIp);
  Serial.println("=========================");
}

void handleSaveConfig() {
  // Handle /saveConfig POST request
  String jsonString = server.arg("plain");

  // Deserialize the received JSON
  DeserializationError error = deserializeJson(doc, jsonString);
  if (error) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON format\"}");
    return;
  }

  // Save the updated configuration to SPIFFS
  File configFile = SPIFFS.open("/config.json", "w");
  if (!configFile) {
    server.send(500, "application/json", "{\"status\":\"error\",\"message\":\"Failed to open config file for writing\"}");
    return;
  }

  serializeJson(doc, configFile);
  configFile.close();

  server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Configuration updated\"}");
}


void handleSaveWifiConfig() {
  // Handle /saveConfig POST request
  String jsonString = server.arg("plain");

  // Deserialize the received JSON
  DeserializationError error = deserializeJson(doc, jsonString);
  if (error) {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON format\"}");
    return;
  }

  // Save the updated configuration to SPIFFS
  File configFile = SPIFFS.open("/config.json", "w");
  if (!configFile) {
    server.send(500, "application/json", "{\"status\":\"error\",\"message\":\"Failed to open config file for writing\"}");
    return;
  }

  serializeJson(doc, configFile);
  configFile.close();

  server.send(200, "application/json", "{\"status\":\"success\",\"message\":\"Configuration updated\"}");

  Serial.println("WiFi Configuration has change, disconnecting WiFi...");
  WiFi.disconnect();  // Disconnect from the current network
  delay(1000);        // Allow time for the disconnect
  
  Serial.println("Resetting ESP, please reconnect to new WiFi config");
  delay(2000);
    // Reset the ESP8266
  ESP.reset();
}

void setup() {
  Serial.begin(115200);

  servo.attach(D0); 

  pinMode(ledPin, OUTPUT);
  pinMode(feedPin, OUTPUT);

    // Initialize SPIFFS
  if(!SPIFFS.begin()){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Attempt to load configuration from file
  File configFile = SPIFFS.open("/config.json", "r");
  if (configFile) {
    // Deserialize the JSON configuration
    DeserializationError error = deserializeJson(doc, configFile);
    configFile.close();
    if (error) {
      Serial.println("Failed to read configuration file");
    }
  } else {
    Serial.println("No configuration file found");
  }

//  // Set ESP8266 as an access point
  WiFi.mode(WIFI_AP);
  
  // Update WiFi configuration dynamically based on config.json
  WiFi.softAPConfig(defaultIp, defaultIp, IPAddress(255, 255, 255, 0));
  WiFi.softAP(doc["ssid"].as<const char*>(), doc["passwordwifi"].as<const char*>());

server.on("/saveConfig", HTTP_POST, handleSaveConfig);
server.on("/saveWifi", HTTP_POST, handleSaveWifiConfig);
  
  // Route for root / web page
server.on("/", HTTP_GET, [](){
  File file = SPIFFS.open("/index.html", "r");
  if (file) {
    server.streamFile(file, "text/html");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

// Route to load style.css file
server.on("/style.css", HTTP_GET, [](){
  File file = SPIFFS.open("/style.css", "r");
  if (file) {
    server.streamFile(file, "text/css");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/script.js", HTTP_GET, [](){
  File file = SPIFFS.open("/script.js", "r");
  if (file) {
    server.streamFile(file, "text/js");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/config.json", HTTP_GET, [](){
  File file = SPIFFS.open("/config.json", "r");
  
  if (file) {
    server.streamFile(file, "text/json");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});


//======================= define file ====================
server.on("/bootstrap.bundle.min.js", HTTP_GET, [](){
  File file = SPIFFS.open("/bootstrap.bundle.min.js", "r");
  
  if (file) {
    server.streamFile(file, "text/js");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/bootstrap.min.css", HTTP_GET, [](){
  File file = SPIFFS.open("/bootstrap.min.css", "r");
  
  if (file) {
    server.streamFile(file, "text/css");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});


server.on("/bootstrap-editable.css", HTTP_GET, [](){
  File file = SPIFFS.open("/bootstrap-editable.css", "r");
  
  if (file) {
    server.streamFile(file, "text/css");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/bootstrap-table.min.css", HTTP_GET, [](){
  File file = SPIFFS.open("/bootstrap-table.min.css", "r");
  
  if (file) {
    server.streamFile(file, "text/css");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/icon.png", HTTP_GET, [](){
  File file = SPIFFS.open("/icon.png", "r");
  
  if (file) {
    server.streamFile(file, "image/png");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

//======================= define font ====================
server.on("/Poppins-Bold.ttf", HTTP_GET, [](){
  File file = SPIFFS.open("/Poppins-Bold.ttf", "r");
  
  if (file) {
    server.streamFile(file, "text/ttf");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/Poppins-Light.ttf", HTTP_GET, [](){
  File file = SPIFFS.open("/Poppins-Light.ttf", "r");
  
  if (file) {
    server.streamFile(file, "text/ttf");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/Poppins-Medium.ttf", HTTP_GET, [](){
  File file = SPIFFS.open("/Poppins-Medium.ttf", "r");
  
  if (file) {
    server.streamFile(file, "text/ttf");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/Poppins-Regular.ttf", HTTP_GET, [](){
  File file = SPIFFS.open("/Poppins-Regular.ttf", "r");
  
  if (file) {
    server.streamFile(file, "text/ttf");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

server.on("/Poppins-SemiBold.ttf", HTTP_GET, [](){
  File file = SPIFFS.open("/Poppins-SemiBold.ttf", "r");
  
  if (file) {
    server.streamFile(file, "text/ttf");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

//===================================================
// Route to set GPIO to HIGH
server.on("/on", HTTP_GET, [](){
  File file = SPIFFS.open("/index.html", "r");
  if (file) {
    server.streamFile(file, "text/html");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});

// Route to set GPIO to LOW
server.on("/off", HTTP_GET, [](){
  File file = SPIFFS.open("/index.html", "r");
  if (file) {
    server.streamFile(file, "text/html");
    file.close();
  } else {
    server.send(404, "text/plain", "File not found");
  }
});



  server.begin();
}

void loop() {
  server.handleClient();

  // Print the configuration values in the Serial Monitor
  printConfig();

//  Serial.println(doc["deg"].as<int>());

  if (strcmp(doc["status"].as<const char*>(), "on") == 0) {
    digitalWrite(ledPin, HIGH); // Turn on the LED

    if (one == 0) {
       servo.write(180);
       one = 1;
    }
  
    unsigned long intervalHour = doc["feedtimehour"].as<int>() * 60 * 60 * 1000; // in milliseconds
    unsigned long intervalDay = 24 * 60 * 60 * 1000 / doc["feedtimeday"].as<int>(); // in milliseconds
  
    if (strcmp(doc["feedtype"].as<const char*>(), "hours") == 0) {
      // Only reset lastExecutionTime if it's the first execution or after an interval
      if (millis() - lastExecutionTime >= intervalHour) {
        lastExecutionTime = millis(); // Update the last execution time
        digitalWrite(feedPin, HIGH); // Turn on the LED
        one = 0;
  
        if (one == 0) {
          servo.write(0);
          delay(doc["freq"].as<int>());
          servo.write(180);
          one = 1;
        }
      }
  
    } else if (strcmp(doc["feedtype"].as<const char*>(), "day") == 0) {
      // Only reset lastExecutionTime if it's the first execution or after an interval
      if (millis() - lastExecutionTime >= intervalDay) {
        lastExecutionTime = millis(); // Update the last execution time
        digitalWrite(feedPin, HIGH); // Turn on the LED
        one = 0;
  
        if (one == 0) {
          servo.write(0);
          delay(doc["freq"].as<int>());
          servo.write(180);
          one = 1;
        }
      }
    }
  } else {
    one = 0;
    digitalWrite(ledPin, LOW); // Turn off the LED
  }

  delay(doc["uptime"].as<int>());  // Add a delay to avoid excessive printing
}
