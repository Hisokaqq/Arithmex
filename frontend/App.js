import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SingleGameScreen from './screens/SingleGameScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import RankingScreen from './screens/RankingScreen';
import LobbyScreen from './screens/LobbyScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingleGame" component={SingleGameScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Sign In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
         options={{presentation: "modal", headerShown: false}}
         />
        <Stack.Screen name="Rankings" component={RankingScreen} />
      </Stack.Navigator>
      <StatusBar style="dark" />

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
