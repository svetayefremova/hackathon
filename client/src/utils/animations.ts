import {Dimensions} from "react-native";
import Animated, {Easing} from "react-native-reanimated";

const {
  Value,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  block,
  timing,
  debug,
} = Animated;

export interface MeasureProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const transitionConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

export const initTransformImageAnimationValues = (
  sourceMeasure: MeasureProps,
) => {
  const screenWidth = Dimensions.get("window").width;
  const destinationMeasure: MeasureProps = {
    top: 8,
    left: 0,
    width: screenWidth,
    height: (screenWidth * sourceMeasure.height) / sourceMeasure.width,
  };

  const translateSourceX = sourceMeasure.left + sourceMeasure.width / 2;
  const translateSourceY = sourceMeasure.top + sourceMeasure.height / 2;
  const translateDestX = destinationMeasure.left + destinationMeasure.width / 2;
  const translateDestY = destinationMeasure.top + destinationMeasure.height / 2;

  const initTranslateX = translateSourceX - translateDestX;
  const initTranslateY = translateSourceY - translateDestY;
  const initScale = sourceMeasure.width / destinationMeasure.width;

  return {destinationMeasure, initTranslateX, initTranslateY, initScale};
};

export const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    ...transitionConfig.config,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
};
