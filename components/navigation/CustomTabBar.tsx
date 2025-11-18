import rufusIcon from '@/assets/images/rufus.png';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Animated from 'react-native-reanimated';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  
  const [tabBarWidth, setTabBarWidth] = useState(0);
  console.log('[🧪]  tabBarWidth', tabBarWidth)
  // const tabWidth = tabBarWidth / state.routes.length;
  // with useSharedValue, we update the value on the main thread, not the UI thread
  
  // const translateX = useSharedValue(state.index * tabBarWidth);
  // const indicatorPadding = 20;
  // const indicatorWidth = tabWidth > 2 * indicatorPadding ? tabWidth - 2 * indicatorPadding : tabWidth;

  // const indicatorStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: translateX.value }],
  // }));

  // useEffect(() => {
  //   translateX.value = withTiming(state.index * tabBarWidth + indicatorPadding, { duration: 2500 });
  // }, [state.index, tabBarWidth, translateX]);

  return (
    <View className="flex-row bg-white relative border-t border-gray-200" onLayout={(event) => setTabBarWidth(event.nativeEvent.layout.width)}>

    <Animated.View className='absolute top-0 left-0 z-10 bg-dark h-1 rounded-b-lg'
    //  style={[indicatorStyle, { width: indicatorWidth } ]}
      />

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
