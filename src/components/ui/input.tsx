import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";

import { Button } from "./button";

import { cn } from "@/lib/utils";

interface IconRightProps {
  icon: React.ReactNode;
  action: (event: GestureResponderEvent) => void;
}

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  iconRight?: IconRightProps;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ iconRight, containerStyle, textInputStyle, className, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={ref}
          style={[styles.textInput, textInputStyle, styles.inputContainer]}
          className={cn(
            "web:flex web:h-8 native:h-11 web:w-full py-0 pl-0 pr-3 lg:text-md native:text-lg web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-0 web:focus-visible:ring-blue-700 web:focus-visible:ring-offset-0",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          {...props} //allipiopereira@gmail.com
        />
        {iconRight && (
          <Pressable onPress={iconRight.action} style={styles.iconContainer}>
            {iconRight.icon}
          </Pressable>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputContainer: {
    borderBottomColor: "#999",
    borderBottomWidth: 0.8,
  },
  textInput: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
  },
  iconContainer: {
    position: "absolute",
    right: 5,
    width: 20,
    height: 20,
  },
});

Input.displayName = "Input";

export { Input };
