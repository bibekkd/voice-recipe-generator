import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateRecipesFromImage, Recipe } from '../../../services/geminiApi';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const PhotoToRecipe: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const pickImage = useCallback(async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;
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
        setRecipe(null);
        setError(null);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  }, [requestPermissions]);

  const takePhoto = useCallback(async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;
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
        setRecipe(null);
        setError(null);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  }, [requestPermissions]);

  const generateRecipe = useCallback(async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(selectedImage);
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
              setRecipe(recipeResponse.recipes[0]);
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
  }, [selectedImage]);

  const resetImage = useCallback(() => {
    setSelectedImage(null);
    setRecipe(null);
    setError(null);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6 ">
          <View className='flex flex-row items-center justify-start'>
            <TouchableOpacity 
              onPress={() => router.push('/generate')}
              className='pb-2 mr-4'
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 mb-2 font-inter-bold">Photo to Recipe</Text>
          </View>
          <Text className="text-gray-600 mb-6 font-quicksand">Take a photo or upload an image of food to generate a recipe</Text>
        </View>

        {!selectedImage ? (
          <View className="flex-1 px-4">
            <View className="bg-white rounded-2xl p-8 items-center shadow-sm border border-gray-100">
              <Ionicons name="camera-outline" size={48} color="#6B7280" />
              <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2 font-inter-bold">Upload a food image</Text>
              <Text className="text-gray-600 text-center mb-6 font-quicksand">Take a photo or select from gallery</Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity className="flex-row items-center justify-center px-5 py-3 rounded-lg bg-primary min-w-[120px] mr-2" onPress={takePhoto}>
                  <Ionicons name="camera" size={20} color="white" />
                  <Text className="text-white text-base font-semibold ml-2">Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center px-5 py-3 rounded-lg border border-primary bg-white min-w-[120px]" onPress={pickImage}>
                  <Ionicons name="images-outline" size={20} color="#3B82F6" />
                  <Text className="text-primary text-base font-semibold ml-2">Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View className="px-4 mb-6">
            <View className="relative mb-4">
              <Image source={{ uri: selectedImage }} style={{ width: width - 32, height: (width - 32) * 0.75, borderRadius: 16 }} className="bg-gray-200" />
              <TouchableOpacity className="absolute top-2 right-2 bg-black/60 rounded-full p-1" onPress={resetImage}>
                <Ionicons name="close-circle" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              className="flex-row items-center justify-center px-5 py-4 rounded-lg bg-green-500 mt-2" 
              onPress={generateRecipe}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Ionicons name="restaurant-outline" size={20} color="white" />
                  <Text className="text-white text-base font-semibold ml-2">Generate Recipe</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {error && (
          <View className="flex-row items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3 mx-4 mb-4">
            <Ionicons name="alert-circle-outline" size={24} color="#EF4444" />
            <Text className="text-red-700 text-base ml-2 flex-1">{error}</Text>
          </View>
        )}

        {recipe && (
          <View className="bg-white rounded-2xl p-5 mx-4 shadow-sm border border-gray-100">
            <Text className="text-2xl font-bold text-gray-900 mb-2 font-inter-bold">{recipe.title}</Text>
            <Text className="text-gray-600 mb-4 font-quicksand">{recipe.description}</Text>
            <View className="flex-row justify-around items-center bg-cream rounded-xl py-3 mb-6">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="text-gray-700 text-sm font-quicksand">{recipe.cookingTime}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="people-outline" size={16} color="#6B7280" />
                <Text className="text-gray-700 text-sm font-quicksand">{recipe.servings}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="trending-up-outline" size={16} color="#6B7280" />
                <Text className="text-gray-700 text-sm font-quicksand">{recipe.difficulty}</Text>
              </View>
            </View>
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-3 font-inter-bold">Ingredients</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Ionicons name="ellipse" size={6} color="#3B82F6" />
                  <Text className="text-gray-800 text-base ml-2 font-quicksand">{ingredient}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text className="text-lg font-semibold text-gray-900 mb-3 font-inter-bold">Instructions</Text>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} className="flex-row items-start mb-4">
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center mt-1">
                    <Text className="text-white font-bold text-base">{index + 1}</Text>
                  </View>
                  <Text className="text-gray-800 text-base ml-3 font-quicksand flex-1">{instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotoToRecipe;