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
        <Text style={styles.heading}>About me</Text>
        <Header
        name="Jagroop Khosa"
        bio="Fourth Year Computer Science Major @ UB"
        linkedinUrl='https://www.linkedin.com/in/jagroop-khosa-60533a2b9/'
        image={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Buffalo_Bulls_logo.svg/1280px-Buffalo_Bulls_logo.svg.png"}}><Text>My Name Is Jagroop</Text> </Header>
        {/* use Components like View, Text, Header, Card, Higlight Card, and Like button to make your own about me page */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)' },

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
