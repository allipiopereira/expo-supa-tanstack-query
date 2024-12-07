import { View, Image, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { XCircle } from "@/components/ui/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/auth-provider";

const emailSchema = z.object({
  email: z
    .string({ required_error: "*Campo obrigatório." })
    .email("Digite um email válido."),
});

const otpSchema = z.object({
  otp: z
    .string({ required_error: "*Campo obrigatório." })
    .min(6, "O código deve ter pelo menos 6 dígitos."),
});

export default function SignInScreen() {
  const router = useRouter();
  const { signInWithOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = step === "email" ? emailSchema : otpSchema;

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      otp: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    if (step === "email") {
      const error = await signInWithOtp(data.email);
      if (!error) {
        setEmail(data.email);
        setStep("otp");
        reset({ otp: "" });
      } else {
        console.log(error);
      }
    } else if (step === "otp") {
      const error = await verifyOtp(email, data.otp);
      if (!error) {
        router.push("/(protected)");
      } else {
        console.log(error);
      }
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 px-6">
      <Stack.Screen options={{ title: "Sign in" }} />

      <View className="flex flex-row justify-between items-center mt-10">
        <Image
          source={require("@/assets/images/icon.png")}
          style={{
            width: 82,
            height: 50,
            alignSelf: "center",
            objectFit: "contain",
          }}
        />
      </View>

      <View className="my-20">
        <View className="flex flex-row">
          <Text type="semibold" className="text-[1.7rem]">
            Olá,{" "}
          </Text>
          <Text type="semibold" className={"text-blue-500 text-[1.7rem]"}>
            Userline
          </Text>
        </View>
        <Text type="semibold" className="text-[1.7rem] opacity-45">
          Faça login na sua conta
        </Text>
      </View>

      {step === "email" && (
        <>
          <Text type="medium" className="text-lg opacity-60">
            Email
          </Text>

          <Controller
            control={control}
            name="email"
            render={({
              field: { value, onChange, onBlur },
              fieldState: error,
            }) => (
              <>
                <Input
                  placeholder="Digite seu e-mail"
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  iconRight={
                    value.length > 0
                      ? {
                          icon: <XCircle width={20} height={20} color="#999" />,
                          action: () => {
                            onChange("");
                          },
                        }
                      : undefined
                  }
                />

                {error && (
                  <Text
                    style={[{ color: "red", fontFamily: "Manrope_400Regular" }]}
                    className="opacity-70"
                  >
                    {error.error?.message}
                  </Text>
                )}
              </>
            )}
          />

          <Text className="opacity-50">
            Enviaremos um código de verificação para você.
          </Text>
        </>
      )}

      {step === "otp" && (
        <>
          <Text type="medium" className="text-lg opacity-60">
            Código OTP
          </Text>

          <Controller
            control={control}
            name="otp"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <Input
                  placeholder="Digite o código OTP"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                />

                {error && (
                  <Text
                    style={{ color: "red", fontFamily: "Manrope_400Regular" }}
                    className="opacity-70"
                  >
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />

          <Text className="opacity-50">Confirme o código que enviamos.</Text>

          <Pressable
            onPress={() => {
              setStep("email");
              reset({ email: "", otp: "" });
            }}
          >
            <Text className="text-blue-500 mt-4">Alterar email</Text>
          </Pressable>
        </>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        className="mt-14 bg-blue-800 py-2 rounded-full"
      >
        <Text type="semibold" style={{ fontSize: 18 }} className="text-white">
          {loading ? "Carregando..." : "Continuar"}
        </Text>
      </Button>
    </SafeAreaView>
  );
}
