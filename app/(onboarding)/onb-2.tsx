import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding2() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute inset-0">
        <Image 
          source={require('../../assets/onboarding-images/Loaded-Mediterranean-Street-Fries-2-2.webp')}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/60" />
      </View>

      <View className="flex-1 justify-between px-6 py-4">
        <View className="flex-row justify-between items-center">
        <TouchableOpacity 
            onPress={() => router.push('/onb-1')}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.push('/auth')}
            className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Text className="text-white font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-center items-center">
          <View className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 mx-4">
            <View className="items-center mb-6">
              <View className="bg-white/40 w-16 h-16 rounded-full items-center justify-center mb-4">
                <Ionicons name="camera" size={32} color="white" />
              </View>
              <Text className="text-2xl font-bold text-white text-center mb-2">
                Cook with Photos
              </Text>
              <Text className="text-white/80 text-center text-base leading-6">
                Take a photo of any dish and get instant recipes. Our AI will help you recreate your favorite meals
              </Text>
            </View>
          </View>
        </View>

        <View className="w-full">
          <TouchableOpacity 
            onPress={() => router.push('/onb-3')}
            className="bg-primary w-full py-5 rounded-2xl flex-row items-center justify-center"
          >
            <Text className="text-white font-semibold text-lg mr-2">Next</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


