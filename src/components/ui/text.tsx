import * as Slot from "@rn-primitives/slot";
import { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

type Props = SlottableTextProps & {
  type?: "regular" | "medium" | "semibold" | "bold";
};

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, Props>(
  ({ className, style, type = "regular", asChild = false, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;

    const typeStyle = styles[type] || styles.regular;

    return (
      <Component
        className={cn(
          "text-base text-black web:select-text",
          textClass,
          className
        )}
        ref={ref}
        style={[typeStyle, style]}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Manrope_400Regular",
  },
  medium: {
    fontFamily: "Manrope_500Medium",
  },
  semibold: {
    fontFamily: "Manrope_600SemiBold",
  },
  bold: {
    fontFamily: "Manrope_700Bold",
  },
});

export { Text, TextClassContext };
