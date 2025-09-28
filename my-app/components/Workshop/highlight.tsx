// components/HighlightCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
  Linking,
  ViewStyle,
} from 'react-native';

export type HighlightCardProps = {
  image: ImageSourcePropType; // require('...') or { uri: '...' }
  caption: string;            // Text under the image
  style?: ViewStyle;          // Optional: outer spacing
  linkUrl?: string;           // Optional: tap card to open this URL
  captionLines?: number;      // Optional: limit caption lines (default 2)
};

export default function HighlightCard({
  image,
  caption,
  style,
  linkUrl,
  captionLines = 2,
}: HighlightCardProps) {
  const Container: React.ComponentType<any> = linkUrl ? Pressable : View;

  const onPress = async () => {
    if (!linkUrl) return;
    try {
      await Linking.openURL(linkUrl);
    } catch { /* ignore */ }
  };

  return (
    <Container style={[styles.card, style]} onPress={onPress}>
      {/* Image stays a perfect square using aspectRatio: 1 */}
      <View style={styles.imageWrap}>
        <Image source={image} style={styles.image} />
      </View>

      <Text style={styles.caption} numberOfLines={captionLines}>
        {caption}
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  // Rounded container so the image corners are rounded too
  imageWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Square image: width 100% of the card, height auto via aspectRatio
  image: {
    width: '100%',
    aspectRatio: 1,    // <-- square
    resizeMode: 'cover',
  },

  caption: {
    fontSize: 16,
    lineHeight: 22,
    color: '#111827',
  },
});
