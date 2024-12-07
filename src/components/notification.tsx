import { View } from "react-native";
import { Text } from "./ui/text";
import { Badge } from "./ui/badge";

export function Notification() {
  return (
    <Badge className="px-3 pt-1.5 bg-red-500">
      <Text type="bold" style={{ fontSize: 14 }}>
        10+
      </Text>
    </Badge>
  );
}
