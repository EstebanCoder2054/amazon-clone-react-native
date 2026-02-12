import { Tabs } from 'expo-router';
import { cssInterop } from 'nativewind';
import { TextStyle, ViewStyle } from 'react-native';

// https://github.com/karakeep-app/karakeep/blob/300f3c5d0b661c430ad2f6b479b151ec65f14243/apps/mobile/components/navigation/tabs.tsx

function StyledTabsImpl({
  tabBarStyle,
  headerStyle,
  headerTextStyle,
  ...props
}: React.ComponentProps<typeof Tabs> & {
  tabBarStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
}) {
  const { color: _ignoredColor, ...headerViewStyle } = (headerStyle ?? {}) as ViewStyle & {
    color?: string;
  };
  props.screenOptions = {
    ...props.screenOptions,
    tabBarStyle,
    headerStyle: headerViewStyle,
    headerTintColor: headerTextStyle?.color?.toString(),
    headerTitleStyle: headerTextStyle,
  };
  return <Tabs {...props} />;
}

export const StyledTabs = cssInterop(StyledTabsImpl, {
  tabBarClassName: 'tabBarStyle',
  headerClassName: 'headerStyle',
  headerTextClassName: 'headerTextStyle',
});