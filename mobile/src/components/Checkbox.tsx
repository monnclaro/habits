import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-2 flex-row items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 items-center justify-center rounded-lg bg-green-500"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 rounded-lg bg-zinc-900" />
      )}

      <Text className="ml-3 text-base font-semibold text-white">{title}</Text>
    </TouchableOpacity>
  );
}
