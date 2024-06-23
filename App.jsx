import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import {CartProvider} from './src/context/CartContext';
import {AnalyticsProvider, createClient} from '@segment/analytics-react-native';
import {AppsflyerPlugin} from '@segment/analytics-react-native-plugin-appsflyer';
import {ToastProvider} from 'react-native-toast-notifications';

const Stack = createStackNavigator();

export const segmentClient = createClient({
  writeKey: 'MD3h5t9j2D3NSf2DfkU76jvOLJB65x8E',
});

segmentClient.add({plugin: AppsflyerPlugin});

const App = () => {
  return (
    <NavigationContainer>
      <AnalyticsProvider client={segmentClient}>
        <ToastProvider>
          <CartProvider>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
              <Stack.Screen name="Home" component={BottomNavigator} />
              <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            </Stack.Navigator>
          </CartProvider>
        </ToastProvider>
      </AnalyticsProvider>
    </NavigationContainer>
  );
};

export default App;
