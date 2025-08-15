import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateRecipesFromImage, generateRecipesFromIngredients, Recipe } from '../../services/geminiApi';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [value, onChangeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requestPermissions = useCallback(async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Camera and media library permissions are required to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }, []);

  const generateFromText = useCallback(async () => {
    if (!value.trim() || loading) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await generateRecipesFromIngredients(value.trim());
      setRecipes(response.recipes);
      setShowRecipeModal(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate recipes');
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [value, loading]);

  const handlePhotoRecipe = useCallback(async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    Alert.alert(
      'Photo Recipe',
      'Choose how you want to add a photo',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  }, [requestPermissions]);

  const takePhoto = useCallback(async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        generateFromImage(asset.uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  }, []);

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        generateFromImage(asset.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }, []);

  const generateFromImage = useCallback(async (imageUri: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64 = reader.result as string;
            const base64Data = base64.split(',')[1];
            const mimeType = blob.type || 'image/jpeg';
            
            const recipeResponse = await generateRecipesFromImage(base64Data, mimeType);
            
            if (recipeResponse.recipes && recipeResponse.recipes.length > 0) {
              setRecipes(recipeResponse.recipes);
              setShowRecipeModal(true);
            } else {
              setError('No recipe found for this image. Please try with a different food image.');
            }
          } catch (error) {
            console.error('Error generating recipe:', error);
            setError(error instanceof Error ? error.message : 'Failed to generate recipe');
          } finally {
            setLoading(false);
          }
        };
        reader.onerror = () => {
          setError('Failed to process image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image');
      setLoading(false);
    }
  }, []);

  const handleVoiceRecipe = useCallback(() => {
    Alert.alert(
      'Voice Recipe',
      'Voice functionality coming soon! For now, use the text input or photo feature.',
      [{ text: 'OK' }]
    );
  }, []);

  const closeModal = useCallback(() => {
    setShowRecipeModal(false);
    setRecipes([]);
    setSelectedImage(null);
    setError(null);
  }, []);

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
              editable={!loading}
              multiline
              numberOfLines={3}
              maxLength={200}
              onChangeText={text => onChangeText(text)}
              value={value}
              placeholder="What ingredients do you have ? "
              placeholderTextColor="#9CA3AF"
              className='w-full font-quicksand text-lg min-h-[56px] bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-16 text-grayText shadow-sm focus:border-primary focus:shadow-md'
            />
            <TouchableOpacity 
              onPress={generateFromText}
              disabled={!value.trim() || loading}
              className={`absolute right-3 bottom-3 w-10 h-10 rounded-full items-center justify-center shadow-sm ${
                value.trim() && !loading ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="send" size={18} color="white" />
              )}
            </TouchableOpacity>
          </View>
          
          {error && (
            <View className='flex-row items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4'>
              <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
              <Text className='text-red-700 text-sm ml-2 flex-1'>{error}</Text>
            </View>
          )}

          <View className='flex-row gap-4'>
            <TouchableOpacity 
              onPress={handleVoiceRecipe}
              disabled={loading}
              className='flex-1 bg-cream border border-[#FF6347] py-4 rounded-xl items-center'
            >
              <Ionicons name="mic" size={24} color="#f78f07" />
              <Text className='text-[#f78f07] font-medium mt-2'>Voice Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handlePhotoRecipe}
              disabled={loading}
              className='flex-1 bg-secondaryTwo py-4 rounded-xl items-center'
            >
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
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=''>
            {/* Recipe Card 1 */}
            <View className='bg-white rounded-xl shadow-sm border border-gray-100 w-48 overflow-hidden mr-2'>
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

      {/* Recipe Modal */}
      <Modal
        visible={showRecipeModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-cream">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-900">Generated Recipes</Text>
            <TouchableOpacity onPress={closeModal} className="p-2">
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            {recipes.map((recipe, index) => (
              <View key={index} className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
                <Text className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</Text>
                <Text className="text-gray-600 mb-4">{recipe.description}</Text>
                
                <View className="flex-row justify-around items-center bg-cream rounded-xl py-3 mb-4">
                  <View className="flex-row items-center space-x-1">
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-700 text-sm">{recipe.cookingTime}</Text>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <Ionicons name="people-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-700 text-sm">{recipe.servings}</Text>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <Ionicons name="trending-up-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-700 text-sm">{recipe.difficulty}</Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900 mb-2">Ingredients</Text>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <View key={idx} className="flex-row items-center mb-1">
                      <Ionicons name="ellipse" size={6} color="#3B82F6" />
                      <Text className="text-gray-800 text-sm ml-2">{ingredient}</Text>
                    </View>
                  ))}
                </View>

                <View>
                  <Text className="text-lg font-semibold text-gray-900 mb-2">Instructions</Text>
                  {recipe.instructions.map((instruction, idx) => (
                    <View key={idx} className="flex-row items-start mb-3">
                      <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mt-1">
                        <Text className="text-white font-bold text-xs">{idx + 1}</Text>
                      </View>
                      <Text className="text-gray-800 text-sm ml-2 flex-1">{instruction}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

