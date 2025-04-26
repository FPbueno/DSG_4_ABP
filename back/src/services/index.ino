#include <WiFiS3.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// === CONFIG Wi-Fi ===
char ssid[] = "isaac celular";
char pass[] = "iscxxxx";

// === GPS ===
SoftwareSerial gpsSerial(8, 9);  // RX (GPS TX), TX (opcional)
TinyGPSPlus gps;

// === Buffer para dados locais ===
const int MAX_COORDS = 50;
struct Coordenada {
  float lat;
  float lon;
  float speed;
};
Coordenada buffer[MAX_COORDS];
int bufferIndex = 0;

// === Cliente HTTP ===
WiFiClient client;
const char* host = "192.168.170.xxx";
int port = 3000;
String url = "/locations";

// === Controle de tempo ===
unsigned long ultimoColetaEnvio = 0;
const unsigned long intervalo = 60000;  // 30 segundos em milissegundos

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  conectarWiFi();
}

void loop() {
  while (gpsSerial.available()) {
    char c = gpsSerial.read();
    gps.encode(c);
  }

  if (millis() - ultimoColetaEnvio >= intervalo) {
    if (gps.location.isUpdated() && gps.location.isValid()) {
      float lat = gps.location.lat();
      float lon = gps.location.lng();
      float speed = gps.speed.kmph();

      Serial.println("\n🛰️ Nova coordenada:");
      Serial.print("Latitude: "); Serial.println(lat, 6);
      Serial.print("Longitude: "); Serial.println(lon, 6);
      Serial.print("Velocidade (km/h): "); Serial.println(speed, 2);

      if (WiFi.status() != WL_CONNECTED) {
        conectarWiFi();
      }

      if (WiFi.status() == WL_CONNECTED && bufferIndex > 0) {
        Serial.println("📦 Buffer detectado. Enviando dados pendentes...");
        enviarBuffer();
      }

      if (WiFi.status() == WL_CONNECTED && enviarCoordenada(lat, lon, speed)) {
        Serial.println("📤 Coordenada enviada com sucesso.");
      } else {
        armazenarLocalmente(lat, lon, speed);
      }
    }

    ultimoColetaEnvio = millis();
  }
}

void conectarWiFi() {
  WiFi.begin(ssid, pass);
  Serial.print("🔌 Conectando ao Wi-Fi");

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 5000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ Wi-Fi conectado!");
    Serial.print("IP: "); Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ Falha ao conectar no Wi-Fi.");
  }
}

void armazenarLocalmente(float lat, float lon, float speed) {
  if (bufferIndex < MAX_COORDS) {
    buffer[bufferIndex++] = { lat, lon, speed };
    Serial.print("💾 Coordenada armazenada no buffer. Total: ");
    Serial.println(bufferIndex);
  } else {
    Serial.println("⚠️ Buffer cheio. Dados não armazenados.");
  }
}

void enviarBuffer() {
  for (int i = 0; i < bufferIndex; i++) {
    if (!enviarCoordenada(buffer[i].lat, buffer[i].lon, buffer[i].speed)) {
      Serial.print("❌ Falha ao enviar coordenada do buffer [");
      Serial.print(i + 1);
      Serial.println("]");
      return; // para envio e tenta de novo no próximo loop
    }
    delay(200);
  }
  bufferIndex = 0;
  Serial.println("📦 Buffer enviado e limpo.");
}

bool enviarCoordenada(float lat, float lon, float speed) {
  String json = "{\n"
                "  \"latitude\": " + String(lat, 6) + ",\n"
                "  \"longitude\": " + String(lon, 6) + ",\n"
                "  \"speed\": " + String(speed, 2) + "\n"
                "}";

  if (client.connect(host, port)) {
    client.println("POST " + url + " HTTP/1.1");
    client.println("Host: " + String(host));
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(json.length());
    client.println("Connection: close");
    client.println();
    client.println(json);

    unsigned long timeout = millis();
    bool status200 = false;

    while (client.connected() && millis() - timeout < 5000) {
      while (client.available()) {
        String line = client.readStringUntil('\n');
        line.trim(); // remove espaços e \r

        // Exibe apenas o status HTTP e os dados de sucesso
        Serial.println("HTTP response: " + line); 

        if (line.startsWith("HTTP/1.1 200")) {
          status200 = true;
        }
      }
    }

    client.stop();

    // Retorna apenas se foi 200
    if (status200) {
      return true;
    } else {
      return false;
    }
  }

  Serial.println("❌ Erro ao conectar no servidor.");
  return false;
}
