import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        Alert.alert('Error', result.error.message || 'Authentication failed');
      } else {
        // Success - user will be automatically redirected by auth state change
        if (isLogin) {
          Alert.alert('Success', 'Signed in successfully!');
        } else {
          Alert.alert('Success', 'Account created successfully! Please check your email for verification.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <SafeAreaView className="flex-1">
        {/* Background Image */}
        <View className="absolute inset-0">
          <Image 
            source={require('../../assets/onboarding-images/table-top-view-of-spicy-food.png')}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/60" />
        </View>

        {/* Floating Skip */}
        <View className="absolute right-6 top-16 z-10">
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)')}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Text className="text-white font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full items-center justify-center mb-4">
              <Ionicons name="restaurant" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Welcome to ChefAI
            </Text>
            <Text className="text-white/80 text-center text-base">
              {isLogin ? 'Sign in to continue cooking' : 'Create your account to get started'}
            </Text>
          </View>

          {/* Form */}
          <View className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6">
            {!isLogin && (
              <View className="mb-4">
                <Text className="text-white font-medium mb-2">Full Name</Text>
                <View className="bg-white/40 rounded-xl px-4 py-3 flex-row items-center">
                  <Ionicons name="person-outline" size={20} color="white" />
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    className="flex-1 ml-3 text-white text-base"
                    editable={!loading}
                  />
                </View>
              </View>
            )}

            <View className="mb-4">
              <Text className="text-white font-medium mb-2">Email</Text>
              <View className="bg-white/40 rounded-xl px-4 py-3 flex-row items-center">
                <Ionicons name="mail-outline" size={20} color="white" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-white text-base"
                  editable={!loading}
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-white font-medium mb-2">Password</Text>
              <View className="bg-white/40 rounded-xl px-4 py-3 flex-row items-center">
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-white text-base"
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="white" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleAuth}
              className="bg-primary py-4 rounded-xl items-center"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Toggle Auth Mode */}
          <View className="items-center">
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)} disabled={loading}>
              <Text className="text-white text-base">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text className="text-primary font-semibold">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <View className="mt-8">
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-white/30" />
              <Text className="text-white/70 mx-4">Or continue with</Text>
              <View className="flex-1 h-px bg-white/30" />
            </View>
            
            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl items-center" disabled={loading}>
                <Ionicons name="logo-google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl items-center" disabled={loading}>
                <Ionicons name="logo-apple" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
}


