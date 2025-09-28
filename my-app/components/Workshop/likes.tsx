// components/likeButton.tsx
import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';

export type likeButtonProps = {
  /** Optional label to show next to the count */
  label?: string;
  /** Start value (default 0) */
  initial?: number;
  /** Optional outer spacing from parent */
  style?: ViewStyle;
};

/**
 * A tiny "like" button:
 * - Shows a count (state)
 * - Tapping the button increments the count
 */
export default function LikeButton({ label = 'like', initial = 0, style }: likeButtonProps) {
  // 1) Declare state: a number and a function to update it
  const [count, setCount] = useState<number>(initial);

  // 2) When pressed, add 1 to the current count
  const onPress = () => setCount(prev => prev + 1);

  return (
    <View style={[styles.row, style]}>
      {/* The button the user taps */}
      <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}>
        <Text style={styles.btnText}>👍 Give like</Text>
      </Pressable>

      {/* The live-updating count */}
      <Text style={styles.count}>
        {label}: {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20 },
  btn: {
    backgroundColor: '#0f172a',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  btnPressed: { opacity: 0.9 },
  btnText: { color: '#fff', fontWeight: '700' },
  count: { fontSize: 16, color: '#111827' },
});
