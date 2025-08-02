import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedScreen() {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <View className='px-4 py-6'>
        <View className='flex-row items-center justify-between mb-6'>
          <Text className='text-3xl font-bold text-gray-900'>Community Feed</Text>
          <TouchableOpacity className='bg-blue-500 p-3 rounded-full'>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} className='space-y-4'>
          {/* Sample Recipe Card */}
          <View className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <View className='flex-row items-center p-4 border-b border-gray-100'>
              <View className='w-10 h-10 bg-gray-300 rounded-full mr-3' />
              <View className='flex-1'>
                <Text className='font-semibold text-gray-900'>Chef Sarah</Text>
                <Text className='text-gray-500 text-sm'>2 hours ago</Text>
              </View>
            </View>
            
            <View className='p-4'>
              <Text className='text-xl font-bold text-gray-900 mb-2'>Homemade Pizza Margherita</Text>
              <Text className='text-gray-600 mb-3'>
                Classic Italian pizza with fresh mozzarella, basil, and tomato sauce. Perfect for a cozy dinner!
              </Text>
              
              <View className='bg-gray-100 w-full h-48 rounded-lg mb-4 items-center justify-center'>
                <Ionicons name="image-outline" size={48} color="#9CA3AF" />
                <Text className='text-gray-500 mt-2'>Recipe Image</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center space-x-4'>
                  <TouchableOpacity className='flex-row items-center'>
                    <Ionicons name="heart-outline" size={20} color="#EF4444" />
                    <Text className='ml-1 text-gray-600'>24</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='flex-row items-center'>
                    <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                    <Text className='ml-1 text-gray-600'>8</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-full'>
                  <Text className='text-white font-medium'>Cook Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Another Sample Recipe */}
          <View className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <View className='flex-row items-center p-4 border-b border-gray-100'>
              <View className='w-10 h-10 bg-gray-300 rounded-full mr-3' />
              <View className='flex-1'>
                <Text className='font-semibold text-gray-900'>Chef Mike</Text>
                <Text className='text-gray-500 text-sm'>5 hours ago</Text>
              </View>
            </View>
            
            <View className='p-4'>
              <Text className='text-xl font-bold text-gray-900 mb-2'>Chocolate Chip Cookies</Text>
              <Text className='text-gray-600 mb-3'>
                Soft and chewy cookies with melted chocolate chips. A family favorite!
              </Text>
              
              <View className='bg-gray-100 w-full h-48 rounded-lg mb-4 items-center justify-center'>
                <Ionicons name="image-outline" size={48} color="#9CA3AF" />
                <Text className='text-gray-500 mt-2'>Recipe Image</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center space-x-4'>
                  <TouchableOpacity className='flex-row items-center'>
                    <Ionicons name="heart-outline" size={20} color="#EF4444" />
                    <Text className='ml-1 text-gray-600'>42</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='flex-row items-center'>
                    <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                    <Text className='ml-1 text-gray-600'>15</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-full'>
                  <Text className='text-white font-medium'>Cook Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 