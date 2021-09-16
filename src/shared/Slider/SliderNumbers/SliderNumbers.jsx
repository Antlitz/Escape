// @flow
import * as React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import MainText from '../../../components/MainText/MainText';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  animatedScrollValue: any,
  slidesWidth: [number],
  data: any,
  slidesOffset: any,
};

const Images = {
  union: require('./img/Union.png'),
};

const textSizeFromStringLength: number => number = length => {
  switch (length) {
    case 6:
      return 26;
    case 5:
      return 36;
    case 4:
      return 42;
    default:
      return 56;
  }
};

const SliderNumbers: Props => React.Node = ({
  animatedScrollValue,
  slidesWidth,
  data,
  slidesOffset,
}: Props) => {
  return (
    <View style={ss.container}>
      <Image source={Images.union} />
      <View style={ss.dataContainer}>
        {data.map((item, index) => {
          const width = slidesWidth[index];
          const halfWidth = width / 2;
          const previousOffset = index
            ? slidesOffset[index - 1]
            : slidesOffset[index] - halfWidth;
          const nextOffset =
            index === data.length - 1
              ? slidesOffset[index] + halfWidth
              : slidesOffset[index + 1];
          const arrayFromLetters =
            item.value.length > 6 ? 'over1m'.split('') : item.value.split('');
          const fontSize = textSizeFromStringLength(arrayFromLetters.length);
          return (
            <View key={index} style={ss.numberContainer}>
              {arrayFromLetters.map((el, idx, arr) => {
                const step = 70;
                const outputR = -(step * (idx + 1));
                const outputL = step * (arr.length - idx);

                const translateNumberY = animatedScrollValue.interpolate({
                  // can better for sure
                  inputRange: [previousOffset, slidesOffset[index], nextOffset],
                  outputRange: [outputL, 0, outputR],
                });

                return (
                  <MainText
                    isAnimated
                    key={idx}
                    style={{
                      fontSize,
                      fontWeight: 'bold',
                      transform: [{translateY: translateNumberY}],
                      textAlign: 'center',
                    }}>
                    {el}
                  </MainText>
                );
              })}
            </View>
          );
        })}
        <LinearGradient
          colors={['rgba(9, 1, 16, 1)', 'rgba(0, 0, 0, 0)']}
          style={[ss.gradient, {top: 0}]}
        />
        <LinearGradient
          colors={['rgba(9, 1, 16, 1)', 'rgba(0, 0, 0, 0)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={[
            ss.gradient,
            {
              bottom: 0,
            },
          ]}
        />
      </View>
      <Image source={Images.union} style={{transform: [{rotateY: '180deg'}]}} />
    </View>
  );
};

const ss = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 100,
  },
  dataContainer: {
    overflow: 'hidden',
    width: 128,
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    height: 35,
    width: 128,
  },
  numberContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default SliderNumbers;
