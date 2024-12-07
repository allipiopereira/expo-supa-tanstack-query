import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function HomePage() {
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="px-6 mt-10">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Bem vindo, {profile?.name}</Text>

        <Button onPress={logout} className="bg-red-400 py-2 w-full h-10">
          <Text className="text-white">Sair</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
