// @flow
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import MainText from '../../components/MainText/MainText';

type Props = {
  onLayout: (number, number) => void,
  item: any,
  index: number,
};

const SliderItem: Props => React.Node = ({item, index, onLayout}: Props) => {
  return (
    <View
      style={ss.container}
      onLayout={e => {
        const width = e.nativeEvent.layout.width;
        onLayout(width, index);
      }}>
      <MainText style={ss.text}>{item.desc}</MainText>
    </View>
  );
};

const ss = StyleSheet.create({
  container: {
    maxWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

const MemoizedItem: any = React.memo<Props>(SliderItem, () => false);

export default MemoizedItem;
