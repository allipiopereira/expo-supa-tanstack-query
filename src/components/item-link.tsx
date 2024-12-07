import { Href, Link } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "./ui/text";
import RemixIcon from "react-native-remix-icon";
import { ArrowRight } from "./ui/icons";

interface Props {
  path: Href;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export function ItemLink({ path, title, subtitle, icon }: Props) {
  return (
    <Link href={path}>
      <View
        className={`flex flex-row justify-between items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl`}
      >
        <View className="flex flex-row w-80">
          <View className="flex w-14 h-14 items-center justify-center bg-gray-100 rounded-full">
            {icon}
          </View>

          <View className="flex-shrink w-full px-3">
            <Text type="medium" className="text-lg">
              {title}
            </Text>
            <Text className="break-words opacity-60 leading-tight">
              {subtitle}
            </Text>
          </View>
        </View>

        <ArrowRight
          width={24}
          height={24}
          color="#9ca3af"
          className="opacity-50"
          strokeWidth={0.7}
        />
      </View>
    </Link>
  );
}
