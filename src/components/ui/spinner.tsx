import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";

interface SpinnerProps {
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: { width: 16, height: 16 },
  md: { width: 24, height: 24 },
  lg: { width: 32, height: 32 },
};

const Spinner: React.FC<SpinnerProps> = ({ loading = true, size = "sm" }) => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1200, // 1.2s para uma volta completa
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotation.stopAnimation();
    }
  }, [loading, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!loading) return null;

  return (
    <View style={[styles.container, spinnerSizes[size]]}>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.leaf,
              {
                transform: [
                  { rotate: `${i * 45}deg` }, // 45 graus entre as folhas
                ],
              },
            ]}
          >
            <View style={styles.dot} />
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    opacity: 0.65,
  },
  spinner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  leaf: {
    position: "absolute",
    width: "12.5%", // Cada folha ocupa 12.5% do spinner
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dot: {
    width: 6, // Tamanho da "folha"
    height: 6,
    backgroundColor: "#000", // Altere para a cor desejada
    borderRadius: 3,
  },
});

export { Spinner };
