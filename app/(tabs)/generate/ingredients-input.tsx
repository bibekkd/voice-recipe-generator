import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateRecipesFromIngredients, Recipe } from '../../../services/geminiApi';

export default function IngredientsInputScreen() {
  const [value, onChangeText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (value.trim() && !loading) {
      setLoading(true);
      try {
        const response = await generateRecipesFromIngredients(value.trim());
        setRecipes(response.recipes);
        setShowResults(true);
      } catch (error) {
        Alert.alert(
          'Error',
          error instanceof Error ? error.message : 'Failed to generate recipes. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewRecipe = () => {
    setShowResults(false);
    setRecipes([]);
    onChangeText('');
  };

  return (
    <SafeAreaView className='flex-1 bg-cream'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='px-4 py-6'>
          <View className='flex-row items-center mb-4'>
            <TouchableOpacity 
              onPress={() => router.push('/generate')}
              className='mr-4 p-2'
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className='font-inter-bold text-2xl text-gray-900'>Ingredients to Recipe</Text>
          </View>
          <Text className='font-quicksand text-gray-600 mb-6'>Tell us what ingredients you have and we&apos;ll create a delicious recipe for you!</Text>
        </View>

        {!showResults ? (
          <>
            {/* Input Section */}
            <View className='px-4 mb-6'>
              <View className='relative mb-6'>
                <TextInput
                  editable={!loading}
                  multiline
                  numberOfLines={6}
                  maxLength={500}
                  onChangeText={text => onChangeText(text)}
                  value={value}
                  placeholder="List your ingredients here...&#10;Example:&#10;• 2 chicken breasts&#10;• 1 cup rice&#10;• 1 onion&#10;• 2 tomatoes"
                  placeholderTextColor="#9CA3AF"
                  className='w-full font-quicksand text-lg min-h-[200px] bg-white border border-gray-200 rounded-2xl px-4 py-4 pr-16 text-grayText shadow-sm focus:border-primary focus:shadow-md'
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 16,
                    lineHeight: 24
                  }}
                />
                <TouchableOpacity 
                  onPress={handleSend}
                  disabled={!value.trim() || loading}
                  className={`absolute right-3 bottom-3 w-12 h-12 rounded-full items-center justify-center shadow-sm ${
                    value.trim() && !loading ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  {loading ? (
                    <Ionicons name="hourglass-outline" size={20} color="white" />
                  ) : (
                    <Ionicons name="send" size={20} color="white" />
                  )}
                </TouchableOpacity>
              </View>

              {loading && (
                <View className='bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6'>
                  <View className='flex-row items-center'>
                    <Ionicons name="restaurant" size={20} color="#3B82F6" />
                    <Text className='ml-2 font-semibold text-blue-900'>Generating Recipes...</Text>
                  </View>
                  <Text className='text-blue-800 text-sm mt-2'>
                    Our AI chef is creating 3 delicious recipes based on your ingredients. This may take a few moments.
                  </Text>
                </View>
              )}

              {/* Tips */}
              <View className='bg-blue-50 p-4 rounded-xl border border-blue-200'>
                <View className='flex-row items-center mb-2'>
                  <Ionicons name="bulb-outline" size={20} color="#3B82F6" />
                  <Text className='ml-2 font-semibold text-blue-900'>Pro Tips</Text>
                </View>
                <Text className='text-blue-800 text-sm mb-2'>
                  • Include quantities when possible (e.g., &quot;2 cups flour&quot;){'\n'}
                  • Mention any dietary restrictions{'\n'}
                  • Add cooking preferences (spicy, vegetarian, etc.)
                </Text>
              </View>
            </View>

            {/* Quick Examples */}
            <View className='px-4 mb-6'>
              <Text className='text-lg font-semibold text-gray-900 mb-4'>Quick Examples</Text>
              
              <View className='space-y-3'>
                <TouchableOpacity 
                  onPress={() => onChangeText('2 chicken breasts, 1 cup rice, 1 onion, 2 tomatoes, olive oil, salt, pepper')}
                  className='bg-white p-4 rounded-xl border border-gray-200'
                >
                  <Text className='font-medium text-gray-900'>Simple Chicken & Rice</Text>
                  <Text className='text-gray-600 text-sm mt-1'>2 chicken breasts, 1 cup rice, 1 onion, 2 tomatoes</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onChangeText('1 lb ground beef, 1 package pasta, 1 jar marinara sauce, 1 onion, 3 cloves garlic, parmesan cheese')}
                  className='bg-white p-4 rounded-xl border border-gray-200'
                >
                  <Text className='font-medium text-gray-900'>Classic Pasta Dish</Text>
                  <Text className='text-gray-600 text-sm mt-1'>Ground beef, pasta, marinara sauce, onion, garlic</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => onChangeText('2 cups flour, 3 eggs, 1 cup milk, 2 tbsp butter, 1 tsp vanilla, 1/4 cup sugar')}
                  className='bg-white p-4 rounded-xl border border-gray-200'
                >
                  <Text className='font-medium text-gray-900'>Sweet Treat</Text>
                  <Text className='text-gray-600 text-sm mt-1'>Flour, eggs, milk, butter, vanilla, sugar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          /* Recipe Results */
          <View className='px-4 pb-6'>
            {/* Results Header */}
            <View className='mb-6'>
              <Text className='text-2xl font-bold text-gray-900 mb-2'>Generated Recipes</Text>
              <Text className='text-gray-600 mb-4'>Here are 3 delicious recipes based on your ingredients!</Text>
              <TouchableOpacity 
                onPress={handleNewRecipe}
                className='bg-primary py-3 px-6 rounded-xl self-start'
              >
                <Text className='text-white font-semibold'>Generate New Recipe</Text>
              </TouchableOpacity>
            </View>

            {/* Recipes */}
            {recipes.map((recipe, index) => (
              <View key={index} className='bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden'>
                {/* Recipe Header */}
                <View className='p-6 border-b border-gray-100'>
                  <Text className='text-2xl font-bold text-gray-900 mb-2'>{recipe.title}</Text>
                  <Text className='text-gray-600 mb-4'>{recipe.description}</Text>
                  
                  {/* Recipe Meta */}
                  <View className='flex-row space-x-4'>
                    <View className='flex-row items-center'>
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text className='ml-1 text-gray-600 text-sm'>{recipe.cookingTime}</Text>
                    </View>
                    <View className='flex-row items-center'>
                      <Ionicons name="restaurant-outline" size={16} color="#6B7280" />
                      <Text className='ml-1 text-gray-600 text-sm'>{recipe.servings}</Text>
                    </View>
                    <View className='flex-row items-center'>
                      <Ionicons name="trending-up-outline" size={16} color="#6B7280" />
                      <Text className='ml-1 text-gray-600 text-sm'>{recipe.difficulty}</Text>
                    </View>
                  </View>
                </View>

                {/* Ingredients */}
                <View className='p-6 border-b border-gray-100'>
                  <Text className='text-lg font-semibold text-gray-900 mb-3'>Ingredients</Text>
                  <View className='space-y-2'>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <View key={idx} className='flex-row items-center'>
                        <View className='w-2 h-2 bg-primary rounded-full mr-3' />
                        <Text className='text-gray-700 flex-1'>{ingredient}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Instructions */}
                <View className='p-6'>
                  <Text className='text-lg font-semibold text-gray-900 mb-3'>Instructions</Text>
                  <View className='space-y-4'>
                    {recipe.instructions.map((instruction, idx) => (
                      <View key={idx} className='flex-row'>
                        <View className='bg-primary w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5'>
                          <Text className='text-white text-sm font-bold'>{idx + 1}</Text>
                        </View>
                        <Text className='text-gray-700 flex-1 leading-6'>{instruction}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 