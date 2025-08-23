package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

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

	err = http.ListenAndServe(":"+port, loggingMiddleware(http.DefaultServeMux))
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

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		
		// Create a custom response writer to capture status code
		lrw := &loggingResponseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}
		
		// Log request start
		log.Printf("[REQUEST] %s %s from %s", r.Method, r.URL.Path, r.RemoteAddr)
		
		// Call the next handler
		next.ServeHTTP(lrw, r)
		
		// Log request completion with timing and status
		duration := time.Since(start)
		log.Printf("[RESPONSE] %s %s -> %d (%v)", r.Method, r.URL.Path, lrw.statusCode, duration)
	})
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}
