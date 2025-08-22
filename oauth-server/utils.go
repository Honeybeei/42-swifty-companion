package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func validateEnvVars() error {
	requiredVars := []string{"CLIENT_SECRET", "CLIENT_ID", "REDIRECT_URI", "TOKEN_URL"}

	for _, envVar := range requiredVars {
		if os.Getenv(envVar) == "" {
			return fmt.Errorf("required environment variable %s is not set", envVar)
		}
	}
	return nil
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func sendErrorResponse(w http.ResponseWriter, error, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	errorResp := ErrorResponse{
		Error:   error,
		Message: message,
		Code:    statusCode,
	}

	json.NewEncoder(w).Encode(errorResp)
}
