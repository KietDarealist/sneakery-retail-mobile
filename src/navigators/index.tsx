import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../screens/auth/Login';
import FirstTime from '../screens/welcome/FirstTime';
import MainStack from './MainStack';
import ProductDetailScreen from '../screens/product/DetailScreen';
import OrderDetail from '../screens/main/Order/OrderDetail';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../hooks/useAuth';
import {navigationRef} from '../utils/navigate';

import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import EditProfile from '../screens/main/Account/EditProfile';
import EditAddress from '../screens/main/Account/EditAddress';
import Notification from '../screens/main/Account/Notification';
import Policy from '../screens/main/Account/Policy';
import Security from '../screens/main/Account/Security';
import FilterCategory from '../screens/main/Search/FilterCategory';
import RegisterScreen from '../screens/auth/Register';
import VerifyOTPScreen from '../screens/auth/VerifyOTP';
import FavouritePtoductScreen from '../screens/main/Account/FavouriteProduct';

import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {authReducerActions} from '../store/auth/slice';
import {Alert} from 'react-native';
const Stack = createStackNavigator();

interface IApplicationNavigatorProps {}

const ApplicationNavigator: React.FC<IApplicationNavigatorProps> = props => {
  const {isAuthenticated} = useAuth();

  const initialRoute = isAuthenticated ? 'MAIN' : 'Welcome';
  const dispatch = useDispatch();

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        dispatch(authReducerActions.setDeviceId(fcmToken));
        console.log('token', fcmToken);
      } else {
        console.log('Failed', 'No Token Recived');
      }
    } catch (error) {
      console.log('Failed', 'No Token Recived', error);
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // Lấy FCM token
      await getFcmToken();
    }
  }

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute}>
        <Stack.Screen
          name="MAIN"
          component={MainStack}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Stack.Screen
          name="Welcome"
          component={FirstTime}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            animationEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />

        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            animationEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            animationEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            animationEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="Policy"
          component={Policy}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="Security"
          component={Security}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="FavouriteProduct"
          component={FavouritePtoductScreen}
          options={{
            animationEnabled: true,
          }}
        />

        <Stack.Screen
          name="FilterCategory"
          component={FilterCategory}
          options={{
            animationEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
