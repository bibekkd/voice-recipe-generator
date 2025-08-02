import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [value, onChangeText] = React.useState('');
  return (
    <SafeAreaView className='flex-1 bg-cream'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='px-4 py-6'>
          <Text className='font-inter-bold text-3xl text-gray-900 mb-1'>Hello, Chef!</Text>
          <Text className='font-quicksand text-gray-600'>What would you like to cook today?</Text>
        </View>

        {/* Quick Actions */}
        <View className='px-4 mb-6'>
          <View className='relative mb-4'>
            <TextInput
              editable
              multiline
              numberOfLines={3}
              maxLength={200}
              onChangeText={text => onChangeText(text)}
              value={value}
              placeholder="What ingredients do you have? Or describe a dish you want to make..."
              placeholderTextColor="#9CA3AF"
              className='w-full font-quicksand text-lg min-h-[56px] bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-16 text-grayText shadow-sm focus:border-primary focus:shadow-md'
            />
            <TouchableOpacity 
              className='absolute right-3 bottom-3 bg-primary w-10 h-10 rounded-full items-center justify-center shadow-sm'
            >
              <Ionicons name="send" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-4'>
            <TouchableOpacity className='flex-1 bg-cream border border-[#FF6347] py-4 rounded-xl items-center'>
              <Ionicons name="mic" size={24} color="#f78f07" />
              <Text className='text-[#f78f07] font-medium mt-2'>Voice Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-secondaryTwo py-4 rounded-xl items-center'>
              <Ionicons name="camera" size={24} color="white" />
              <Text className='text-white font-medium mt-2'>Photo Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Cooking Session */}
        <View className='px-4 mb-6'>
          <Text className='text-xl font-bold text-gray-900 mb-4'>Continue Cooking</Text>
          <TouchableOpacity className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
            <View className='flex-row items-center'>
              <View className='bg-orange-100 p-3 rounded-full mr-4'>
                <Ionicons name="restaurant" size={24} color="#F97316" />
              </View>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900'>Pasta Carbonara</Text>
                <Text className='text-gray-600 text-sm'>Step 3 of 8</Text>
                <View className='bg-gray-200 rounded-full h-2 mt-2'>
                  <View className='bg-orange-500 h-2 rounded-full' style={{ width: '37.5%' }} />
                </View>
              </View>
              <Ionicons name="play-circle" size={32} color="#F97316" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Recipes */}
        <View className='px-4 mb-6'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-xl font-bold text-gray-900'>Recent Recipes</Text>
            <TouchableOpacity>
              <Text className='text-blue-500 font-medium'>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-4'>
            {/* Recipe Card 1 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden'>
              <View className='bg-gray-100 w-full h-32 items-center justify-center'>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <View className='p-3'>
                <Text className='font-semibold text-gray-900 mb-1'>Chicken Curry</Text>
                <Text className='text-gray-500 text-sm mb-2'>Cooked 2 hours ago</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className='ml-1 text-gray-600 text-sm'>4.5/5</Text>
                </View>
              </View>
            </View>

            {/* Recipe Card 2 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden'>
              <View className='bg-gray-100 w-full h-32 items-center justify-center'>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <View className='p-3'>
                <Text className='font-semibold text-gray-900 mb-1'>Pizza Margherita</Text>
                <Text className='text-gray-500 text-sm mb-2'>Cooked yesterday</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className='ml-1 text-gray-600 text-sm'>4.8/5</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Popular This Week */}
        <View className='px-4 mb-6'>
          <Text className='text-xl font-bold text-gray-900 mb-4'>Popular This Week</Text>
          
          <View className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <View className='p-4 border-b border-gray-100'>
              <Text className='text-lg font-semibold text-gray-900 mb-1'>Tiramisu</Text>
              <Text className='text-gray-600 text-sm'>Classic Italian dessert</Text>
            </View>
            <View className='p-4 border-b border-gray-100'>
              <Text className='text-lg font-semibold text-gray-900 mb-1'>Sushi Roll</Text>
              <Text className='text-gray-600 text-sm'>Fresh and healthy</Text>
            </View>
            <View className='p-4'>
              <Text className='text-lg font-semibold text-gray-900 mb-1'>Chocolate Cake</Text>
              <Text className='text-gray-600 text-sm'>Rich and decadent</Text>
            </View>
          </View>
        </View>

        {/* Voice Tips */}
        <View className='px-4 mb-6'>
          <View className='bg-blue-50 p-4 rounded-xl border border-blue-200'>
            <View className='flex-row items-center mb-2'>
              <Ionicons name="bulb-outline" size={20} color="#3B82F6" />
              <Text className='ml-2 font-semibold text-blue-900'>Voice Tip</Text>
            </View>
            <Text className='text-blue-800 text-sm'>
              Try saying &quot;What can I cook with chicken and rice?&quot; to get instant recipe suggestions!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

