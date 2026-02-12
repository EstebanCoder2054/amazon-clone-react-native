import { Stack } from 'expo-router/stack';
import { cssInterop } from 'nativewind';
import { TextStyle, ViewStyle } from 'react-native';

// https://github.com/karakeep-app/karakeep/blob/300f3c5d0b661c430ad2f6b479b151ec65f14243/apps/mobile/components/navigation/stack.tsx
interface StackProps extends React.ComponentProps<typeof Stack> {
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}

function StackImpl({ contentStyle, headerStyle, headerTextStyle, ...props }: StackProps) {
  const { color: _ignoredColor, ...headerViewStyle } = (headerStyle ?? {}) as ViewStyle & {
    color?: string;
  };
  props.screenOptions = {
    ...props.screenOptions,
    contentStyle,
    headerStyle: headerViewStyle,
    navigationBarColor: contentStyle?.backgroundColor?.toString(),
    headerTintColor: headerTextStyle?.color?.toString(),
    headerTitleStyle: headerTextStyle,
  };
  return <Stack {...props} />;
}

// Changing this requires reloading the app
export const StyledStack = cssInterop(StackImpl, {
  contentClassName: 'contentStyle',
  headerClassName: 'headerStyle',
  headerTextClassName: 'headerTextStyle',
});