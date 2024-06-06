import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function TabBar({ state, descriptors, navigation }) {
  const primaryColor = "#24786D";
  const greyColor = "#888";

  const icons = {
    Home: (props) => (
      <AntDesign name="message1" size={26} color={greyColor} {...props} />
    ),
    Contacts: (props) => (
      <AntDesign name="contacts" size={26} color={greyColor} {...props} />
    ),
    Groups: (props) => (
      <MaterialCommunityIcons
        name="account-group-outline"
        size={26}
        color={greyColor}
        {...props}
      />
    ),
    Settings: (props) => (
      <Ionicons
        name="settings-outline"
        size={26}
        color={greyColor}
        {...props}
      />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }

        return (
          <TouchableOpacity
            key={route.name}
            className="items-center justify-center"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, gap: 5 }}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : greyColor,
            })}
            <Text style={{ color: isFocused ? primaryColor : greyColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    shadowColor: "black", // from here to shadowOpacity is for ios
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10, // this is for android
  },
});
