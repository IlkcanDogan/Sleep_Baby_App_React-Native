import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Theme from './src/core/theme';

//screens
import HomeScreen from './src/screens/home';
import CustomSounds from './src/screens/customSounds';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor={Theme.colors.primary} />
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CustomSounds" component={CustomSounds} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;