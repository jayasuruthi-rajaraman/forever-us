import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';
import { HeartIcon } from '../components/HeartIcon';
import { PairIcon } from '../components/icons/PairIcon';
import { QRIcon } from '../components/icons/QRIcon';
import { CardIcon } from '../components/icons/CardIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

// Profile images
const profileImageMan = require('../assets/images/download (3).jpeg');
const profileImageWoman = require('../assets/images/download (6).jpeg');

interface PairingScreenProps {
  navigation: any;
}

export const PairingScreen: React.FC<PairingScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'generate' | 'enter'>('generate');
  const [pairCode, setPairCode] = useState('FORE-VER-123');
  const [partnerCode, setPartnerCode] = useState('');

  const handleGenerateCode = () => {
    // Generate a new code
    const newCode = `FORE-VER-${Math.floor(1000 + Math.random() * 9000)}`;
    setPairCode(newCode);
    Alert.alert('Success', 'New pair code generated!');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Pair code sharing functionality');
  };

  const handlePaste = async () => {
    // In a real app, this would read from clipboard
    Alert.alert('Paste', 'Paste functionality');
  };

  const handleConnect = () => {
    if (!partnerCode.trim()) {
      Alert.alert('Error', 'Please enter your partner\'s code');
      return;
    }
    Alert.alert('Success', 'Connected with your partner!');
    navigation.replace('NextPage');
  };

  const handleSkip = () => {
    navigation.replace('NextPage');
  };

  const handleNeedHelp = () => {
    Alert.alert('Need Help', 'Contact support for assistance with pairing.');
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
            <HeartIcon size={20} color={theme.colors.accentPink} animated={true} />
            <Text style={[styles.headerText, { color: theme.colors.text }]}>Forever Us</Text>
          </View>

          {/* Main Card with Gradient */}
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#1A0F2D', '#2D1B3D', '#3D2B4D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.card}
            >
              {/* Title Section */}
              <View style={styles.titleSection}>
                <View style={styles.titleRow}>
                  <PairIcon size={24} color={theme.colors.text} />
                  <Text style={styles.title}>
  Pair with your partner.
</Text>
                </View>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                  Two hearts, one space.
                </Text>
              </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  styles.tabLeft,
                  activeTab === 'generate' && styles.tabActiveContainer,
                  activeTab !== 'generate' && {
                    backgroundColor: theme.colors.inputBackground,
                  },
                ]}
                onPress={() => setActiveTab('generate')}
              >
                {activeTab === 'generate' ? (
                  <LinearGradient
                    colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.tabGradient}
                  >
                    <Text style={[styles.tabText, { color: theme.colors.text }]}>
                      Generate Code
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={[styles.tabText, { color: theme.colors.text }]}>
                    Generate Code
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  styles.tabRight,
                  activeTab === 'enter' && styles.tabActiveContainer,
                  activeTab !== 'enter' && {
                    backgroundColor: theme.colors.inputBackground,
                  },
                ]}
                onPress={() => setActiveTab('enter')}
              >
                {activeTab === 'enter' ? (
                  <LinearGradient
                    colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.tabGradient}
                  >
                    <Text style={[styles.tabText, { color: theme.colors.text }]}>
                      Enter Code
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={[styles.tabText, { color: theme.colors.text }]}>
                    Enter Code
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Profile Pictures and Pairing Indicator */}
            <View style={styles.profileSection}>
              <View style={styles.profileCircle}>
                <Image 
                  source={profileImageMan} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.pairingIndicator}>
                <HeartIcon size={16} color={theme.colors.accentPink} animated={false} />
                <View style={{ marginHorizontal: 4 }}>
                  <ArrowRightIcon size={16} color={theme.colors.buttonPrimary} />
                </View>
                <View style={{ marginHorizontal: 4 }}>
                  <ArrowRightIcon size={16} color={theme.colors.buttonPrimary} />
                </View>
                <HeartIcon size={16} color={theme.colors.buttonPrimary} animated={false} />
              </View>
              <View style={styles.profileCircle}>
                <Image 
                  source={profileImageWoman} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Your Pair Code Section */}
            <View style={[styles.codeSectionCard, { backgroundColor: theme.colors.inputBackground }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Your Pair Code
              </Text>
              <View
                style={[
                  styles.codeDisplay,
                  { backgroundColor: theme.colors.cardBackground },
                ]}
              >
                <QRIcon size={20} color={theme.colors.text} />
                <View style={styles.codeContent}>
                  <KeyIcon size={16} color={theme.colors.text} />
                  <Text style={[styles.codeLabel, { color: theme.colors.text, marginLeft: 8 }]}>Code</Text>
                </View>
                <Text style={[styles.codeValue, { color: theme.colors.text }]}>{pairCode}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    { backgroundColor: theme.colors.cardBackground },
                  ]}
                  onPress={handleShare}
                >
                  <Text style={[styles.buttonText, { color: theme.colors.text }]}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButtonContainer}
                  onPress={handleGenerateCode}
                >
                  <LinearGradient
                    colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.primaryButton}
                    pointerEvents="none"
                  >
                    <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                      Regenerate
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Enter Partner's Code Section */}
            <View style={[styles.codeSectionCard, { backgroundColor: theme.colors.inputBackground }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Enter Partner's Code
              </Text>
              <View
                style={[
                  styles.codeInput,
                  { backgroundColor: theme.colors.cardBackground },
                ]}
              >
                <CardIcon size={20} color={theme.colors.text} />
                <View style={styles.inputContent}>
                  <HeartIcon size={16} color={theme.colors.accentPink} animated={false} />
                  <Text style={[styles.inputLabel, { color: theme.colors.text, marginLeft: 8 }]}>
                    Pair Code
                  </Text>
                </View>
                <TextInput
                  style={[styles.inputField, { color: theme.colors.text }]}
                  placeholder="----------"
                  placeholderTextColor={theme.colors.textTertiary}
                  value={partnerCode}
                  onChangeText={setPartnerCode}
                  autoCapitalize="characters"
                />
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    { backgroundColor: theme.colors.cardBackground },
                  ]}
                  onPress={handlePaste}
                >
                  <Text style={[styles.buttonText, { color: theme.colors.text }]}>Paste</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButtonContainer}
                  onPress={handleConnect}
                >
                  <LinearGradient
                    colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.primaryButton}
                    pointerEvents="none"
                  >
                    <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                      Connect
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            </LinearGradient>
          </View>

          {/* Security Message */}
          <Text style={[styles.securityMessage, { color: theme.colors.textSecondary }]}>
            Codes refresh every 10 minutes for security.
          </Text>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNeedHelp}>
            <Text style={[styles.footerText, { color: theme.colors.text }]}>Need help?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.footerText, { color: theme.colors.text }]}>Skip</Text>
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
  },
  cardContainer: {
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 24,
    padding: 24,
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
    color: '#FFFFFF', 
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLeft: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  tabRight: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  tabActiveContainer: {
    overflow: 'hidden',
  },
  tabGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#241538',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profilePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  pairingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  codeSection: {
    marginBottom: 24,
  },
  codeSectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  codeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    minHeight: 56,
  },
  codeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  codeLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  codeValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  codeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    minHeight: 56,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    marginRight: 12,
  },
  primaryButtonContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
  },
  primaryButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  securityMessage: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 12,
  },
});

