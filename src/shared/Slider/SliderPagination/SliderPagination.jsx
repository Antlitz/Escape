// @flow
import * as React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {useRef} from 'react';
import COLORS from '../../../constants/COLORS';

type Props = {
  animatedScrollValue: Animated.Value,
  data: Array<any>,
  slidesOffset: Array<number>,
  slidesWidth: Array<number>,
};

const SliderPagination: Props => React.Node = ({
  animatedScrollValue,
  slidesWidth,
  slidesOffset,
  data,
}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current; //new value without native driver

  useEffect(() => {
    animatedScrollValue.addListener(({value}) => {
      scrollX && scrollX.setValue(value);
    });
    return () => animatedScrollValue.removeAllListeners();
  }, []);

  return (
    <View style={ss.container}>
      {data.map((item, index) => {
        const slideWidth = slidesWidth[index];
        const halfWidth = slideWidth / 2;
        const previousOffset = index
          ? slidesOffset[index - 1]
          : slidesOffset[index] - halfWidth;
        const nextOffset =
          index === data.length - 1
            ? slidesOffset[index] + halfWidth
            : slidesOffset[index + 1];

        const inputRange = [previousOffset, slidesOffset[index], nextOffset];

        const width = scrollX.interpolate({
          inputRange,
          // $FlowFixMe
          outputRange: [5, 16, 5],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          // $FlowFixMe
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <View style={{justifyContent: 'center'}} key={index}>
            <Animated.View
              style={[
                ss.dot,
                {
                  width: width,
                  opacity: opacity,
                  backgroundColor: COLORS.whiteColor,
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const ss = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  dot: {
    height: 5,
    alignSelf: 'center',
    borderRadius: 90,
    marginHorizontal: 3,
  },
});

export default SliderPagination;
