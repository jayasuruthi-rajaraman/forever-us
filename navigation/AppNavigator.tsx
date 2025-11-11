import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { OnboardingPage1Screen } from '../screens/OnboardingPage1Screen';
import { OnboardingPage2Screen } from '../screens/OnboardingPage2Screen';
import { OnboardingPage3Screen } from '../screens/OnboardingPage3Screen';
import { LoginScreen } from '../screens/LoginScreen';
import { PairingScreen } from '../screens/PairingScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { NextPageScreen } from '../screens/NextPageScreen';
import { FeaturesScreen } from '../screens/FeaturesScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  OnboardingPage1: undefined;
  OnboardingPage2: undefined;
  OnboardingPage3: undefined;
  NextPage: undefined;
  Login: undefined;
  Pairing: undefined;
  Features: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingPage1" component={OnboardingPage1Screen} />
        <Stack.Screen name="OnboardingPage2" component={OnboardingPage2Screen} />
        <Stack.Screen name="OnboardingPage3" component={OnboardingPage3Screen} />
        <Stack.Screen name="NextPage" component={NextPageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pairing" component={PairingScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

