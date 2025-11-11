import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { HeartLogo } from '../components/HeartLogo';
import { AuthForm } from '../components/AuthForm';
import { verifyEmailPassword, verifyPairCode, verifyPairCodeOnly } from '../utils/mockAuth';
import { authenticateWithFaceID, authenticateWithFingerprint } from '../../services/biometric';

interface AuthScreenProps {
  navigation: any;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleEmailPassword = async (email: string, password: string) => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await verifyEmailPassword(email, password);
      if (result.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Error', result.message || 'Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePairCode = async (pairCode: string) => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await verifyPairCodeOnly(pairCode);
      if (result.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Error', result.message || 'Invalid pair code');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordPairCode = async (
    email: string,
    password: string,
    pairCode: string
  ) => {
    if (loading) return;

    setLoading(true);
    try {
      const emailResult = await verifyEmailPassword(email, password);
      const pairResult = await verifyPairCode(pairCode);

      if (emailResult.success && pairResult.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Error', emailResult.message || pairResult.message || 'Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFaceID = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await authenticateWithFaceID();
      if (result.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Error', result.error || 'Face ID authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFingerprint = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const result = await authenticateWithFingerprint();
      if (result.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Error', result.error || 'Fingerprint authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <HeartLogo size={24} />
            <Text style={[styles.headerText, { color: theme.colors.text }]}>Forever Us</Text>
          </View>

          {/* Auth Form */}
          <View style={styles.formContainer}>
            <AuthForm
              onEmailPassword={handleEmailPassword}
              onPairCode={handlePairCode}
              onEmailPasswordPairCode={handleEmailPasswordPairCode}
              onFaceID={handleFaceID}
              onFingerprint={handleFingerprint}
              loading={loading}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => Alert.alert('Privacy', 'Privacy policy information')}>
            <Text style={[styles.footerLeft, { color: theme.colors.text }]}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerCenter}
            onPress={() => Alert.alert('Get Help', 'Contact support for assistance with signing in.')}
          >
            <Text style={[styles.footerCenterText, { color: theme.colors.textSecondary }]}>
              Trouble signing in?{' '}
              <Text style={{ color: theme.colors.accentPink }}>Get help.</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Terms', 'Terms of service information')}>
            <Text style={[styles.footerRight, { color: theme.colors.text }]}>Terms</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  formContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  footerLeft: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    textAlign: 'left',
  },
  footerCenter: {
    flex: 2,
    alignItems: 'center',
  },
  footerCenterText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  footerRight: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    textAlign: 'right',
  },
});

