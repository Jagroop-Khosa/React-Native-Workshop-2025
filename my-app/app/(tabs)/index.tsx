  // app/index.tsx (HomeScreen)
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import Header from '@/components/Workshop/header';
import Card from '@/components/Workshop/card';
import HighlightCard from '@/components/Workshop/highlight';
import LikeButton from '@/components/Workshop/likes';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* use Components like View, Text, Header, Card, Higlight Card, and Like button to make your own about me page */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },

  // Inner padding + vertical spacing between blocks
  content: {
    paddingTop: 60,
    padding: 16,
    rowGap: 12, // RN 0.71+; if older RN, remove and use explicit margins
  },

  heading: {
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? ('800' as const) : 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },

  subheading: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? ('700' as const) : 'bold',
    color: '#0f172a',
    marginBottom: 8,
    marginTop: 4,
  },

  // Reusable margin for groups of content
  blockSpacing: {
    marginBottom: 16,
  },
});
