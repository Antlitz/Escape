// @flow
import * as React from 'react';
import COLORS from '../../../constants/COLORS';
import MainText from '../../../components/MainText/MainText';
import {View, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {Node} from 'react';

type Props = {
  title?: string,
  style?: ViewStyleProp,
  height: number,
};
const Header: Props => Node = ({title, style, height}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[
        style,
        {
          backgroundColor: COLORS.backgroundColor,
          paddingTop: top,
          height: height + top,
        },
        ss.header,
      ]}>
      <Image source={require('./img/stars.png')} style={ss.background} />
      <View style={ss.titleContainer}>
        <MainText style={[ss.title, {color: COLORS.secondTextColor}]}>
          {title || 'my'}
        </MainText>
        <Image source={require('./img/loona.png')} />
      </View>
    </View>
  );
};

export default Header;

const ss = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    flex: 1,
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    marginRight: 8,
    paddingTop: 2,
  },
});
