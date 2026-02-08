import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address or mobile number"),
  password: z.string().min(3, "Please enter a password"),
});
type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { isLoaded: isLoadedSignUp, signUp } = useSignUp();
  const { isLoaded: isLoadedSignIn, signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "estebandev25@gmail.com", password: "3385723test" },
  });

  const onSubmit = async (data: SignInForm) => {
    if (!isLoadedSignIn) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({session: signInAttempt.createdSessionId})
        router.dismissTo('/(tabs)/profile')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    }
    catch (error) {
      console.error(error);
      if (isClerkAPIResponseError(error)){
        const clerkErrors = error.errors
        if (clerkErrors[0].code === 'form_identifier_not_found') {
          createAccount(data);
        } else {
          Alert.alert('Error', 'An error occured while signing in')
        }
      }
    }
  };

  const createAccount = async (data: SignInForm) => {
    if (!isLoadedSignUp) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      router.dismissTo('/(tabs)/profile')
      Alert.alert('Account created', 'Yeah, account created successfully!')
    }
    catch (error) {
      console.error(error);
    }
  };

  const signInWithPasskey = async () => {};

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="py-4 px-8">
        <Text className="text-2xl font-bold mb-2">Sign in</Text>
        <Text className="text-base font-medium mb-2">
          Enter mobile number or email
        </Text>

        {/* email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email or mobile number"
              className="border border-gray-300 rounded-md px-3 py-2 mb-2 bg-white"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

        {/* password */}
        <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 bg-white"
            textContentType="password"
          />
        )} />
        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
        <TouchableOpacity
        className="flex-row items-center mb-4"
        onPress={() => setShowPassword((prev) => !prev)}
        accessibilityRole="checkbox"
        accessibilityState={{checked: showPassword}}
        testID="show-password-checkbox"
        >

        <View className={`w-5 h-5 rounded border border-gray-400 mr-2 items-center justify-center ${showPassword ? 'bg-green-100 border-green-600' : 'bg-white'}`}>
          {showPassword && <View className="w-3 h-3 bg-green-300 rounded" />}
        </View>

        <Text className="text-base">Show password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-primary rounded-full py-3 items-center mb-4">
          <Text className=" text-lg font-medium text-center text-dark">Sign in</Text>
        </TouchableOpacity>

        <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-2 text-gray-500">Or</Text>
        <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity onPress={signInWithPasskey}  className="border border-gray-300 rounded-full py-3 items-center mb-4">
          <Text className=" text-lg font-medium text-center text-dark">Sign in with passkey</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
