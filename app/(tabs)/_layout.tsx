import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 75,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarItemStyle: {
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "home" : "home-outline"} 
              color={focused ? '#FFA500' : '#9CA3AF'} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Generate',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "sparkles" : "sparkles-outline"} 
              color={focused ? '#FFA500' : '#9CA3AF'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "restaurant" : "restaurant-outline"} 
              color={focused ? '#FFA500' : '#9CA3AF'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "people" : "people-outline"} 
              color={focused ? '#FFA500' : '#9CA3AF'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "person" : "person-outline"} 
              color={focused ? '#FFA500' : '#9CA3AF'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
