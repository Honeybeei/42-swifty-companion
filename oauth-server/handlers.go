package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// handleTokenExchange handles POST requests to exchange OAuth authorization codes for access tokens.
// It validates the request method, content type, and required fields (auth_code and client_id),
// then exchanges the authorization code with the 42 API to obtain access and refresh tokens.
//
// The handler expects a JSON request body with the following structure:
//   - auth_code: The authorization code received from the OAuth provider
//   - client_id: The client identifier for the OAuth application
//
// On success, it returns a JSON response containing:
//   - access_token: The access token for API requests
//   - refresh_token: The refresh token for obtaining new access tokens
//   - expires_in: The token expiration time in seconds
//   - token_type: The type of token (typically "Bearer")
//
// Error responses are returned for:
//   - Non-POST requests (405 Method Not Allowed)
//   - Invalid Content-Type (400 Bad Request)
//   - Malformed JSON or missing required fields (400 Bad Request)
//   - Token exchange failures with the 42 API (500 Internal Server Error)
func handleTokenExchange(w http.ResponseWriter, r *http.Request) {
	// Check HTTP method: Only POST allowed
	if r.Method != http.MethodPost {
		sendErrorResponse(w, "Method not allowed", "Only POST method is allowed", http.StatusMethodNotAllowed)
		return
	}

	// Check Content-Type
	if r.Header.Get("Content-Type") != "application/json" {
		sendErrorResponse(w, "Invalid content type", "Content-Type must be application/json", http.StatusBadRequest)
		return
	}

	// Read the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		sendErrorResponse(w, "Invalid request", "Could not read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// JSON parsing
	var req TokenExchangeRequest
	if err := json.Unmarshal(body, &req); err != nil {
		sendErrorResponse(w, "Invalid JSON", "Could not parse JSON request", http.StatusBadRequest)
		return
	}

	// Check required fields
	if req.AuthCode == "" {
		sendErrorResponse(w, "Missing auth_code", "auth_code is required", http.StatusBadRequest)
		return
	}
	if req.ClientID == "" {
		sendErrorResponse(w, "Missing client_id", "client_id is required", http.StatusBadRequest)
		return
	}

	// Exchange code with token through 42 API
	tokenResponse, err := exchangeWithFor42API(req.AuthCode, req.ClientID)
	if err != nil {
		fmt.Printf("Error exchanging token: %v\n", err)
		sendErrorResponse(w, "Token exchange failed", err.Error(), http.StatusInternalServerError)
		return
	}

	// Prepare response
	response := TokenResponse{
		AccessToken:  tokenResponse.AccessToken,
		RefreshToken: tokenResponse.RefreshToken,
		ExpiresIn:    tokenResponse.ExpiresIn,
		TokenType:    tokenResponse.TokenType,
	}

	// Send successful response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
