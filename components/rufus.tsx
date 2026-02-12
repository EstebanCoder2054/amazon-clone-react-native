import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SUGGESTED_PHRASES = [
  "What do I need a shaker for?",
  "What are the best gifts for a new mom?",
  "What are the best sustainable shoes for running?",
];

const Rufus = () => {
  return (
    <ScrollView
      className="flex-1 bg-white pb-safe mb-10"
      contentContainerClassName="pb-12"
    >
      <View className="flex-1 bg-white pb-safe mb-10">
        <Text className="text-lg  font-semibold mb-6 text-center">
          What do you need help with today bro?
        </Text>

        {/* Suggested messages */}
        <View className="px-4 pb-2">
          <View className="flex-row flex-wrap justify-center -mx-1 mb-2">
            {SUGGESTED_PHRASES.map((phrase, idx) => (
              <TouchableOpacity
                key={idx}
                className="bg-blue-100 rounded-full px-4 py-3 mb-2 mx-1 justify-center max-w-full"
              >
                <Text className="text-blue-700 font-medium text-base text-center flex-shrink">
                  {phrase}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chat messages */}

      </View>
    </ScrollView>
  );
};

export default Rufus;
