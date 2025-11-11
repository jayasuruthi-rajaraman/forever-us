# Forever Us - React Native App

A beautiful React Native application with a modern login screen featuring smooth animations, biometric authentication, and a dark theme.

## Features

- ✨ Smooth animations using `react-native-reanimated` and `react-native-gesture-handler`
- 💜 Animated heart icon with glow effect using `react-native-svg`
- 🎨 Gradient backgrounds with `react-native-linear-gradient`
- 🔐 Biometric authentication (Face ID / Fingerprint) using `expo-local-authentication`
- 🔑 Pair code authentication with mock verification
- 🌓 Dark/Light theme support with `useColorScheme()`
- 🧭 React Navigation v6 with stack navigation (Splash → Onboarding → Auth → Dashboard)

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Start the app:
```bash
npm start
```

## Project Structure

```
forever-us/
├── components/
│   ├── Button.tsx          # Reusable button component with gradient
│   ├── HeartIcon.tsx       # Animated heart icon with glow effect
│   └── InputField.tsx      # Custom input field component
├── navigation/
│   └── AppNavigator.tsx    # React Navigation setup
├── screens/
│   ├── SplashScreen.tsx    # Splash screen
│   ├── OnboardingScreen.tsx # Onboarding screen
│   ├── LoginScreen.tsx     # Main login screen
│   └── DashboardScreen.tsx # Dashboard after login
├── services/
│   ├── mockAuth.ts         # Mock authentication service
│   └── biometric.ts         # Biometric authentication service
├── theme/
│   └── index.ts            # Theme configuration (light/dark)
└── App.tsx                 # Main app entry point
```

## Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation v6** - Navigation library
- **react-native-reanimated** - Smooth animations
- **react-native-gesture-handler** - Gesture handling
- **react-native-svg** - Vector graphics
- **react-native-linear-gradient** - Gradient backgrounds
- **expo-local-authentication** - Biometric authentication

## Mock Authentication

The app includes a mock authentication service for demo purposes:

- **Valid Pair Codes**: `ABCD-1234`, `TEST-5678`, `DEMO-9012`
- Email/Password: Any valid email and password combination will work
- Biometric: Returns success after a short delay (stub implementation)

## Theme System

The app uses a centralized theme system that automatically adapts to light/dark mode:

- Theme tokens are defined in `theme/index.ts`
- Uses `useColorScheme()` to detect system preference
- All colors, spacing, typography, and border radius are centralized

## Navigation Flow

1. **Splash** → Shows app logo and name
2. **Onboarding** → Welcome screen
3. **Auth** → Login screen with multiple authentication options
4. **Dashboard** → Main app screen (after successful login)

Navigation uses `replace` instead of `push` after authentication to prevent back navigation to login screens.

## Development

The app is set up with:
- TypeScript support
- Babel configuration with Reanimated plugin
- Expo configuration
- Safe area handling
- Keyboard avoidance

## Notes

- Biometric authentication uses `expo-local-authentication` which requires proper device setup
- The heart glow animation uses layered SVG with animated blur/scale/opacity
- All gradients are consistent across platforms using `react-native-linear-gradient`

