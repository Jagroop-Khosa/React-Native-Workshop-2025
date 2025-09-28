// components/Card.tsx
// A simple, reusable "resume/experience" card.
// Shows a small square image on the left (or initials as a fallback),
// then title, optional subtitle, description, and an optional link.
// If linkUrl (or onPress) is provided, the WHOLE card is tappable.

import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

// ---- What props can this Card accept? ----
export type CardProps = {
  title: string;                 // Main line (e.g., "Backend SWE Intern")
  description?: string;          // A few details about the role or project
  image?: ImageSourcePropType;   // Left image: require('...') or { uri: '...' }
  linkUrl?: string;              // If set, tapping the card will open this URL
  style?: ViewStyle;             // Optional extra styling for the outer container
  imageSize?: number;            // Size of the square image (default 64)
  onPress?: () => void;          // Optional custom press handler (overrides linkUrl)
  descriptionLines?: number;     // Clamp description lines (default 3)
  subtitle?: string;             // Smaller helper line under the title (e.g., org • dates)
};

// Tiny helper to check if a string "looks like" a URL
function isLikelyUrl(url?: string) {
  return !!url && /^(https?:)?\/\//i.test(url);
}

// memo(...) makes React skip re-rendering this component
// if its props haven't changed. That's just a performance win.
const Card = memo(function Card({
  title,
  description,
  image,
  linkUrl,
  style,
  imageSize = 64,
  onPress,
  descriptionLines = 3,
  subtitle,
}: CardProps) {
  // If the card has a link or custom onPress,
  // we render a Pressable (tappable). Otherwise, a plain View.
  const Container: React.ComponentType<any> =
    onPress || isLikelyUrl(linkUrl) ? Pressable : View;

  // What happens when the user taps the card?
  const handlePress = async () => {
    // 1) If a custom onPress was provided, use that.
    if (onPress) return onPress();
    // 2) Otherwise, if we have a URL, try to open it in the browser.
    if (isLikelyUrl(linkUrl)) {
      try {
        await Linking.openURL(linkUrl as string);
      } catch {
        // If opening fails, we simply ignore in this demo.
        // In a real app, you might show a toast/snackbar here.
      }
    }
  };

  return (
    <Container
      style={[styles.card, style]}
      onPress={handlePress}
      // Nice ripple effect on Android when pressed:
      android_ripple={{ color: '#e5e7eb' }}
    >
      {/* LEFT: Image square (or initials if no image given) */}
      <View style={[styles.media, { width: imageSize, height: imageSize, borderRadius: 12 }]}>
        {image ? (
          <Image source={image} style={[styles.img, { borderRadius: 12 }]} />
        ) : (
          <View style={[styles.placeholder, { borderRadius: 12 }]}>
            <Text style={styles.placeholderText}>{initials(title)}</Text>
          </View>
        )}
      </View>

      {/* RIGHT: Text content area */}
      <View style={styles.content}>
        {/* Title is bold and can wrap up to 2 lines */}
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        {/* Optional subtitle (smaller, lighter) */}
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}

        {/* Optional description (clamped to a few lines so cards stay compact) */}
        {description ? (
          <Text style={styles.desc} numberOfLines={descriptionLines}>{description}</Text>
        ) : null}

        {/* Optional link preview text (also clickable because the whole card is pressable) */}
        {isLikelyUrl(linkUrl) ? (
          <Text style={styles.link} numberOfLines={1}>
            {linkUrl}
          </Text>
        ) : null}
      </View>
    </Container>
  );
});

export default Card;

/* ---------- Small helpers & styles ---------- */

// If no image is provided, we show initials from the title.
// e.g., "Backend SWE Intern" -> "BS"
function initials(text: string) {
  const parts = text.trim().split(/\s+/).slice(0, 2); // first two words
  return parts.map(p => p[0]?.toUpperCase() ?? '').join('');
}

const styles = StyleSheet.create({
  // Outer container of the card
  card: {
    flexDirection: 'row',      // image on the left, text on the right
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 12,                   // space between image and text
    alignItems: 'center',
    // subtle shadow (works on both platforms)
    elevation: 2,              // Android shadow
    shadowColor: '#000',       // iOS shadow
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  // The box that holds the image (or the initials placeholder)
  media: {
    overflow: 'hidden',        // round the image corners
    backgroundColor: '#f1f5f9' // light gray behind images
  },

  // The image itself fills the media box
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',       // crop to fill the square without stretching
  },

  // Fallback if there's no image: a dark box with initials
  placeholder: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#e2e8f0',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
  },

  // Right column with text
  content: {
    flex: 1,   // take up remaining width
    gap: 4,
  },

  // Text styles
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  desc: {
    fontSize: 13,
    color: '#111827',
  },

  // Link preview style (the card press actually opens it)
  link: {
    fontSize: 12,
    color: '#2563eb',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});
