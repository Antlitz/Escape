// @flow
import * as React from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Slider from '../../shared/Slider/Slider';
import COLORS from '../../constants/COLORS';
import MainText from '../../components/MainText/MainText';
import UpgradePlan from '../../shared/UpgradePlan/UpgradePlan';
import MenuItem from '../../components/MenuItem/MenuItem';
import Label from '../../components/Label/Label';

type Props = {
  route: any,
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const SETTINGS = [
  {
    title: 'Favourite',
    navKey: 'FAVORITE_SCREEN',
    icon: require('./img/heart.png'),
  },
  {
    title: 'All scenes',
    navKey: 'SCENES_SCREEN',
    icon: require('./img/brush.png'),
  },
  {
    title: 'Join loóna family',
    navKey: 'FAMILY_SCREEN',
    icon: require('./img/peoples.png'),
  },
  {
    title: 'Invite your friend',
    navKey: 'INVITE_SCREEN',
    icon: require('./img/invite.png'),
  },
  {
    title: 'Contact us',
    navKey: 'CONTACT_SCREEN',
    icon: require('./img/contact.png'),
  },
  {
    title: 'Settings',
    navKey: 'SETTINGS_SCREEN',
    icon: require('./img/settings.png'),
  },
];
export const SettingsScreen: Props => React.Node = ({route}: Props) => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: COLORS.backgroundColor}}
      contentContainerStyle={ss.contentContainer}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
      <View style={ss.user}>
        <MainText style={ss.userText}>Hi {route?.params?.userName}</MainText>
        <Label text={'PLUS'} />
      </View>
      <View style={ss.plan}>
        <UpgradePlan onPress={() => {}} />
      </View>
      <View style={{marginHorizontal: -20, marginBottom: 10,}}>
        <Slider carouselWidth={SCREEN_WIDTH} />
      </View>
      <View>
        {SETTINGS.map((el, idx) => (
          <MenuItem
            key={idx}
            text={el.title}
            onPress={() => {
              // navigation.navigate(el.navKey)   // mock
            }}
            icon={el.icon}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const ss = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  user: {
    marginBottom: 18,
    flexDirection: 'row',
  },
  userText: {
    marginRight: 4,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
  },
  plan: {
    marginBottom: 30,
  },
});
