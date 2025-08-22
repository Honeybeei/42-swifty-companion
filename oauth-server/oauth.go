package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

func exchangeWithFor42API(authCode, clientID string) (*Token42Response, error) {
	// Get env variables
	clientSecret := os.Getenv("CLIENT_SECRET")
	redirectURI := os.Getenv("REDIRECT_URI")
	tokenURL := os.Getenv("TOKEN_URL")

	// Set request data
	requestData := url.Values{}
	requestData.Set("grant_type", "authorization_code")
	requestData.Set("client_id", clientID)
	requestData.Set("client_secret", clientSecret)
	requestData.Set("code", authCode)
	requestData.Set("redirect_uri", redirectURI)

	// Create HTTP request
	resp, err := http.PostForm(tokenURL, requestData)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to 42 API: %v", err)
	}
	defer resp.Body.Close()

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response from 42 API: %v", err)
	}

	// 42 API Error check
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("42 API returned error: %s (status: %d)", string(body), resp.StatusCode)
	}

	// Parse JSON response
	var tokenResponse Token42Response
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		return nil, fmt.Errorf("failed to parse 42 API response: %v", err)
	}

	return &tokenResponse, nil
}
