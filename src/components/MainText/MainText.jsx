// @flow
import * as React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  style?: TextStyleProp,
  isAnimated?: boolean,
  theme?: any, // mock
  children: any,
};
const ss = StyleSheet.create({
  text: {
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 16,
  },
});

const MainText: Props => React.Node = ({children, style, theme, isAnimated, ...props}: Props) => {
  const TextWrapper = isAnimated ? Animated.Text : Text
  return (
    <TextWrapper
      style={[ss.text, {color: theme ? theme.textColor : '#FFFFFF'}, style]}
      {...props}>
      {children}
    </TextWrapper>
  );
};

export default MainText;
