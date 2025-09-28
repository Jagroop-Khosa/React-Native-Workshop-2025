// app/AppDev.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
} from 'react-native';

/* ===================== THEME (light, colorful) ===================== */
export const color = {
  // Base
  bg:    '#FFFFFF',  // white background
  panel: '#F7FAFF',  // ultra-light blue panel (cards/hero backdrop)
  card:  '#FFFFFF',

  // Text
  text:  '#0F172A',  // near-black for readability
  muted: '#475569',  // secondary text
  border:'#E5E7EB',  // light gray borders

  // Brand
  primary: '#0B5FFF', // deep blue (main brand)
  yellow:  '#FFD400', // rubber-duck yellow
  orange:  '#FF8A00', // small accent orange

  // Tints
  primarySoft: '#E7EFFF',
  yellowSoft:  '#FFF5CC',
  orangeSoft:  '#FFE5CC',
};

const radius = { s: 10, m: 16, l: 20 };

/* ===================== UTIL ===================== */
function open(url: string) {
  return async () => {
    try { await Linking.openURL(url); } catch {}
  };
}

/* ===================== UI PRIMITIVES ===================== */
function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}>
      <Text style={styles.btnPrimaryText}>{label}</Text>
    </Pressable>
  );
}

function GhostButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btnGhost, pressed && styles.btnGhostPressed]}>
      <Text style={styles.btnGhostText}>{label}</Text>
    </Pressable>
  );
}

// Thin colored bar under section titles
function AccentBar({ colorKey = 'primary' as keyof typeof color }) {
  return <View style={[styles.accentBar, { backgroundColor: color[colorKey] }]} />;
}

// Soft info banner using duck yellow tint
function InfoBanner({ text }: { text: string }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>🪿 {text}</Text>
    </View>
  );
}

/* ===================== SUB-COMPONENTS ===================== */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ rowGap: 10 }}>
      <Text style={styles.h2}>{title}</Text>
      <AccentBar colorKey="yellow" />
      {children}
    </View>
  );
}

// Pillar card (What we do)
function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.pillar}>
      <Text style={styles.h4}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

