// components/Header.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';

// ---- Props the component accepts ----
export type HeaderProps = {
  name: string;                    // Your full name
  bio: string;                     // Short 1–2 sentence bio
  image?: ImageSourcePropType;     // Avatar image (require('...') or { uri: '...' })
  linkedinUrl?: string;            // Full LinkedIn URL (optional)
  style?: ViewStyle;               // Optional: outer spacing from parent
};

// A small helper to make initials from the name, e.g., "Ada Lovelace" -> "AL"
function initials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).slice(0, 2); // take first & last
  return parts.map(p => p[0]?.toUpperCase() ?? '').join('');
}

export default function Header({
  name,
  bio,
  image,
  linkedinUrl,
  style,
}: HeaderProps) {
  // Open LinkedIn if we have a URL. If not, do nothing.
  const onOpenLinkedIn = async () => {
    if (!linkedinUrl) return;
    try {
      await Linking.openURL(linkedinUrl);
    } catch {
      // In a real app you might show a toast/snackbar here.
    }
  };

  return (
    // Wrapper row: avatar on the left, text on the right
    <View style={[styles.wrapper, style]}>
      {/* Avatar area */}
      <View style={styles.avatarBox}>
        {image ? (
          <Image source={image} style={styles.avatar} />
        ) : (
          // Fallback if no image: a simple box with initials
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>{initials(name)}</Text>
          </View>
        )}
      </View>

      {/* Text content */}
      <View style={styles.content}>
        {/* Name: single line to avoid wrapping too much */}
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        {/* Bio: allow up to 3 lines */}
        <Text style={styles.bio} numberOfLines={3}>
          {bio}
        </Text>

        {/* LinkedIn button (only shows if a URL was provided) */}
        {linkedinUrl ? (
          <Pressable onPress={onOpenLinkedIn} style={styles.linkBtn}>
            <Text style={styles.linkBtnText}>View LinkedIn</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

// ---- Styles (kept simple & readable) ----
const styles = StyleSheet.create({
  // Horizontal card layout with a bit of padding and rounded corners
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    // Small shadow so it looks like a card (works on iOS & Android)
    elevation: 2, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  // Fixed size box for the avatar
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Actual image (fills the box)
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },

  // Fallback background if no image
  placeholder: {
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Initials text shown in the placeholder
  placeholderText: {
    color: '#e5e7eb',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1,
  },

  // Right side (text column)
  content: {
    flex: 1,
    gap: 6,
  },

  // Name styling: make it stand out
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  // Bio styling: normal body text
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: '#111827',
  },

  // Simple solid button for LinkedIn
  linkBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#2563eb',
  },
  linkBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
