import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';
import { EnvelopeIcon } from '../../../components/icons/EnvelopeIcon';
import { KeyIcon } from '../../../components/icons/KeyIcon';
import { FaceIDIcon } from '../../../components/icons/FaceIDIcon';
import { FingerprintIcon } from '../../../components/icons/FingerprintIcon';
import { PadlockIcon } from '../../../components/icons/PadlockIcon';
import { HeartLogo } from './HeartLogo';
import { validateEmail, validatePassword, validatePairCode } from '../utils/validators';

interface AuthFormProps {
  onEmailPassword: (email: string, password: string) => void;
  onPairCode: (pairCode: string) => void;
  onEmailPasswordPairCode: (email: string, password: string, pairCode: string) => void;
  onFaceID: () => void;
  onFingerprint: () => void;
  loading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onEmailPassword,
  onPairCode,
  onEmailPasswordPairCode,
  onFaceID,
  onFingerprint,
  loading = false,
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pairCodeError, setPairCodeError] = useState('');

  const handleContinue = () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setPairCodeError('');

    // Validate inputs
    let hasError = false;

    if (email && password && pairCode) {
      // Validate all three
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        hasError = true;
      }
      if (!validatePassword(password)) {
        setPasswordError('Password cannot be empty.');
        hasError = true;
      }
      if (!validatePairCode(pairCode)) {
        setPairCodeError('Please enter a valid pair code (e.g., ABCD-1234).');
        hasError = true;
      }

      if (!hasError) {
        onEmailPasswordPairCode(email, password, pairCode);
      }
    } else if (email && password) {
      // Email and password only
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        hasError = true;
      }
      if (!validatePassword(password)) {
        setPasswordError('Password cannot be empty.');
        hasError = true;
      }

      if (!hasError) {
        onEmailPassword(email, password);
      }
    } else if (pairCode) {
      // Pair code only
      if (!validatePairCode(pairCode)) {
        setPairCodeError('Please enter a valid pair code (e.g., ABCD-1234).');
        hasError = true;
      }

      if (!hasError) {
        onPairCode(pairCode);
      }
    } else {
      Alert.alert('Error', 'Please fill in at least email and password, or a pair code.');
    }
  };

  const handlePairCodeOnly = () => {
    setPairCodeError('');
    if (!pairCode) {
      setPairCodeError('Please enter a pair code.');
      return;
    }

    if (!validatePairCode(pairCode)) {
      setPairCodeError('Please enter a valid pair code (e.g., ABCD-1234).');
      return;
    }

    onPairCode(pairCode);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <PadlockIcon size={24} color={theme.colors.textSecondary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>Sign in to continue.</Text>
        </View>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Welcome back to your forever.
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, styles.tabLeft]}
          onPress={() => setActiveTab('login')}
        >
          {activeTab === 'login' ? (
            <LinearGradient
              colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.tabGradient}
            >
              <Text style={styles.tabTextActive}>Login</Text>
            </LinearGradient>
          ) : (
            <Text style={[styles.tabTextInactive, { color: theme.colors.text }]}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, styles.tabRight]}
          onPress={() => setActiveTab('signup')}
        >
          {activeTab === 'signup' ? (
            <LinearGradient
              colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.tabGradient}
            >
              <Text style={styles.tabTextActive}>Sign Up</Text>
            </LinearGradient>
          ) : (
            <Text style={[styles.tabTextInactive, { color: theme.colors.text }]}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <View style={[styles.inputFieldContainer, { backgroundColor: theme.colors.inputBackground }]}>
          <EnvelopeIcon size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            placeholder="name@example.com"
            placeholderTextColor={theme.colors.textTertiary}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={[styles.inputFieldContainer, { backgroundColor: theme.colors.inputBackground }]}>
          <KeyIcon size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            placeholder="********"
            placeholderTextColor={theme.colors.textTertiary}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={[styles.inputFieldContainer, { backgroundColor: theme.colors.inputBackground }]}>
          <HeartLogo size={20} />
          <TextInput
            style={[styles.inputField, { color: theme.colors.text }]}
            placeholder="ABCD-1234"
            placeholderTextColor={theme.colors.textTertiary}
            value={pairCode}
            onChangeText={(text) => {
              setPairCode(text);
              setPairCodeError('');
            }}
            autoCapitalize="characters"
          />
        </View>
        {pairCodeError ? <Text style={styles.errorText}>{pairCodeError}</Text> : null}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={loading}
        >
          <LinearGradient
            colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Continue'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.spacing} />
        <TouchableOpacity
          style={[styles.pairCodeButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={handlePairCodeOnly}
          disabled={loading}
        >
          <Text style={[styles.pairCodeButtonText, { color: theme.colors.text }]}>
            Use Pair Code only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={[styles.separatorLine, { backgroundColor: theme.colors.separator }]} />
        <Text style={[styles.separatorText, { color: theme.colors.textSecondary }]}>or</Text>
        <View style={[styles.separatorLine, { backgroundColor: theme.colors.separator }]} />
      </View>

      {/* Biometric Options */}
      <View style={styles.biometricSection}>
        <TouchableOpacity
          style={[styles.faceIDButton, { backgroundColor: theme.colors.inputBackground }]}
          onPress={onFaceID}
          disabled={loading}
        >
          <FaceIDIcon size={24} color={theme.colors.text} />
          <Text style={[styles.biometricText, { color: theme.colors.text }]}>Face ID</Text>
        </TouchableOpacity>
        <View style={styles.spacing} />
        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={onFingerprint}
          disabled={loading}
        >
          <LinearGradient
            colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.biometricGradient}
          >
            <FingerprintIcon size={24} color="#FFFFFF" />
            <Text style={styles.biometricText}>Fingerprint</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tabLeft: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  tabRight: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  tabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabTextInactive: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    padding: 0,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
  buttonSection: {
    marginBottom: 24,
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pairCodeButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  pairCodeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  spacing: {
    height: 12,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  biometricSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  faceIDButton: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    minHeight: 80,
  },
  fingerprintButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 80,
  },
  biometricGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  biometricText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#FFFFFF',
  },
});