// Project card (text-only, no image)
function ProjectCard({
  name,
  blurb,
  linkLabel,
  linkUrl,
}: {
  name: string;
  blurb: string;
  icon?: string;
  linkLabel?: string;
  linkUrl?: string;
}) {
  const onPress = async () => {
    if (!linkUrl) return;
    try { await Linking.openURL(linkUrl); } catch {}
  };

  return (
    <View style={styles.projectCard}>
      {/* Icon / Emoji */}

      {/* Title + blurb */}
      <Text style={styles.h4}>{name}</Text>
      <Text style={[styles.body, { color: color.muted }]}>{blurb}</Text>

      {/* Optional CTA */}
      {linkUrl ? (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.btnGhost, pressed && styles.btnGhostPressed]}>
          <Text style={styles.btnGhostText}>{linkLabel ?? 'View project'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
// Alternating soft tags (blue / yellow)
function Tags({ items }: { items: string[] }) {
  return (
    <View style={styles.tagRow}>
      {items.map((t, i) => {
        const isEven = i % 2 === 0;
        return (
          <View
            key={t}
            style={[
              styles.tag,
              isEven
                ? { backgroundColor: color.primarySoft, borderColor: color.primarySoft }
                : { backgroundColor: color.yellowSoft,  borderColor: color.yellowSoft  },
            ]}
          >
            <Text style={[styles.tagText, { color: color.text }]}>{t}</Text>
          </View>
        );
      })}
    </View>
  );
}

// Advisor mini row with orange dot
function Advisor({ name }: { name: string }) {
  return (
    <View style={styles.advisor}>
      <View style={styles.dot} />
      <Text style={styles.body}>{name}</Text>
    </View>
  );
}

/* ===================== SCREEN ===================== */
export default function AppDev() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={{ rowGap: 10 }}>
            <Text style={styles.kicker}>University at Buffalo</Text>
            <Text style={styles.h1}>UB AppDev</Text>
            <Text style={styles.lead}>
              We build real mobile & web apps for real people through collaboration,
              mentorship, and hands-on workshops.
            </Text>
          </View>

        </View>

        {/* What we do */}
        <Section title="What we do">
          <View style={styles.grid}>
            <Pillar
              title="Workshops"
              body="Hands-on sessions in React Native, backend APIs, and design — learn by building."
            />
            <Pillar
              title="Career Development"
              body="Events to help advance your career like resume review and guest speakers."
            />
            <Pillar
              title="Impact"
              body="Build for campus & community. Real users, real feedback."
            />
          </View>
        </Section>

        {/* Featured Projects */}
        <Section title="Featured projects">
          <View style={{ rowGap: 14 }}>
            <ProjectCard
              name="Impairment Detection"
              blurb="A app used by medical proffesionals and law enforcemnt to determine a patients impairment status."
            />
            <ProjectCard
              name="WellCloud"
              blurb="A medical record repository allowing people to take ownership of thier medical records."
            />
             <ProjectCard
              name="Sustainability App"
              blurb="Help students make greener choices around campus."
            />
            <ProjectCard
              name="Marketing Website"
              blurb="A fast, informative site that showcases the club and drives engagement."
            />
          </View>
        </Section>

        {/* Get involved */}
        <Section title="Get involved">
          <Text style={[styles.body, { marginBottom: 8 }]}>
            Join our discord to stay up to date on our events
          </Text>
          <View style={styles.inlineCtas}>
            <PrimaryButton label="Visit our site" onPress={open('https://ub-appdev.github.io/UB-AppDev_revamped/')} />
          </View>
        </Section>

        {/* Team & Advisors */}
        <Section title="Team & roles">
          <Text style={[styles.body, { marginBottom: 8 }]}>
            Student leads across design, frontend, backend, and operations keep the club running.
          </Text>
          <Tags
            items={[
              "President - Rohin Kumar", "Vice President - Ziang Chen ", "Product Designer - Salma Nurse", "Tech Lead - Jimin Shin ", "Tech Lead - Yujie Zou",
              "PR Coordinator - Kaiwen Gao", "Event Coordinator - Will O'Dea", "Secretary - Tahidur Anjan", "Treasurer - Vilson Zheng", "Project Manager - Liana Miao"  ,
            ]}
          />
        </Section>

        <Section title="Faculty advisors">
          <View style={styles.advisorsRow}>
            <Advisor name="Prof. Wenyao Xu" />
            <Advisor name="Prof. Mathew Hertz" />
          </View>
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg },
  content: { padding: 16, rowGap: 24 },

  inlineCtas: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },

  // TYPOGRAPHY
  kicker: { color: color.muted, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
  h1: { color: color.text, fontSize: 32, fontWeight: '800' },
  h2: { color: color.text, fontSize: 20, fontWeight: '800' },
  h4: { color: color.text, fontSize: 16, fontWeight: '700' },
  lead: { color: color.muted, fontSize: 14, lineHeight: 20 },
  body: { color: color.text, fontSize: 14, lineHeight: 20 },
  footer: { color: color.muted, textAlign: 'center', marginBottom: 16 },

  // DECOR
  accentBar: {
    height: 3,
    width: 48,
    borderRadius: 999,
  },

  // HERO
  hero: {
    backgroundColor: color.panel,
    borderRadius: radius.l,
    padding: 20,
    rowGap: 16,
    borderWidth: 1,
    borderColor: color.border,
  },
  ctaRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },

  // INFO BANNER
  banner: {
    backgroundColor: color.yellowSoft,
    borderColor: color.yellowSoft,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.s,
  },
  bannerText: { color: color.text, fontSize: 14 },

  // GRID / PILLARS
  grid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  pillar: {
    flex: 1,
    minWidth: 160,
    backgroundColor: color.card,
    borderRadius: radius.m,
    padding: 14,
    borderWidth: 1,
    borderColor: color.border,
  },

  projectCard: {
  borderRadius: radius.m,
  borderWidth: 1,
  borderColor: color.border,
  backgroundColor: color.card,
  padding: 14,
  rowGap: 8,
},

// Small, colorful icon at the top (duck yellow accent circle)
projectIcon: {
  alignSelf: 'flex-start',
  backgroundColor: color.yellowSoft,
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 999,
  fontSize: 14,       // emoji text size
},


  // TAGS
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  tagText: { fontSize: 12 },

  // ADVISORS
  advisorsRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  advisor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: color.card,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.s,
    borderWidth: 1,
    borderColor: color.border,
  },
  dot: { width: 8, height: 8, borderRadius: 999, backgroundColor: color.orange },

  // BUTTONS
  btnPrimary: {
    backgroundColor: color.primary,
    paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: radius.s,
  },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '800' },

  btnGhost: {
    backgroundColor: 'transparent',
    paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: radius.s,
    borderWidth: 1, borderColor: color.border,
  },
  btnGhostText: { color: color.text, fontWeight: '700' },
  btnPressed: { opacity: 0.9 },
  btnGhostPressed: { backgroundColor: color.orangeSoft },
});
