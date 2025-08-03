// Install dependencies: npm install @google/genai mime
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
  servings: string;
}

export interface RecipeResponse {
  recipes: Recipe[];
}

export const generateRecipesFromIngredients = async (ingredients: string): Promise<RecipeResponse> => {
  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('API Key available:', !!GEMINI_API_KEY);
    console.log('API Key length:', GEMINI_API_KEY?.length);
    console.log('Ingredients:', ingredients);

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    console.log('AI instance created:', !!ai);
    console.log('AI models available:', !!ai.models);

    const model = 'gemini-2.5-pro';
    console.log('Using model:', model);
    
    const prompt = `Generate 3 different recipes based on these ingredients: ${ingredients}

Please provide the response in the following JSON format:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief description of the dish",
      "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookingTime": "30 minutes",
      "difficulty": "Easy/Medium/Hard",
      "servings": "4 servings"
    }
  ]
}

Make sure the recipes are:
- Creative and varied
- Include all the provided ingredients
- Have clear, step-by-step instructions
- Include cooking time, difficulty, and servings
- Are practical and achievable

Return only valid JSON without any markdown formatting or additional text.`;

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    };

    console.log('Request config:', config);

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    console.log('Request contents:', JSON.stringify(contents, null, 2));
    console.log('Prompt length:', prompt.length);

    console.log('Making API call to Gemini...');
    
    const result = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log('Result object:', result);
    console.log('Result type:', typeof result);
    console.log('Result constructor:', result.constructor.name);
    console.log('Result keys:', Object.keys(result));

    // Get the response text
    console.log('Result candidates:', result.candidates);
    console.log('Result usage metadata:', result.usageMetadata);
    
    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('No candidates received from Gemini API');
    }

    const candidate = result.candidates[0];
    console.log('First candidate:', candidate);
    console.log('Candidate keys:', Object.keys(candidate));

    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('No content in candidate response');
    }

    const part = candidate.content.parts[0];
    console.log('First part:', part);
    console.log('Part keys:', Object.keys(part));

    if (!part.text) {
      throw new Error('No text in response part');
    }

    const fullResponse = part.text;
    console.log('Full response length:', fullResponse.length);
    console.log('Raw response:', fullResponse);
    
    // Clean the response text to remove markdown formatting
    const cleanedResponse = fullResponse
      .replace(/```json\s*/g, '')  // Remove opening ```json
      .replace(/```\s*$/g, '')     // Remove closing ```
      .trim();
    
    console.log('Cleaned response:', cleanedResponse);
    
    // Parse the JSON response
    const recipeData = JSON.parse(cleanedResponse);
    
    // Validate the response structure
    if (!recipeData.recipes || !Array.isArray(recipeData.recipes)) {
      throw new Error('Invalid response format from AI');
    }
    
    console.log('Successfully parsed recipes:', recipeData.recipes.length);
    return recipeData;
  } catch (error) {
    console.error('Error generating recipes:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'No message');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Log additional error details if available
    if (error && typeof error === 'object') {
      console.error('Error properties:', Object.keys(error));
      console.error('Full error object:', JSON.stringify(error, null, 2));
    }
    
    // Provide more specific error handling
    if (error instanceof SyntaxError) {
      console.error('Failed to parse JSON response:', error.message);
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    // Check for API key errors
    if (error instanceof Error && error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    
    // Check for network errors
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw new Error(`Failed to generate recipes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateRecipesFromName = async (recipeName: string): Promise<RecipeResponse> => {
  try {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('API Key available:', !!GEMINI_API_KEY);
    console.log('API Key length:', GEMINI_API_KEY?.length);
    console.log('Recipe Name:', recipeName);

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    console.log('AI instance created:', !!ai);
    console.log('AI models available:', !!ai.models);

    const model = 'gemini-2.5-pro';
    console.log('Using model:', model);
    
    const prompt = `Generate a complete recipe for: ${recipeName}

Please provide the response in the following JSON format:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief description of the dish",
      "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "cookingTime": "30 minutes",
      "difficulty": "Easy/Medium/Hard",
      "servings": "4 servings"
    }
  ]
}

Make sure the recipe:
- Is a complete, traditional recipe for the requested dish
- Includes all necessary ingredients with quantities
- Has clear, step-by-step cooking instructions
- Includes cooking time, difficulty, and servings
- Is practical and achievable for home cooking
- Follows authentic preparation methods

Return only valid JSON without any markdown formatting or additional text.`;

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    };

    console.log('Request config:', config);

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    console.log('Request contents:', JSON.stringify(contents, null, 2));
    console.log('Prompt length:', prompt.length);

    console.log('Making API call to Gemini...');
    
    const result = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log('Result object:', result);
    console.log('Result type:', typeof result);
    console.log('Result constructor:', result.constructor.name);
    console.log('Result keys:', Object.keys(result));

    // Get the response text
    console.log('Result candidates:', result.candidates);
    console.log('Result usage metadata:', result.usageMetadata);
    
    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('No candidates received from Gemini API');
    }

    const candidate = result.candidates[0];
    console.log('First candidate:', candidate);
    console.log('Candidate keys:', Object.keys(candidate));

    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('No content in candidate response');
    }

    const part = candidate.content.parts[0];
    console.log('First part:', part);
    console.log('Part keys:', Object.keys(part));

    if (!part.text) {
      throw new Error('No text in response part');
    }

    const fullResponse = part.text;
    console.log('Full response length:', fullResponse.length);
    console.log('Raw response:', fullResponse);
    
    // Clean the response text to remove markdown formatting
    const cleanedResponse = fullResponse
      .replace(/```json\s*/g, '')  // Remove opening ```json
      .replace(/```\s*$/g, '')     // Remove closing ```
      .trim();
    
    console.log('Cleaned response:', cleanedResponse);
    
    // Parse the JSON response
    const recipeData = JSON.parse(cleanedResponse);
    
    // Validate the response structure
    if (!recipeData.recipes || !Array.isArray(recipeData.recipes)) {
      throw new Error('Invalid response format from AI');
    }
    
    console.log('Successfully parsed recipes:', recipeData.recipes.length);
    return recipeData;
  } catch (error) {
    console.error('Error generating recipes:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'No message');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Log additional error details if available
    if (error && typeof error === 'object') {
      console.error('Error properties:', Object.keys(error));
      console.error('Full error object:', JSON.stringify(error, null, 2));
    }
    
    // Provide more specific error handling
    if (error instanceof SyntaxError) {
      console.error('Failed to parse JSON response:', error.message);
      throw new Error('Failed to parse AI response. Please try again.');
    }
    
    // Check for API key errors
    if (error instanceof Error && error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    
    // Check for network errors
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw new Error(`Failed to generate recipes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
