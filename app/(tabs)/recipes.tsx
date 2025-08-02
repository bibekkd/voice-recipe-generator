import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function recipes() {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <View className='px-4 py-6'>
        <Text className='font-inter-bold text-3xl text-gray-900 mb-1'>Recipes</Text>
        <Text className='font-quicksand text-gray-600'>Browse Generated Recipes</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className='px-4'>
        <View className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4'>
          <Text className='font-inter-bold text-lg text-gray-900 mb-2'>Recipe 1</Text>
          <Text className='font-quicksand text-gray-600'>This is a recipe description</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}