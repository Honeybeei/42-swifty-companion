# 🍕 Swifty Companion

[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.24-00ADD8?logo=go&logoColor=white)](https://golang.org/)

A modern React Native mobile application that connects with the 42 School API to provide comprehensive student profile information. Built with a pizza-themed UI and secure OAuth2 authentication flow.

## 📸 Screenshots

<!-- Add your screenshots here -->
<!-- <div align="center">
  <img src="screenshots/auth.png" width="200" alt="Authentication Screen" />
  <img src="screenshots/profile.png" width="200" alt="Student Profile" />
  <img src="screenshots/projects.png" width="200" alt="Projects View" />
  <img src="screenshots/skills.png" width="200" alt="Skills Overview" />
</div> -->

> Work in progress...

## ✨ Features

### 🔐 Authentication & Security

- **OAuth2 Flow**: Secure authentication with 42 API
- **Token Management**: Automatic access token refresh
- **Secure Storage**: Encrypted token storage using Expo SecureStore
- **Custom Backend**: Go server for secure token exchange

### 👤 Student Profiles

- **Comprehensive Data**: Profile picture, contact info, campus details
- **Academic Progress**: Current level, experience points, wallet balance
- **Skills Analysis**: Detailed breakdown with levels and percentages
- **Project History**: All completed projects with grades and status
- **Achievement System**: Unlocked achievements and titles

### 🎨 User Experience

- **Pizza Theme**: Consistent brown/orange color palette (`#f3983e`)
- **Tab Navigation**: Intuitive multi-tab layout
- **Responsive Design**: Works on phones and tablets
- **Dark Mode**: Automatic theme switching
- **Error Handling**: User-friendly error messages and retry mechanisms
- **Loading States**: Smooth loading animations

## 🏗️ Architecture

### Project Structure

```plaintext
42-swifty-companion/
├── RN-app/                    # React Native application
│   ├── app/                   # Expo Router pages
│   │   ├── (tabs)/            # Tab-based navigation
│   │   ├── auth.tsx           # Authentication screen
│   │   ├── oauth.tsx          # OAuth handling
│   │   └── auth-redirect.tsx  # OAuth callback
│   ├── components/            # Reusable UI components
│   │   ├── home/              # Profile-related components
│   │   ├── projects/          # Project display components
│   │   ├── skills/            # Skills visualization
│   │   ├── settings/          # App settings
│   │   └── shared/            # Common components
│   ├── services/              # API clients and business logic
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript definitions
│   └── utils/                 # Helper functions
└── oauth-server/              # Go backend server
    ├── main.go                # Server entry point
    ├── oauth.go               # OAuth token exchange
    ├── handlers.go            # HTTP request handlers
    └── types.go               # Go type definitions
```

### Tech Stack

#### 📱 Frontend

- **React Native 0.79** with Expo 51.0 - Cross-platform mobile development
- **TypeScript 5.6** - Type safety and modern JavaScript features
- **Expo Router** - File-based navigation system
- **GluestackUI** - Comprehensive UI component library
- **NativeWind** - Tailwind CSS for React Native styling
- **Zustand** - Lightweight state management
- **Expo SecureStore** - Encrypted local storage for tokens

#### 🔧 Backend

- **Go 1.24** - High-performance HTTP server
- **godotenv** - Environment variable management
- **net/http** - Native HTTP server implementation

#### 🔗 Integration

- **42 API v2** - Student data and authentication
- **OAuth2** - Secure authentication flow

## 🎯 Key Implementation Details

### OAuth2 Flow

1. User initiates login through 42 API authorization URL
2. 42 redirects to custom scheme with authorization code
3. React Native app extracts code and sends to Go backend
4. Go server exchanges code for access/refresh tokens with 42 API
5. Tokens are securely stored and managed in the mobile app

### State Management

- **User Store**: Manages user profile data and authentication state
- **Settings Store**: Handles app preferences and theme settings
- **Zustand**: Provides reactive state updates across components

### API Integration

- **Authenticated Requests**: All 42 API calls include Bearer tokens
- **Error Handling**: Comprehensive error catching and user-friendly messages
- **Token Refresh**: Automatic token renewal when expired
- **Type Safety**: Complete TypeScript interfaces for 42 API responses

## 🧪 Testing

```bash
# Run linting
cd RN-app && npm run lint

# Test backend
cd oauth-server && go test ./...
```

## 🙏 Acknowledgments

- [42 School](https://42.fr/) for providing the comprehensive API
- [Expo](https://expo.dev/) for the excellent development platform
- [GluestackUI](https://gluestack.io/) for the beautiful component library
