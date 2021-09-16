// @flow
import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MainText from '../MainText/MainText';

type Props = {
  text: string,
  onPress: () => void,
  icon?: number,
};
const MenuItem: Props => React.Node = ({text, icon, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={ss.container}>
        {icon && <Image source={icon} style={ss.icon} />}
        <MainText style={ss.text}>{text}</MainText>
        <Image source={require('./img/arrowRight.png')} />
      </View>
    </TouchableOpacity>
  );
};
const ss = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    paddingRight: 10,
  },
});

export default MenuItem;
