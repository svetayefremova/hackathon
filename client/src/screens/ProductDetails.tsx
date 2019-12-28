import React, {useState} from "react";
import {ScrollView, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {NavigationStackScreenProps} from "react-navigation-stack";

import {Layout, NavigationIcon} from "../components";
import {ProductFullDescription} from "../containers";
import {colors} from "../theme";
import {
  initTransformImageAnimationValues,
  runTiming,
  transitionConfig,
} from "../utils/animations";

const {Clock, add, interpolate} = Animated;

const ProductDetails: React.FC<NavigationStackScreenProps> = props => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(1);
  const progress = runTiming(new Clock(), fromValue, toValue);

  const imageUri = props.navigation.getParam("imageUri");
  const sourceMeasure = props.navigation.getParam("sourceMeasure");
  const productId = props.navigation.getParam("id");

  const {
    destinationMeasure,
    initTranslateX,
    initTranslateY,
    initScale,
  } = initTransformImageAnimationValues(sourceMeasure);

  const goBack = () => {
    setFromValue(1);
    setToValue(0);
    props.navigation.goBack();
  };

  return (
    <Layout>
      <ScrollView>
        <Animated.Image
          source={{uri: imageUri}}
          style={{
            ...styles.image,
            ...destinationMeasure,
            opacity: interpolate(progress, {
              inputRange: [0, 0.05, 1],
              outputRange: [0, 0.99, 1],
            }),
            transform: [
              {
                translateX: interpolate(progress, {
                  inputRange: [0.01, 0.99],
                  outputRange: [initTranslateX, 0],
                }),
              },
              {
                translateY: interpolate(progress, {
                  inputRange: [0.01, 0.99],
                  outputRange: [initTranslateY, 0],
                }),
              },
              {
                scale: interpolate(progress, {
                  inputRange: [0.01, 0.99],
                  outputRange: [initScale, 1],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.description,
            marginTop: destinationMeasure.height,
            opacity: interpolate(progress, {
              inputRange: [0, 0.8, 1],
              outputRange: [0, 0, 1],
            }),
            transform: [
              {
                translateY: interpolate(progress, {
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}>
          <TouchableOpacity
            style={{...styles.backButton, top: -destinationMeasure.height + 20}}
            onPress={goBack}>
            <NavigationIcon name="arrow-left" />
          </TouchableOpacity>
          <ProductFullDescription productId={productId} />
        </Animated.View>
      </ScrollView>
    </Layout>
  );
};

ProductDetails.navigationOptions = screenProps => ({
  transitionSpec: {
    open: transitionConfig,
    close: transitionConfig,
  },
  gestureEnabled: true,
  gestureResponseDistance: {
    vertical: 400,
  },
  cardStyleInterpolator: ({current, next}) => {
    const sourceMeasure = screenProps.navigation.getParam("sourceMeasure");
    const {
      initTranslateX,
      initTranslateY,
      initScale,
    } = initTransformImageAnimationValues(sourceMeasure);
    return {
      cardStyle: {
        opacity: interpolate(add(current.progress, next ? next.progress : 0), {
          inputRange: [0, 1, 1.5, 2],
          outputRange: [1, 1, 0.1, 0],
        }),
        transform: [
          {
            translateX: interpolate(
              add(current.progress, next ? next.progress : 0),
              {
                inputRange: [0, 1, 2],
                outputRange: [0, 0, -initTranslateX],
              },
            ),
          },
          {
            translateY: interpolate(
              add(current.progress, next ? next.progress : 0),
              {
                inputRange: [0, 1, 2],
                outputRange: [0, 0, -initTranslateY],
              },
            ),
          },
          {
            scale: interpolate(
              add(current.progress, next ? next.progress : 0),
              {
                inputRange: [0, 1, 2],
                outputRange: [1, 1, 1 + initScale],
              },
            ),
          },
        ],
      },
    };
  },
});

const styles: any = {
  image: {
    width: 0,
    height: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
  },
  description: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.backgroundLight,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
};

export default ProductDetails;
