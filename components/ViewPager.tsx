import React, { useEffect, useRef, useState, FunctionComponent } from "react";
import {
  Animated,
  FlatList,
  Platform,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export type ViewPagerProps = {
  size: number;
  data: any[];
  renderItem: (props: { item: any; index: number }) => JSX.Element;
  decelerationRate?: number;
  keyExtractor?: (item: any, index: number) => string;
  onScroll?: (event: any) => void;
  snapToAlignment?: "start" | "center" | "end";
  onEndReachedThreshold?: number;
  horizontal?: boolean;
  useNativeDriver?: boolean;
  initialIndex?: number;
  scroll?: Animated.Value;
};

export const ViewPager: FunctionComponent<ViewPagerProps> = React.forwardRef(
  (
    {
      size,
      data,
      renderItem,
      decelerationRate = 0,
      keyExtractor = (item, index) => `vp-${index}`,
      onScroll = () => {},
      snapToAlignment = "start",
      onEndReachedThreshold = 50,
      horizontal = true,
      useNativeDriver = Platform.OS !== "web",
      initialIndex = 0,
      scroll = new Animated.Value(0),
    },
    ref
  ) => {
    const listRef = useRef<FlatList | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      scroll.addListener((event) => onScroll(event));

      if (initialIndex) {
        scrollToIndex({ index: initialIndex, animated: false });
      }

      return () => {
        scroll.removeAllListeners();
      };
    }, []);

    const onLayout = (event: any) => {
      const {
        nativeEvent: {
          layout: { width, height },
        },
      } = event;

      setDimensions({ width, height });
    };

    const setupOnScroll = (useNativeDriver: boolean, horizontal: boolean) => {
      const key = horizontal ? "x" : "y";
      return Animated.event(
        [
          {
            nativeEvent: { contentOffset: { [key]: scroll } },
          },
        ],
        {
          useNativeDriver,
        }
      );
    };

    const onScrollEvent = setupOnScroll(useNativeDriver, horizontal);

    const getItemLayout = (_: any, index: number) => {
      return {
        length: size,
        offset: size * index,
        index,
      };
    };

    const scrollToIndex = ({
      index,
      ...props
    }: {
      index: number;
      animated?: boolean;
    }) => {
      listRef.current?.scrollToIndex?.({
        index: Math.max(0, Math.min(index, data.length - 1)),
        ...props,
      });
    };

    React.useImperativeHandle(ref, () => ({
      scrollToIndex,
    }));

    const contentContainerStyle: ViewStyle = {
      ...((horizontal
        ? {
            paddingHorizontal: (dimensions.width - size) / 2,
          }
        : {
            paddingVertical: (dimensions.height - size) / 2,
          }) as ViewStyle),
    };

    return (
      <AnimatedFlatList
        onLayout={onLayout}
        onScroll={onScrollEvent}
        ref={listRef}
        removeClippedSubviews
        keyExtractor={keyExtractor}
        data={data}
        snapToAlignment={snapToAlignment}
        snapToInterval={size}
        decelerationRate={decelerationRate}
        contentContainerStyle={contentContainerStyle}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        onEndReachedThreshold={onEndReachedThreshold}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        {...(useNativeDriver ? { useNativeDriver } : {})}
      />
    );
  }
);
