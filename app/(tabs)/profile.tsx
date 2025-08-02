import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className='bg-white px-4 py-6 border-b border-gray-100'>
          <View className='flex-row items-center mb-4'>
            <View className='w-20 h-20 bg-gray-300 rounded-full mr-4' />
            <View className='flex-1'>
              <Text className='text-2xl font-bold text-gray-900'>John Doe</Text>
              <Text className='text-gray-600'>Home Chef</Text>
              <Text className='text-gray-500 text-sm'>Member since 2024</Text>
            </View>
            <TouchableOpacity className='bg-gray-100 p-3 rounded-full'>
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View className='flex-row justify-around'>
            <View className='items-center'>
              <Text className='text-2xl font-bold text-gray-900'>12</Text>
              <Text className='text-gray-600 text-sm'>Recipes</Text>
            </View>
            <View className='items-center'>
              <Text className='text-2xl font-bold text-gray-900'>156</Text>
              <Text className='text-gray-600 text-sm'>Likes</Text>
            </View>
            <View className='items-center'>
              <Text className='text-2xl font-bold text-gray-900'>8</Text>
              <Text className='text-gray-600 text-sm'>Following</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className='px-4 py-4'>
          <View className='flex-row space-x-3'>
            <TouchableOpacity className='flex-1 bg-blue-500 py-3 rounded-xl items-center'>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text className='text-white font-medium mt-1'>Post Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-gray-100 py-3 rounded-xl items-center'>
              <Ionicons name="heart-outline" size={20} color="#6B7280" />
              <Text className='text-gray-700 font-medium mt-1'>Liked</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Recipes Section */}
        <View className='px-4 py-4'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-xl font-bold text-gray-900'>My Recipes</Text>
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
                <Text className='font-semibold text-gray-900 mb-1'>Pasta Carbonara</Text>
                <Text className='text-gray-500 text-sm mb-2'>Classic Italian dish</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="heart" size={16} color="#EF4444" />
                  <Text className='ml-1 text-gray-600 text-sm'>18 likes</Text>
                </View>
              </View>
            </View>

            {/* Recipe Card 2 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden'>
              <View className='bg-gray-100 w-full h-32 items-center justify-center'>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <View className='p-3'>
                <Text className='font-semibold text-gray-900 mb-1'>Chicken Curry</Text>
                <Text className='text-gray-500 text-sm mb-2'>Spicy and aromatic</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="heart" size={16} color="#EF4444" />
                  <Text className='ml-1 text-gray-600 text-sm'>24 likes</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Liked Recipes Section */}
        <View className='px-4 py-4'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-xl font-bold text-gray-900'>Liked Recipes</Text>
            <TouchableOpacity>
              <Text className='text-blue-500 font-medium'>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='space-x-4'>
            {/* Liked Recipe Card 1 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden'>
              <View className='bg-gray-100 w-full h-32 items-center justify-center'>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <View className='p-3'>
                <Text className='font-semibold text-gray-900 mb-1'>Tiramisu</Text>
                <Text className='text-gray-500 text-sm mb-2'>By Chef Maria</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="heart" size={16} color="#EF4444" />
                  <Text className='ml-1 text-gray-600 text-sm'>32 likes</Text>
                </View>
              </View>
            </View>

            {/* Liked Recipe Card 2 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden'>
              <View className='bg-gray-100 w-full h-32 items-center justify-center'>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              </View>
              <View className='p-3'>
                <Text className='font-semibold text-gray-900 mb-1'>Sushi Roll</Text>
                <Text className='text-gray-500 text-sm mb-2'>By Chef Alex</Text>
                <View className='flex-row items-center'>
                  <Ionicons name="heart" size={16} color="#EF4444" />
                  <Text className='ml-1 text-gray-600 text-sm'>45 likes</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Settings Section */}
        <View className='px-4 py-4'>
          <Text className='text-xl font-bold text-gray-900 mb-4'>Settings</Text>
          
          <View className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
            <TouchableOpacity className='flex-row items-center p-4 border-b border-gray-100'>
              <Ionicons name="notifications-outline" size={20} color="#6B7280" />
              <Text className='ml-3 flex-1 text-gray-900'>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-row items-center p-4 border-b border-gray-100'>
              <Ionicons name="shield-outline" size={20} color="#6B7280" />
              <Text className='ml-3 flex-1 text-gray-900'>Privacy</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-row items-center p-4'>
              <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
              <Text className='ml-3 flex-1 text-gray-900'>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 