package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	// load .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	err = validateEnvVars()
	if err != nil {
		log.Fatal("Environment validation failed:", err)
	}

	setupRoutes()

	// start server
	port := getEnv("SERVER_PORT", "8080")
	fmt.Printf("Server starting on :%s...\n", port)

	err = http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("Error starting server:", err)
	}
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World! from OAuth server")
	})

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "OK")
	})

	http.HandleFunc("/auth/exchange-token", handleTokenExchange)
}
