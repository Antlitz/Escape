// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import MainText from '../MainText/MainText';
import COLORS from '../../constants/COLORS';

type Props = {
  text: string,
  style?: ViewStyleProp,
  textStyle?: TextStyleProp,
};
const Label: Props => React.Node = ({
  text,
  style = {},
  textStyle = {},
}: Props) => {
  return (
    <View
      style={[ss.container, {backgroundColor: COLORS.thirdPlanColor}, style]}>
      <MainText style={[ss.label, textStyle]}>{text}</MainText>
    </View>
  );
};

const ss = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Label;
