import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { HeartIcon } from '../components/HeartIcon';

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <HeartIcon size={32} color={theme.colors.accentPink} animated={true} />
        <Text style={[styles.headerText, { color: theme.colors.text }]}>Forever Us</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Welcome!</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          You have successfully signed in.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.buttonSecondary }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.colors.text }]}>Logout</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  logoutButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

