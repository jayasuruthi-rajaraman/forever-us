import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { HeartIcon } from '../components/HeartIcon';
import { PadlockIcon } from '../components/icons/PadlockIcon';
import { EnvelopeIcon } from '../components/icons/EnvelopeIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { FaceIDIcon } from '../components/icons/FaceIDIcon';
import { FingerprintIcon } from '../components/icons/FingerprintIcon';
import { verifyEmailPassword, verifyPairCode, verifyPairCodeOnly } from '../services/mockAuth';
import { authenticateWithFaceID, authenticateWithFingerprint } from '../services/biometric';

type TabType = 'login' | 'signup';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [loading, setLoading] = useState(false);

  const tabPosition = useSharedValue(0);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    tabPosition.value = withTiming(tab === 'login' ? 0 : 1, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  };

  React.useEffect(() => {
    tabPosition.value = activeTab === 'login' ? 0 : 1;
  }, []);

  const tabAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPosition.value * 50 }],
    };
  });

  const handleContinue = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (email && password && pairCode) {
        // Verify all three
        const emailResult = await verifyEmailPassword(email, password);
        const pairResult = await verifyPairCode(pairCode);

        if (emailResult.success && pairResult.success) {
          navigation.replace('Pairing');
        } else {
          Alert.alert('Error', emailResult.message || pairResult.message || 'Authentication failed');
        }
      } else if (email && password) {
        // Email and password only
        const result = await verifyEmailPassword(email, password);
        if (result.success) {
          navigation.replace('Pairing');
        } else {
          Alert.alert('Error', result.message || 'Authentication failed');
        }
      } else {
        Alert.alert('Error', 'Please fill in the required fields');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePairCodeOnly = async () => {
    if (loading || !pairCode) {
      Alert.alert('Error', 'Please enter a pair code');
      return;
    }

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

  const handleGetHelp = () => {
    Alert.alert('Get Help', 'Contact support for assistance with signing in.');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy', 'Privacy policy information');
  };

  const handleTerms = () => {
    Alert.alert('Terms', 'Terms of service information');
  };

  return (
    <SafeAreaView style={styles.container}>
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
            <HeartIcon size={20} color="#FF69B4" animated={false} />
            <Text style={styles.headerText}>Forever Us</Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Title Section */}
            <View style={styles.titleSection}>
              <View style={styles.titleRow}>
                <PadlockIcon size={24} color="#FFFFFF" />
                <Text style={styles.title}>Sign in to continue.</Text>
              </View>
              <Text style={styles.subtitle}>Welcome back to your forever.</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, styles.tabLeft]}
                onPress={() => handleTabChange('login')}
              >
                {activeTab === 'login' ? (
                  <LinearGradient
                    colors={['#FF69B4', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tabGradient}
                  >
                    <Text style={styles.tabTextActive}>Login</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.tabTextInactive}>Login</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, styles.tabRight]}
                onPress={() => handleTabChange('signup')}
              >
                {activeTab === 'signup' ? (
                  <LinearGradient
                    colors={['#FF69B4', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tabGradient}
                  >
                    <Text style={styles.tabTextActive}>Sign Up</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.tabTextInactive}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputSection}>
              <View style={styles.inputFieldContainer}>
                <EnvelopeIcon size={20} color="#FFFFFF" />
                <TextInput
                  style={styles.inputField}
                  placeholder="name@example.com"
                  placeholderTextColor="#808080"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <KeyIcon size={20} color="#FFFFFF" />
                <TextInput
                  style={styles.inputField}
                  placeholder="********"
                  placeholderTextColor="#808080"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputFieldContainer}>
                <HeartIcon size={20} color="#FF69B4" animated={false} />
                <TextInput
                  style={styles.inputField}
                  placeholder="ABCD-1234"
                  placeholderTextColor="#808080"
                  value={pairCode}
                  onChangeText={setPairCode}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#FF69B4', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Continue'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.spacing} />
              <TouchableOpacity
                style={styles.pairCodeButton}
                onPress={handlePairCodeOnly}
                disabled={loading}
              >
                <Text style={styles.pairCodeButtonText}>Use Pair Code only</Text>
              </TouchableOpacity>
            </View>

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Biometric Options */}
            <View style={styles.biometricSection}>
              <TouchableOpacity
                style={styles.faceIDButton}
                onPress={handleFaceID}
                disabled={loading}
              >
                <FaceIDIcon size={24} color="#FFFFFF" />
                <Text style={styles.biometricText}>Face ID</Text>
              </TouchableOpacity>
              <View style={styles.spacing} />
              <TouchableOpacity
                style={styles.fingerprintButton}
                onPress={handleFingerprint}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#FF69B4', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.biometricGradient}
                >
                  <FingerprintIcon size={24} color="#FFFFFF" />
                  <Text style={styles.biometricText}>Fingerprint</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Help Link */}
            <TouchableOpacity onPress={handleGetHelp} style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Trouble signing in?{' '}
                <Text style={styles.helpLink}>Get help.</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handlePrivacy}>
            <Text style={styles.footerText}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTerms}>
            <Text style={styles.footerText}>Terms</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A14',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
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
    color: '#FFFFFF',
  },
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    backgroundColor: '#1A1A2E',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#B0B0B0',
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
    color: '#FFFFFF',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    padding: 0,
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
    backgroundColor: '#2D2D44',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  pairCodeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
    backgroundColor: '#4A4A6A',
  },
  separatorText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#B0B0B0',
  },
  biometricSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  faceIDButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#2D2D44',
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
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  helpLink: {
    fontWeight: '600',
    color: '#FF69B4',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

