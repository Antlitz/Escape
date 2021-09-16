import * as React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SettingsScreen} from '../Screens/SettingsScreen/SettingsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import COLORS from '../constants/COLORS';
import MainText from '../components/MainText/MainText';
import {SCREEN_NAMES} from '../constants/NAVIGATOR';
import Header from './ProfileTabs/Header/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProfileTabsIcons = {
  Sleepscapes: require('../assets/images/ProfileTabs/book.png'),
  Stories: require('../assets/images/ProfileTabs/moon.png'),
  Soundscapes: require('../assets/images/ProfileTabs/music.png'),
  Profile: require('../assets/images/ProfileTabs/human.png'),
  Tonight: require('../assets/images/ProfileTabs/phone.png'),
};

const ProfileTabs = createBottomTabNavigator();

const Icon = ({source, color, style}) => (
  <Image source={source} style={{tintColor: color, ...style}} />
);

const screenOptions = ({route}) => {
  return {
    tabBarLabel: ({color}) => (
      <MainText style={[ss.labelText, {color}]}>
        {route.name === SCREEN_NAMES.profile
          ? route?.params?.userName || 'Anon'
          : route.name}
      </MainText>
    ),
    tabBarIcon: ({color}) => {
      return <Icon source={ProfileTabsIcons[route.name]} color={color} />;
    },
  };
};

function Navigator() {
  const {bottom} = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <ProfileTabs.Navigator
        initialRouteName={SCREEN_NAMES.profile}
        screenOptions={{
          tabBarActiveTintColor: COLORS.whiteColor,
          tabBarInactiveTintColor: COLORS.white30Color,
          tabBarStyle: {
            backgroundColor: COLORS.backgroundColor,
            borderTopWidth: 0,
            elevation: 0,
            justifyContent: 'space-around',
            height: 55 + bottom,
            paddingTop: 5,
          },
          headerStyle: {
            height: 44,
          },
          header: ({options}) => {
            return (
              <Header
                style={options.headerStyle}
                height={options.headerStyle.height}
              />
            );
          },
        }}>
        <ProfileTabs.Screen
          name={SCREEN_NAMES.tonight}
          component={View}
          options={screenOptions}
        />
        <ProfileTabs.Screen
          name={SCREEN_NAMES.sleepscapes}
          component={View}
          options={screenOptions}
        />
        <ProfileTabs.Screen
          name={SCREEN_NAMES.soundscapes}
          component={View}
          options={screenOptions}
        />
        <ProfileTabs.Screen
          name={SCREEN_NAMES.stories}
          component={View}
          options={screenOptions}
        />
        <ProfileTabs.Screen
          name={SCREEN_NAMES.profile}
          component={SettingsScreen}
          initialParams={{userName: 'Andrew '}}
          options={screenOptions}
        />
      </ProfileTabs.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

const ss = StyleSheet.create({
  labelText: {
    fontSize: 10,
    flex: 1,
  },
});
