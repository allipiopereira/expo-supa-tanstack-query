import { ActivityIndicator } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/auth-provider";

export default function Index() {
  const { profile, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (profile) {
    return <Redirect href="/(protected)" />;
  }

  return <Redirect href={"/sign-in"} />;
}
