# 🍕 Swifty Companion

[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.24-00ADD8?logo=go&logoColor=white)](https://golang.org/)

A modern React Native mobile application that connects with the 42 School API to provide comprehensive student profile information. Built with a pizza-themed UI and secure OAuth2 authentication flow.

- [🍕 Swifty Companion](#-swifty-companion)
  - [📸 Screenshots](#-screenshots)
  - [✨ Features](#-features)
    - [🔐 Authentication \& Security](#-authentication--security)
    - [👤 Student Profiles](#-student-profiles)
    - [🎨 User Experience](#-user-experience)
  - [🏗️ Architecture](#️-architecture)
    - [📁 Project Structure](#-project-structure)
    - [🛠️ Tech Stack](#️-tech-stack)
      - [📱 Frontend](#-frontend)
      - [🔧 Backend](#-backend)
      - [🔗 Integration](#-integration)
  - [🎯 Key Implementation Details](#-key-implementation-details)
    - [🔐 OAuth2 Flow](#-oauth2-flow)
    - [📊 State Management](#-state-management)
    - [🌐 API Integration](#-api-integration)
  - [🏛️ Clean Architecture Implementation](#️-clean-architecture-implementation)
    - [🔧 Decoupled Business Logic \& UI](#-decoupled-business-logic--ui)
      - [📁 Services Layer (Pure Business Logic)](#-services-layer-pure-business-logic)
      - [🏪 Store Layer (State Management)](#-store-layer-state-management)
      - [🎨 UI Layer (Pure Presentation)](#-ui-layer-pure-presentation)
      - [🔄 Benefits of This Architecture](#-benefits-of-this-architecture)
  - [🙏 Acknowledgments](#-acknowledgments)

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

### 📁 Project Structure

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

### 🛠️ Tech Stack

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

### 🔐 OAuth2 Flow

1. User initiates login through 42 API authorization URL
2. 42 redirects to custom scheme with authorization code
3. React Native app extracts code and sends to Go backend
4. Go server exchanges code for access/refresh tokens with 42 API
5. Tokens are securely stored and managed in the mobile app

### 📊 State Management

- **User Store**: Manages user profile data and authentication state
- **Settings Store**: Handles app preferences and theme settings
- **Zustand**: Provides reactive state updates across components

### 🌐 API Integration

- **Authenticated Requests**: All 42 API calls include Bearer tokens
- **Error Handling**: Comprehensive error catching and user-friendly messages
- **Token Refresh**: Automatic token renewal when expired
- **Type Safety**: Complete TypeScript interfaces for 42 API responses

## 🏛️ Clean Architecture Implementation

### 🔧 Decoupled Business Logic & UI

The React Native app follows a strict **separation of concerns** principle with business logic completely decoupled from UI components:

#### 📁 Services Layer (Pure Business Logic)

All business logic is implemented as **stateless functions** in the `services/` directory:

- **`authService.ts`** - Handles OAuth flow, token exchange, and URL parsing
- **`profileService.ts`** - Manages 42 API profile fetching operations  
- **`tokenStorageService.ts`** - Secure token persistence using Expo SecureStore
- **`authApiClient.ts`** - HTTP client configuration for backend communication

- **Key Benefits:**
  - ✅ **Testable**: Pure functions with no side effects
  - ✅ **Reusable**: Business logic can be used across different UI components
  - ✅ **Maintainable**: Changes to business logic don't affect UI components
  - ✅ **Type-safe**: Full TypeScript coverage with proper interfaces

#### 🏪 Store Layer (State Management)

Zustand stores act as the **only interface** between UI and business logic:

- **`userStore.ts`** - Orchestrates authentication flow and profile management
- **`settingsStore.ts`** - Manages app preferences and theme settings

**Architecture Pattern:**

```plaintext
UI Components → Store Actions → Service Functions → External APIs
     ↑                                                    ↓
UI Updates ← Store State ← Service Responses ← API Data
```

**Example Flow:**

```typescript
// 1. UI calls store action
const signInResult = await userStore.signInWith42(redirectUrl);

// 2. Store action calls service functions
const authCode = extractAuthCodeFromUrl(url);        // authService.ts
const tokens = await exchangeToken(authCode);        // authService.ts  
await tokenStorage.saveTokens(tokens);               // tokenStorageService.ts

// 3. Store updates state, UI reacts automatically
userStore.setAuthToken(tokens);
```

#### 🎨 UI Layer (Pure Presentation)

Components focus solely on rendering and user interaction:

- **Stateless**: Components receive data as props from stores
- **Declarative**: No business logic, only presentation logic
- **Reactive**: Automatically update when store state changes
- **Focused**: Each component has a single responsibility

**Example - Clean Component Structure:**

```typescript
// ✅ Good: Pure presentation component
export default function BasicProfileCard({ userProfile }: Props) {
  // Only UI-related logic (formatting, styling)
  const formatTimeAgo = (dateString: string) => { /* ... */ };
  
  return (
    <DisplayCard>
      {/* Pure UI rendering */}
    </DisplayCard>
  );
}

// ✅ Good: Store handles all business logic
const { userProfile, loadUserProfile } = useUserStore();
```

#### 🔄 Benefits of This Architecture

1. **Separation of Concerns**: Business logic, state management, and UI are completely isolated
2. **Single Responsibility**: Each layer has one clear purpose
3. **Dependency Flow**: Clear unidirectional data flow from services → stores → UI
4. **Error Handling**: Centralized error management in stores with proper error states
5. **Testing**: Easy to unit test business logic without UI dependencies
6. **Scalability**: New features can be added without affecting existing code
7. **Code Reusability**: Services can be reused across different screens/components

This architecture ensures **maintainable**, **testable**, and **scalable** code that follows React Native and modern app development best practices.

## 🙏 Acknowledgments

- [42 School](https://42.fr/) for providing the comprehensive API
- [Expo](https://expo.dev/) for the excellent development platform
- [GluestackUI](https://gluestack.io/) for the beautiful component library
