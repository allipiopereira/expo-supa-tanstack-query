import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Text } from "../components/ui/text";
import { UserOutline } from "./ui/icons";
import RemixIcon from "react-native-remix-icon";
import { View } from "react-native";
import { useAuth } from "@/providers/auth-provider";

export function ProfileAvatar() {
  const { profile } = useAuth();

  if (profile?.avatar) {
    return (
      <Avatar
        alt="Perfil"
        style={{
          width: 38,
          height: 38,
          borderColor: "#000",
        }}
      >
        <AvatarImage source={{ uri: profile.avatar }} />
        <AvatarFallback>
          <Text type="bold">{profile.name.charAt(0).toUpperCase()}</Text>
        </AvatarFallback>
      </Avatar>
    );
  } else {
    return (
      <View className="flex items-center justify-center w-[38px] h-[38px] bg-gray-200 rounded-full">
        <RemixIcon name="user-fill" size={18} />
      </View>
    );
  }
}
