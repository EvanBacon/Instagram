import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Text, View, Dimensions, useWindowDimensions } from "react-native";

import { ViewPager } from "./ViewPager";

interface SliderProps {
  window: {
    width: number;
    height: number;
  };
  initialIndex: number;
  onSwipe: (direction: string) => void;
  onIndexChange: (index: number, prevStateIndex: number) => void;
  page: {
    id: string;
  };
  data: string[];
}

const sliderHeight = 60;

const Slider: React.FC<SliderProps> = ({
  initialIndex,
  onSwipe,
  onIndexChange,
  page,
  data,
}) => {
  const window = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const viewPagerRef = useRef<ViewPager | null>(null);

  const isLarge = ["music", "live"].includes(page.id);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      const keyMap = {
        ArrowLeft: "LEFT",
        KeyA: "LEFT",
        ArrowRight: "RIGHT",
        KeyD: "RIGHT",
      };

      const direction = keyMap[e.code];
      if (direction) {
        e.preventDefault();
        onSwipe(direction);
        if (direction === "LEFT") {
          viewPagerRef.current?.next();
        } else if (direction === "RIGHT") {
          viewPagerRef.current?.previous();
        }
      }
    };

    // window.addEventListener("keyup", onKeyUp, false);

    // return () => {
    //   window.removeEventListener("keyup", onKeyUp);
    // };
  }, [onSwipe]);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View
        style={{
          width: window.width,
          height: sliderHeight,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
            textAlign: "center",
            userSelect: "none",
          }}
          key={item}
        >
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, maxHeight: sliderHeight }}>
      <LinearGradient
        colors={["rgba(0,0,0,0.0)", isLarge ? "black" : "rgba(0,0,0,0.3)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: isLarge ? sliderHeight * 2 : sliderHeight,
        }}
      />
      <ViewPager
        pagingEnabled
        centerContent
        initialIndex={initialIndex}
        onScrollEndDrag={() => {}}
        onScroll={({ value }) => {
          if (!viewPagerRef.current) {
            return;
          }
          const newIndex = viewPagerRef.current.index;
          if (index !== newIndex) {
            setIndex(newIndex);
            onIndexChange(newIndex, index);
          }
        }}
        ref={viewPagerRef}
        data={data}
        renderItem={renderItem}
        style={{ flex: 1 }}
        size={window.width}
        horizontal
      />
    </View>
  );
};

export default Slider;
