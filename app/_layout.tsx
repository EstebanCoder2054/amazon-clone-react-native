import { StyledStack } from "@/components/navigation/stack";
import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";


const InitialLayout = () => {
  return (
    <StyledStack contentClassName='bg-gray-100 dark:bg-dark' headerClassName='bg-dark text-white'>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </StyledStack>
    

  ) 
}

const RootLayout  = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <InitialLayout />
    </ThemeProvider>
  )
}

export default RootLayout;
