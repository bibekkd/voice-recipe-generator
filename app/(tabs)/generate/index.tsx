import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenerationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-cream'>
      <View className='px-4 py-6'>
        <Text className='text-3xl font-bold text-gray-900 mb-2'>Generate Recipes</Text>
        <Text className='text-gray-600 mb-6'>Create recipes from ingredients, photos, or names</Text>
        
        <ScrollView showsVerticalScrollIndicator={false} className='py-5'>
          {/* Ingredients to Recipe */}
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/generate/ingredients-input')}
            className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4'
          >
            <View className='flex-row items-center mb-3'>
              <View className='bg-blue-100 p-3 rounded-full mr-4 bg-orange-100'>
                <Ionicons name="restaurant" size={24} color="#F97316" />
              </View>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900'>Ingredients to Recipe</Text>
                <Text className='text-gray-600 text-sm'>Speak or type your ingredients</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Photo to Recipe */}
          <TouchableOpacity className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4'>
            <View className='flex-row items-center mb-3'>
              <View className='bg-green-100 p-3 rounded-full mr-4'>
                <Ionicons name="camera" size={24} color="#10B981" />
              </View>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900'>Photo to Recipe</Text>
                <Text className='text-gray-600 text-sm'>Upload a food photo</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Recipe Name to Recipe */}
          <TouchableOpacity className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <View className='flex-row items-center mb-3'>
              <View className='bg-purple-100 p-3 rounded-full mr-4'>
                <Ionicons name="book" size={24} color="#8B5CF6" />
              </View>
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900'>Recipe Name to Recipe</Text>
                <Text className='text-gray-600 text-sm'>Search by recipe name</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 