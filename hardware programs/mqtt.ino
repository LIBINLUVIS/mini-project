#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WiFi
const char *ssid = "hacker"; // Enter your WiFi name
const char *password = "123123123";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "libin/adishankara/tds/sam";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;


WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Set software serial baud to 115200;
  Serial.begin(115200);
 
  pinMode(1,OUTPUT);
  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
      String client_id = "esp8266-client-";
      client_id += String(WiFi.macAddress());
//      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
//          Serial.println("Public emqx mqtt broker connected");
      } else {
//          Serial.print("failed with state ");
//          Serial.print(client.state());
          delay(2000);
      }
  }
  // publish and subscribe
  client.publish(topic, "200");
  client.subscribe(topic);
}

void callback(char *topic, byte *payload, unsigned int length) {
//  Serial.print("Message arrived in topic: ");
//  Serial.println(topic);
//  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
//      Serial.print((char) payload[i]);
  }
//  Serial.println();
//  Serial.println("-----------------------");
}
char value[5]={1,1};

void loop() {
  client.loop();
  //client.publish(topic,"90");
  digitalWrite(1,LOW);
  digitalWrite(1,HIGH);

    
  if(Serial.available()>0){
    int i;
    for(i=0;i<2;i++){
       delay(100);
       value[i]=Serial.read();
      }
     client.publish(topic,value);
  }
    //client.publish(topic,"test2");
    //int k=0;
//  while(Serial.available()>0){
//      const char *a=Serial.read();
//         client.publish(topic,a);
//         //Serial.print(a);
//          value[k]=a;
//          k++;
//    }
//
//    //client.publish(topic,"tds value");
//    //client.publish(topic,value);
//    digitalWrite(1,HIGH);
//  } 


  

}
