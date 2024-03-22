package main

import (
	"github.com/google/uuid"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan MessageBody)

type MessageBody struct {
	Message string `json:"message"`
}

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	clients[conn] = true
	log.Println("Client connected:", conn.RemoteAddr())

	for {
		var msg MessageBody

		err = conn.ReadJSON(&msg)
		if err != nil {
			log.Printf("ReadJSON error: %v", err)
			delete(clients, conn)
			break
		}

		log.Printf("Received message: %s", msg.Message)
		broadcast <- msg
	}
}

func HandleMessages() {	
	for msg := range broadcast {
	for client := range clients {
		err := client.WriteJSON(msg)
		if err != nil {
			log.Printf("WriteJSON error: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}
}

func HandleSession(w http.ResponseWriter, r *http.Request) {
	uuid := uuid.New()
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte(uuid.String()))
	log.Printf("Session ID: %s", uuid.String())
}