# 🍕 Swifty Companion

Swifty Companion is a simple mobile application project that retrieves and displays information about 42 School students using the 42 API.

## 📱 Features

### 🗽 Core Features

- Search for 42 students by intra ID
- View detailed student profiles including:
  - Profile picture
  - Personal information (intra ID, email, mobile, location)
  - Wallet balance
  - Level and progression
  - Skills with level and percentage
  - Completed projects (including failed ones)
- OAuth2 authentication with 42 API
- Error handling (network issues, user not found)
- Token refresh mechanism

### ✨ UI/UX

- Pizza-themed interface with brown and orange color palette
- Responsive layout for various screen sizes
- Smooth transitions between views
- User-friendly error messages
- Dark mode support

## 🛠️ Tech Stack

- **Mobile App**
  - **React Native & Expo**: Cross-platform mobile development
  - **TypeScript**: Type safety and modern JavaScript features
  - **GluestackUI**: UI component library for consistent design
  - **NativeWind**: Tailwind CSS for React Native
  - **Zustand**: State management

- **Backend**
  - **Go**: Backend API for exchanging authorization code for access token

- **API**
  - **42 API & OAuth2**: Data source and authentication

## 🎨 Design System

The app follows a consistent design system with:

- **Colors**: Pizza-inspired brown and orange palette `#f3983e`
- **Typography**: Clean, readable fonts with consistent hierarchies
- **Components**: Standardized UI elements from GluestackUI
- **Spacing**: Consistent padding and margins
- **Animations**: Subtle, purposeful transitions

## 🚀 Development Roadmap
