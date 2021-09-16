import React, {
  useRef,
  useState,
  useEffect,
  createRef,
  useCallback,
} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import SliderNumbers from './SliderNumbers/SliderNumbers';
import SliderPagination from './SliderPagination/SliderPagination';
import MainText from '../../components/MainText/MainText';
import LinearGradient from 'react-native-linear-gradient';
import SliderItem from './SliderItem';

const dummyData = [
  {
    value: '123456',
    desc: 'Mindful minutes',
  },
  {
    value: '22',
    desc: 'Current Streak',
  },
  {
    value: '0',
    desc: 'Longest Streak',
  },
  {
    value: '4444',
    desc: 'Episodes Completed',
  },
];

const MAX_SLIDER_WIDTH = 440;

const Slider = ({carouselWidth}) => {
  const [isLayoutReady, setLayoutReady] = useState(
    Array.from({length: dummyData.length}, () => 0),
  );
  const flatListRef = useRef();
  const listItemsWidthRef = useRef(
    Array.from({length: dummyData.length}).map(() => createRef()),
  );
  const layoutCountRef = useRef(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const animateLabelOpacity = useRef(new Animated.Value(0)).current;
  const SLIDER_WIDTH =
    carouselWidth > MAX_SLIDER_WIDTH ? MAX_SLIDER_WIDTH : carouselWidth;
  const SLIDER_CENTER = SLIDER_WIDTH / 2;

  useEffect(() => {
    const animation = Animated.spring(animateLabelOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });
    if (Math.min.apply(Math, isLayoutReady)) {
      animation.start();
    }
    return () => {
      animation.stop();
    };
  }, [`${isLayoutReady}`]);

  const allItemsWidth = isLayoutReady.map(el => {
    return el || 0;
  });
  const offsetValues = allItemsWidth.reduce((result, el, idx) => {
    const currentElem = idx ? el / 2 : 0;
    const prevElem = idx ? allItemsWidth[idx - 1] / 2 : 0;
    const prevCalculatedOffset = idx ? result[idx - 1] : 0;
    const calculateCenter = currentElem + prevElem + prevCalculatedOffset;
    result.push(calculateCenter);
    return result;
  }, []);

  const getLayout = useCallback((width, index) => {
    listItemsWidthRef.current[index].current = width;
    layoutCountRef.current += 1;
    if (layoutCountRef.current === listItemsWidthRef.current.length) {
      setLayoutReady(listItemsWidthRef.current.map(el => el.current));
    }
  }, []);

  const translateFlatlist = animateLabelOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <View
      style={{
        maxWidth: 440,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <View>
        <SliderNumbers
          animatedScrollValue={scrollX}
          data={dummyData}
          slidesOffset={offsetValues}
          slidesWidth={allItemsWidth}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Animated.FlatList
            data={dummyData}
            renderItem={({item, index}) => (
              <SliderItem item={item} index={index} onLayout={getLayout} />
            )}
            horizontal
            style={{
              opacity: animateLabelOpacity,
              marginTop: -100,
            }}
            snapToOffsets={offsetValues}
            scrollEnabled
            decelerationRate={0.5}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
              },
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              ss.contentContainer,
              {
                paddingTop: 110,
                paddingLeft: SLIDER_CENTER - allItemsWidth[0] / 2,
                paddingRight:
                  SLIDER_CENTER - allItemsWidth[allItemsWidth.length - 1] / 2,
              },
            ]}
            ref={flatListRef}
          />
        </View>
        <LinearGradient
          colors={['rgba(9, 1, 16, 1)', 'rgba(0, 0, 0, 0)']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          pointerEvents={'none'}
          style={[
            ss.gradient,
            {
              right: 0,
            },
          ]}
        />
        <LinearGradient
          colors={['rgba(9, 1, 16, 1)', 'rgba(0, 0, 0, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          pointerEvents={'none'}
          style={[
            ss.gradient,
            {
              left: 0,
            },
          ]}
        />
      </View>
      <SliderPagination
        animatedScrollValue={scrollX}
        slidesWidth={allItemsWidth}
        data={dummyData}
        slidesOffset={offsetValues}
      />
    </View>
  );
};
const ss = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    flexGrow: 1,
  },
  gradient: {
    position: 'absolute',
    width: '30%',
    top: 0,
    bottom: 0,
  },
});

export default Slider;
