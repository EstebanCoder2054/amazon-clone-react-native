import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const SignIn = () => {

const {isLoaded: isLoadedSignUp, signUp} = useSignUp();
const {isLoaded: isLoadedSignIn, signIn, setActive} = useSignIn();

const [showPassword, setShowPassword] = useState(false);

  if (!isLoadedSignUp || !isLoadedSignIn) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>signIn</Text>
    </View>
  )
}

export default SignIn