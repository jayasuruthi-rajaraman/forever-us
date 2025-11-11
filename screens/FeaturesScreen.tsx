import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { HeartIcon } from '../components/HeartIcon';
import { LinearGradient } from 'expo-linear-gradient';

// Images for features screen
const imageCouple = require('../assets/images/download (2).jpeg');
const imageMemories = require('../assets/images/From Paris With Love - Rebel Walls.jpeg');
const imageRomantic = require('../assets/images/Design - Playground.jpeg');

interface FeaturesScreenProps {
  navigation: any;
}

export const FeaturesScreen: React.FC<FeaturesScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.replace('Dashboard');
  };

  const handleSkip = () => {
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0A0A14' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeartIcon size={20} color="#FF69B4" animated={false} />
          <Text style={styles.headerText}>Forever Us</Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* First Section - Couple Intimate Moment */}
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            <Image source={imageCouple} style={styles.featureImage} resizeMode="cover" />
          </View>
          <Text style={styles.sectionTitle}>Stay connected privately</Text>
          <Text style={styles.sectionSubtitle}>with your partner</Text>
          <View style={styles.heartSeparator}>
            <HeartIcon size={20} color="#FF69B4" animated={true} />
          </View>
        </View>

        {/* Second Section - Memories Jar */}
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            <Image source={imageMemories} style={styles.featureImage} resizeMode="cover" />
          </View>
          <Text style={styles.sectionTitle}>Save your memories</Text>
          <Text style={styles.sectionSubtitle}>securely in your vault</Text>
          <View style={styles.heartSeparator}>
            <HeartIcon size={20} color="#FF69B4" animated={true} />
          </View>
        </View>

        {/* Third Section - Romantic Illustration */}
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            <Image source={imageRomantic} style={styles.featureImage} resizeMode="cover" />
          </View>
          <Text style={styles.sectionTitle}>Let AI strengthen your bond</Text>
          <Text style={styles.sectionSubtitle}>every day</Text>
          <View style={styles.heartSeparator}>
            <HeartIcon size={20} color="#FF69B4" animated={true} />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive, styles.dotSpacing]} />
          <View style={[styles.dot, styles.dotInactive, styles.dotSpacing]} />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.backButton, styles.backButtonMargin, { backgroundColor: '#1A1A2E' }]}
            onPress={handleBack}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={handleNext}
          >
            <LinearGradient
              colors={[theme.colors.buttonPrimary, theme.colors.accentLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.nextButton}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
    alignItems: 'center', 
  },
  imageContainer: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#1A1A2E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  placeholderCouple: {
    backgroundColor: '#2D2D44',
  },
  placeholderMemories: {
    backgroundColor: '#2D2D44',
  },
  placeholderRomantic: {
    backgroundColor: '#1A1A3E',
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.5,
    marginTop: 12,
    textAlign: 'center',
  },
  // Placeholder for couple image
  placeholderCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF69B480',
    position: 'absolute',
    left: '30%',
    top: '35%',
  },
  placeholderCircleRight: {
    left: '50%',
    backgroundColor: '#FF69B460',
  },
  // Placeholder for memories jar
  placeholderJar: {
    width: 50,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#FFFFFF20',
    borderWidth: 2,
    borderColor: '#FFFFFF40',
    position: 'absolute',
    top: '30%',
  },
  placeholderNotes: {
    position: 'absolute',
    top: '32%',
    width: 60,
    height: 60,
  },
  note: {
    width: 20,
    height: 15,
    backgroundColor: '#FFB6C1',
    borderRadius: 3,
    position: 'absolute',
    left: 15,
    top: 10,
    opacity: 0.7,
  },
  note2: {
    backgroundColor: '#DDA0DD',
    left: 20,
    top: 25,
  },
  note3: {
    backgroundColor: '#F0E68C',
    left: 25,
    top: 40,
  },
  // Placeholder for romantic illustration
  placeholderTree: {
    width: 80,
    height: 100,
    backgroundColor: '#2D1B3D',
    borderRadius: 40,
    position: 'absolute',
    top: '20%',
    borderWidth: 2,
    borderColor: '#4A2C5A',
  },
  placeholderOrb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: '45%',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  placeholderMoon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: '15%',
    right: '20%',
    opacity: 0.9,
  },
 sectionTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#FFFFFF',
  marginBottom: 4,
  textAlign: 'center',  // Add this line
},
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 12,
    textAlign: 'center',
  },
  heartSeparator: {
    alignItems: 'center',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingTop: 16,
    backgroundColor: '#0A0A14',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotSpacing: {
    marginLeft: 8,
  },
  dotActive: {
    backgroundColor: '#FF69B4',
  },
  dotInactive: {
    backgroundColor: '#FF69B450',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  backButtonMargin: {
    marginRight: 12,
  },
  backButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  nextButtonContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 56,
  },
  nextButton: {
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
});

