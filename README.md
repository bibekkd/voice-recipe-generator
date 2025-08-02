# 🍳 Voice Recipe Finder & AI Cook Assistant

An AI-powered mobile app that helps users generate and cook recipes using voice and images, featuring a real-time voice-guided cooking experience.

---

## 🧠 Key Features

### 1. 🔍 Recipe Generation (3 Ways)

* **Ingredients to Recipe:**

  * User speaks or types a list of ingredients.
  * Gemini AI suggests 3 recipes with title, description, and image.
  * Each recipe has a "Let's Cook" button.

* **Photo to Recipe:**

  * User uploads a food or ingredient image.
  * Gemini Vision identifies the food and generates a recipe.

* **Recipe Name to Recipe:**

  * User provides a recipe name.
  * Gemini returns ingredients, description, and step-by-step cooking instructions.

### 2. 🎙️ Real-Time AI Cooking Assistant

* On clicking "Let's Cook":

  * Steps are read aloud using text-to-speech.
  * User responds with voice commands like "Next", "Repeat", or asks questions.
  * App transcribes both user and AI speech.
  * Works like a real-time conversation with a master chef.

### 3. 🌐 Community Recipes

* Users can:

  * Post recipes with title, image, and steps.
  * Like and comment on other users' recipes.
  * View a real-time feed of public recipes.

### 4. 👤 User Profiles

* Users can:

  * View their posted recipes.
  * View liked recipes.
  * Edit profile info.

### 5. 🛠️ Tech Stack (Free Tools)

* **Frontend:** Expo (React Native), Tailwind via NativeWind
* **AI:** Gemini Pro + Gemini Vision API
* **Auth & DB:** Supabase (Auth, Realtime DB, Storage)
* **Voice Input:** react-native-voice or Whisper (optional)
* **Voice Output:** expo-speech
* **Navigation:** React Navigation

---

## 🏗️ Step-by-Step Build Plan (3 Weeks)

### Week 1: Core Setup & Recipe Generation

1. Initialize Expo app with navigation & basic structure.
2. Integrate Supabase (auth, user sessions).
3. Build Ingredient → Recipe screen (text + voice input).
4. Connect to Gemini API to generate 3 recipes.
5. Build Recipe Name → Recipe feature.

### Week 2: Voice Assistant & Photo-to-Recipe

1. Build "Let's Cook" assistant screen:

   * Text-to-speech for steps
   * Voice commands via react-native-voice
   * Transcription display
2. Add Gemini API call to handle follow-up voice questions.
3. Build Image Upload screen:

   * Upload photo
   * Send to Gemini Vision
   * Display recipe result with "Let's Cook"

### Week 3: Community, Profiles & Polish

1. Build Community Feed:

   * Post recipe (title, desc, image)
   * Fetch and display posts
   * Like & comment features
2. Build Profile Page:

   * Show user’s posted & liked recipes
3. Polish voice interactions and UI
4. Test on devices & build with EAS

---

## 🧾 Gemini Prompt Examples

### Ingredient to Recipe:

```
Suggest 3 simple recipes using these ingredients: [onion, tomato, egg]. Include title, short description, and cooking steps.
```

### Photo to Recipe:

```
What is this dish? If possible, generate a step-by-step recipe to cook it at home.
```

### Recipe Name to Recipe:

```
How to cook Butter Chicken at home? Include ingredients, cook time, and steps.
```

### Cooking Follow-up (during voice assistant):

```
How many minutes should I cook this?
What's the next step?
What can I substitute for garlic?
```

---

## 🗂️ Folder Structure (Suggested)

```
/app
  /screens
    IngredientToRecipeScreen.tsx
    ImageToRecipeScreen.tsx
    RecipeFromNameScreen.tsx
    CookAssistantScreen.tsx
    CommunityFeed.tsx
    ProfileScreen.tsx
  /components
    RecipeCard.tsx
    StepPlayer.tsx
    VoiceInput.tsx
  /lib
    gemini.ts
    supabase.ts
    voice.ts
  /assets
    /images
.env
```

---

## 🚀 Future Add-ons (Optional)

* Razorpay/Stripe for payments
* AdMob for monetization
* Multi-language support
* Offline recipe saving

---

## ✅ Summary

Build an AI voice-powered recipe app with:

* Smart generation via ingredients, image, or name
* Real-time cooking guidance using voice
* Social recipe sharing and interaction
  All built using **Expo**, **Supabase**, **Gemini**, and **free tools only**.
