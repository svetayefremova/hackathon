import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";

interface LayoutProps {
  justifyContent?: string;
  alignItems?: string;
}

const Layout: React.FC<LayoutProps> = ({
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.container,
          {
            justifyContent,
            alignItems,
          },
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
