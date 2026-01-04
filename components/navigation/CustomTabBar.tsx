import rufusIcon from '@/assets/images/rufus.png';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import React from "react";
import { Image, View } from "react-native";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View className="flex-row bg-white relative border-t border-gray-200">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}

            // accessibility props
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            
            className="flex-1 items-center justify-center py-2 pb-safe"
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {options.tabBarIcon && route.name !== 'rufus' ? (
              options.tabBarIcon({
                focused: isFocused,
                size: 24,
                color: "black",
              })
            ) : (
              <Image source={rufusIcon} className="w-12 h-12" />
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar;